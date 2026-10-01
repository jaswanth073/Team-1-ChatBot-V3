
import { GoogleGenAI, Type } from "@google/genai";
import { RiskLevel, HealthAssessment } from "../types";

const SYSTEM_INSTRUCTION = `
You are HealthAssist AI, a senior medical intake specialist. 
Your goal is to gather a complete clinical picture before providing any summary.

INTAKE RULES:
1. ONE AT A TIME: Ask only one question per turn.
2. MANDATORY DATA POINTS: You must collect ALL of these before the conversation is complete: 
   - Age (if not already in profile)
   - Biological Sex (if not already in profile)
   - Primary Symptoms (specific details like location, type of pain, appearance)
   - Duration (how long has this been happening? When did it start?)
   - Severity (on a scale of 1-10 OR Mild/Moderate/Severe, impact on daily activities)
3. SKIN DISEASE CLASSIFICATION: If the user provides an image, analyze it for skin conditions. Describe what you see (pigmentation, lesions, texture, borders) and ask clarifying questions about itching, pain, or bleeding.
4. NO PREMATURE SUMMARIES: Do not provide assessment summaries in your chat responses. Continue asking questions until ALL mandatory data points are collected.
5. RESPONSE STYLE: Professional, empathetic, and clinical.
6. EMERGENCIES: If the user mentions chest pain, stroke signs (FAST), or severe difficulty breathing, immediately advise them to call 108 (emergency services) and stop the intake.
7. PROGRESSION: After collecting symptoms, ask about duration. After duration, ask about severity. Only after ALL information is collected, acknowledge that you have everything needed.
8. COMPLETION: ONLY when ALL mandatory data points have been collected and you have no more clinical questions to ask, YOU MUST include the exact tag "[INTAKE_COMPLETE]" at the very top or bottom of your final message. Do NOT use this tag until you have Age, Sex, Symptoms, Duration, AND Severity.

MULTILINGUAL SUPPORT (CRITICAL — FOLLOW STRICTLY):
- You MUST detect the language of EVERY user message.
- ALWAYS respond in the SAME LANGUAGE as the user's MOST RECENT message. This is your highest-priority language rule.
- If the user switches language mid-conversation (e.g., starts in English then switches to Telugu), you MUST immediately switch to that new language and continue in it until the user switches again.
- Track the "active language" as the language of the user's latest message. All your responses must be in the active language.
- Supported languages include but are not limited to: English, Telugu (తెలుగు), Hindi (हिन्दी), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Marathi (मराठी), Bengali (বাংলা), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Urdu (اردو), Spanish, French, German, Arabic, Chinese, Japanese, Korean, and any other language.
- If the user explicitly requests a language (e.g., "tell me in Telugu", "Hindi mein batao"), switch to that language immediately.
- If the user writes in mixed languages (Hinglish, Tenglish, etc.), respond in the dominant non-English language.
- Maintain the same clinical quality, professionalism, and empathy in ALL languages.
- Use accurate medical terminology in the user's language. If a medical term has no direct translation, use the English term with a brief local-language explanation.
- NEVER refuse to respond in a language. If unsure, default to the language of the user's last message.

Examples:
- User: "నాకు తలనొప్పి వస్తోంది" → Respond fully in Telugu
- User: "मुझे सिरदर्द हो रहा है" → Respond fully in Hindi  
- User: "I have a headache" → Respond in English
- User starts in English, then says "ఇప్పుడు తెలుగులో చెప్పండి" → Switch to Telugu and continue in Telugu
- User was in Telugu, then says "Can you speak in English?" → Switch to English

IMPORTANT: Do NOT generate assessment results or summaries in your chat responses. Your role is ONLY to gather information through questions. The assessment will be generated separately after all information is collected.
`;

export class HealthAIService {
  private ai: GoogleGenAI;
  private history: any[] = [];

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async sendMessage(message: string, image?: { data: string, mimeType: string }): Promise<string> {
    try {
      const parts: any[] = [{ text: message }];
      if (image) {
        parts.push({
          inlineData: {
            data: image.data,
            mimeType: image.mimeType
          }
        });
      }

      const contents = [
        ...this.history,
        { role: 'user', parts }
      ];

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
        },
      });

      const responseText = response.text || "I'm sorry, I couldn't process that.";

      // Update local history
      this.history.push({ role: 'user', parts });
      this.history.push({ role: 'model', parts: [{ text: responseText }] });

      return responseText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting. Please check your connection.";
    }
  }

  reset() {
    this.history = [];
  }

  /**
   * Rebuild internal Gemini history from an array of Message objects.
   * Used when the user edits a past message — we truncate the conversation
   * and need to sync the AI's context to only include prior messages.
   */
  rebuildHistory(messages: { role: string; content: string }[]) {
    this.history = [];
    for (const msg of messages) {
      // Skip the initial welcome message (role=assistant with no prior user msg)
      const geminiRole = msg.role === 'user' ? 'user' : 'model';
      this.history.push({
        role: geminiRole,
        parts: [{ text: msg.content }]
      });
    }
  }

  async getStructuredAssessment(historyString: string): Promise<HealthAssessment | null> {
    // Detect the dominant language used in the conversation for multilingual assessment
    const prompt = `Review the clinical conversation for completeness.

    LANGUAGE RULE: Detect the primary language used in the conversation history below. Generate ALL text fields (understanding, possibleCauses, recommendations, whenToSeeDoctor) in THAT language. If the conversation is in Telugu, write the assessment in Telugu. If in Hindi, write in Hindi. If in English, write in English. Match the user's language.
    
    CRITICAL CHECK - ALL of the following MUST be present and SPECIFIC:
    1. Age (confirmed in conversation or profile)
    2. Biological Sex (confirmed in conversation or profile)
    3. Clear, SPECIFIC Symptoms with details:
       - What exactly are the symptoms? (not just "sick" or "unwell")
       - Where is the problem located?
       - What does it feel like? (pain type, appearance, sensation)
    4. Duration - SPECIFIC timeline:
       - When did it start? (days, weeks, months ago)
       - Has it been constant or intermittent?
    5. Severity - QUANTIFIED impact:
       - Rated on a scale (1-10) OR described as Mild/Moderate/Severe
       - Impact on daily activities described
    
    If an image of skin was provided, ensure specific visual observations are documented.

    IF ANY OF THESE IS MISSING, VAGUE, OR NOT SPECIFIC, RETURN EXACTLY THE WORD "null" (no quotes, lowercase).
    
    Examples of INCOMPLETE information that should return null:
    - "I don't feel well" without specific symptoms
    - "It hurts" without location or type of pain
    - "For a while" without specific duration
    - Missing severity rating
    - Only age and sex collected, no actual health complaint details
    
    History: ${historyString}
    
    ONLY if ALL required information is COMPLETE and SPECIFIC, return a detailed JSON assessment in the same language as the conversation.
    Otherwise, return exactly: null`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              understanding: { type: Type.STRING },
              possibleCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
              riskLevel: { type: Type.STRING },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              whenToSeeDoctor: { type: Type.ARRAY, items: { type: Type.STRING } },
              isEmergency: { type: Type.BOOLEAN }
            },
            required: ['understanding', 'possibleCauses', 'riskLevel', 'recommendations', 'whenToSeeDoctor', 'isEmergency']
          }
        }
      });

      const text = response.text?.trim();
      if (!text || text === 'null' || text === '"null"' || text.includes('"understanding": "null"')) {
        return null;
      }

      const parsed = JSON.parse(text);
      
      // Additional validation checks
      if (!parsed.understanding || 
          parsed.understanding.toLowerCase().includes("not yet provided") || 
          parsed.understanding.toLowerCase().includes("not provided") ||
          parsed.understanding.toLowerCase().includes("information not provided") ||
          parsed.understanding.toLowerCase().includes("symptoms") && parsed.understanding.toLowerCase().includes("not") ||
          !parsed.possibleCauses || 
          parsed.possibleCauses.length === 0 ||
          parsed.possibleCauses[0] === "Information not provided" ||
          parsed.possibleCauses[0].toLowerCase().includes("not provided")) {
        return null;
      }

      return parsed as HealthAssessment;
    } catch (error) {
      return null;
    }
  }
}
