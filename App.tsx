
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HealthAIService } from './services/geminiService';
import { Message, HealthAssessment } from './types';
import { MedicalCross, SendIcon, UserIcon, RefreshIcon, LogoIcon, SparklesIcon, MicrophoneIcon, ImageIcon, XIcon, CopyIcon, EditPencilIcon, SelectTextIcon } from './components/Icons';
import SummaryCard from './components/SummaryCard';
import SkinAnalysisView from './components/SkinAnalysisView';
import AuthPanel from './components/AuthPanel';
import SafetyGuidelines from './components/SafetyGuidelines';
import ClinicalTeam from './components/ClinicalTeam';
import ChatHistory from './components/ChatHistory';
import { FeedbackModal } from './components/FeedbackModal';
import { predictImage } from './services/predictService';
import { apiService } from './services/apiService';

const WELCOME_TEXT = `Hello! I am HealthAssist AI, your advanced medical health assistant. I am here to provide you with preliminary health guidance and support.

Please keep in mind that **I am not a doctor.** I cannot provide a definitive diagnosis or prescribe medications. If you are currently experiencing a medical emergency—such as chest pain, difficulty breathing, symptoms of a stroke, or severe bleeding—please stop and call emergency services (108) immediately.

**If you have a skin concern, you can upload a photo for my analysis.**

**🌐 You can talk to me in any language — Telugu, Hindi, Tamil, Kannada, English, or any other. I will respond in your language.**

To help me understand your situation better, I have a few questions for you. Let's start with the basics:

**Could you please tell me your age and biological sex?**`;

const PARENTAL_WELCOME_TEXT = `Hello! Welcome to the Parental Chat mode. I'm here to help you with your child's health concerns.

Please keep in mind that **I am not a doctor.** I cannot provide a definitive diagnosis or prescribe medications. If your child is experiencing a medical emergency, please call emergency services immediately.

**🌐 You can talk to me in any language — Telugu, Hindi, Tamil, Kannada, English, or any other. I will respond in your language.**

To help me understand your child's situation better, let me ask you a few questions:

**Is this for your son, daughter, or other? And what is their biological sex?**`;

interface ImageState {
  data: string;
  mimeType: string;
  preview: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<ImageState | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  const [isSkinMode, setIsSkinMode] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [service] = useState(() => new HealthAIService());
  
  // Message actions state
  const [activeMessageMenu, setActiveMessageMenu] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  // Modal states
  const [showSafetyGuidelines, setShowSafetyGuidelines] = useState(false);
  const [showClinicalTeam, setShowClinicalTeam] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  // Chat mode
  const [isParentalMode, setIsParentalMode] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [parentalProfile, setParentalProfile] = useState<any>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  
  // Session tracking for feedback
  const [sessionCount, setSessionCount] = useState(0);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shouldBeRecordingRef = useRef<boolean>(false);
  // Used to invalidate in-flight async requests when the user switches modes/sessions.
  const sendSeqRef = useRef<number>(0);

  // Check authentication on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      loadUserProfiles(savedToken);
      
      // Load session count from localStorage
      const savedSessionCount = localStorage.getItem(`sessionCount_${savedUser}`);
      if (savedSessionCount) {
        setSessionCount(parseInt(savedSessionCount, 10));
      }
    } else {
      setShowAuthPanel(true);
    }
  }, []);

  // Load user profiles
  const loadUserProfiles = async (authToken: string) => {
    try {
      const profile = await apiService.getUserProfile(authToken);
      // Only set profile if it has actual data
      if (profile && (profile.age || profile.biological_sex)) {
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      const parentProfile = await apiService.getParentalProfile(authToken);
      // Only set parental profile if it has actual data
      if (parentProfile && (parentProfile.child_age || parentProfile.child_biological_sex)) {
        setParentalProfile(parentProfile);
      } else {
        setParentalProfile(null);
      }
      
      setProfileLoaded(true);
    } catch (err) {
      console.error('Error loading profiles:', err);
      setProfileLoaded(true);
    }
  };

  const handleAuthSuccess = (authToken: string, userData: any) => {
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuthPanel(false);
    loadUserProfiles(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setShowAuthPanel(true);
    setMessages([]);
    setIsLanding(true);
    setUserProfile(null);
    setParentalProfile(null);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isLanding) {
      scrollToBottom();
    }
  }, [messages, isTyping, isLanding]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        shouldBeRecordingRef.current = false;
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          // No speech detected, but keep recording if user wants to
          if (shouldBeRecordingRef.current) {
            setTimeout(() => {
              if (shouldBeRecordingRef.current) {
                try {
                  recognition.start();
                } catch (e) {
                  console.error('Failed to restart after no-speech:', e);
                }
              }
            }, 100);
          }
        }
      };
      
      recognition.onend = () => {
        console.log('Recognition ended. Should be recording:', shouldBeRecordingRef.current);
        // Auto-restart if user still wants to record
        if (shouldBeRecordingRef.current) {
          try {
            recognition.start();
            console.log('Restarted recognition');
          } catch (error) {
            console.error('Failed to restart recognition:', error);
            shouldBeRecordingRef.current = false;
            setIsRecording(false);
          }
        } else {
          setIsRecording(false);
        }
      };
      
      recognitionRef.current = recognition;
      setVoiceSupported(true);
    } else {
      setVoiceSupported(false);
      console.warn('Speech Recognition not supported in this browser. Try Chrome or Edge.');
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    
    if (isRecording) {
      // Stop recording
      shouldBeRecordingRef.current = false;
      recognitionRef.current.stop();
      setIsRecording(false);
      console.log('Stopped recording');
    } else {
      // Start recording
      shouldBeRecordingRef.current = true;
      setIsRecording(true);
      try {
        recognitionRef.current.start();
        console.log('Started recording');
      } catch (error) {
        console.error('Failed to start recording:', error);
        shouldBeRecordingRef.current = false;
        setIsRecording(false);
        alert('Failed to start voice recording. Please check your microphone permissions.');
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setSelectedImage({
          data: base64String,
          mimeType: file.type,
          preview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startNewSession = useCallback((forceMode?: boolean) => {
    // Invalidate any in-flight assistant responses so the UI doesn't "swap" across modes.
    sendSeqRef.current += 1;
    setIsTyping(false);
    service.reset();
    const parentalMode = forceMode !== undefined ? forceMode : isParentalMode;
    const welcomeMessage = parentalMode ? PARENTAL_WELCOME_TEXT : WELCOME_TEXT;
    
    // Increment session count and check for feedback modal
    const newSessionCount = sessionCount + 1;
    setSessionCount(newSessionCount);
    
    // Save session count to localStorage
    if (user) {
      localStorage.setItem(`sessionCount_${user.username}`, newSessionCount.toString());
    }
    
    // Show feedback modal after 2 or 3 sessions (randomly)
    if (newSessionCount === 2 || newSessionCount === 3) {
      // Delay showing modal to avoid disrupting the session start
      setTimeout(() => {
        setShowFeedbackModal(true);
      }, 3000); // Show after 3 seconds
    }
    
    // Check if profile exists and skip initial questions
    let customWelcome = welcomeMessage;
    if (parentalMode && parentalProfile?.child_age && parentalProfile?.child_biological_sex) {
      customWelcome = `Hello! Welcome back to Parental Chat mode. I remember your child is ${parentalProfile.child_biological_sex}, age ${parentalProfile.child_age}.

Please keep in mind that **I am not a doctor.** I cannot provide a definitive diagnosis or prescribe medications. If your child is experiencing a medical emergency, please call emergency services immediately.

**🌐 You can talk to me in any language — Telugu, Hindi, Tamil, Kannada, English, or any other.**

How can I help with your child's health today?`;
    } else if (!parentalMode && userProfile?.age && userProfile?.biological_sex) {
      customWelcome = `Hello! Welcome back. I have your profile: ${userProfile.biological_sex}, age ${userProfile.age}.

Please keep in mind that **I am not a doctor.** I cannot provide a definitive diagnosis or prescribe medications. If you are currently experiencing a medical emergency—such as chest pain, difficulty breathing, symptoms of a stroke, or severe bleeding—please stop and call emergency services (108) immediately.

**🌐 You can talk to me in any language — Telugu, Hindi, Tamil, Kannada, English, or any other.**

What health concerns can I help you with today?`;
    }
    
    setMessages([{
      id: "initial-welcome",
      role: 'assistant',
      content: customWelcome,
      timestamp: Date.now()
    }]);
    setShowAssessment(false);
    setAssessment(null);
    setIsLanding(false);
    setSelectedImage(null);
  }, [isParentalMode, userProfile, parentalProfile, sessionCount, user]);

  const handleFeedbackSubmit = async (rating: number, comment: string) => {
    if (!token) return;
    
    try {
      await apiService.submitFeedback(token, rating, comment);
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleSend = async (text: string = inputText) => {
    if ((!text.trim() && !selectedImage) || isTyping) return;
    const requestSeq = ++sendSeqRef.current;
    const imageToSendSnapshot = selectedImage;

    if (isRecording) {
      shouldBeRecordingRef.current = false;
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    // ===== EDIT MODE: truncate conversation and resend =====
    let messagesBeforeEdit: Message[] = [];
    if (editingMessageId) {
      // Find the index of the message being edited
      const editIndex = messages.findIndex(m => m.id === editingMessageId);
      if (editIndex !== -1) {
        // Keep only messages BEFORE the edited message
        messagesBeforeEdit = messages.slice(0, editIndex);
        
        // Rebuild Gemini AI history to match the truncated conversation
        // Skip the initial welcome (index 0) since it's the system greeting
        const historyForAI = messagesBeforeEdit.slice(1).map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content
        }));
        service.rebuildHistory(historyForAI);
        
        // Set messages to the truncated state
        setMessages(messagesBeforeEdit);
      }
      // Clear edit mode
      setEditingMessageId(null);
      setEditText('');
    }

    // Check if this is profile data collection
    const currentMessages = editingMessageId ? messagesBeforeEdit : messages;
    const needsProfileData = isParentalMode 
      ? (!parentalProfile?.child_age || !parentalProfile?.child_biological_sex)
      : (!userProfile?.age || !userProfile?.biological_sex);

    const parseAgeToInt = (ageValue: any): number | null => {
      if (ageValue === null || ageValue === undefined) return null;
      const n = typeof ageValue === 'number' ? ageValue : parseInt(String(ageValue), 10);
      return Number.isFinite(n) ? n : null;
    };

    // Enforce age restriction in Normal Chat whenever we already know the user's age.
    if (!isParentalMode) {
      const userAgeInt = parseAgeToInt(userProfile?.age);
      if (userAgeInt !== null && userAgeInt < 18) {
        const userMsg: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: text + (imageToSendSnapshot ? "\n\n[Image Uploaded]" : ""),
          timestamp: Date.now(),
          ...(imageToSendSnapshot ? { image: imageToSendSnapshot.preview } : {})
        };

        const errorMsg: Message = {
          id: (Date.now() + 0.5).toString(),
          role: 'assistant',
          content: 'Age restriction: You are under 18. Please ask your parents to consult on your behalf using the Parental Chat mode.',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg, errorMsg]);
        setInputText('');
        setSelectedImage(null);
        setIsTyping(false);
        return;
      }
    }

    if (needsProfileData && token) {
      let extractedAge = '';
      let extractedSex = '';
      
      // Try explicit patterns first
      const explicitAgeMatch = text.match(/\b(\d{1,3})\s*(?:years?|yrs?|y\.?o\.?|age)\b/i) || text.match(/(?:i am|i'm|my age is|age(?: is|:)?)\s*(\d{1,3})\b/i);
      if (explicitAgeMatch) {
         extractedAge = explicitAgeMatch[1];
      } else if (currentMessages.length <= 3) {
         // Fallback to standalone numbers if it's early in the conversation
         const numMatch = text.match(/\b(\d{1,3})\b/);
         if (numMatch) {
            extractedAge = numMatch[1];
         }
      }

      const sexMatch = text.match(/\b(male|female|man|woman|boy|girl|son|daughter)\b/i);
      if (sexMatch) {
         let s = sexMatch[1].toLowerCase();
         if (['male', 'man', 'boy', 'son'].includes(s)) extractedSex = 'Male';
         else extractedSex = 'Female';
      }
      
      let hasProfileUpdate = false;
      let profileAge = isParentalMode ? parentalProfile?.child_age : userProfile?.age;
      let profileSex = isParentalMode ? parentalProfile?.child_biological_sex : userProfile?.biological_sex;

      if (!profileAge && extractedAge) {
         const ageInt = parseInt(extractedAge);
         if (ageInt >= 1 && ageInt <= 120) {
            if (!isParentalMode && ageInt < 18) {
               const userMsg: Message = {
                  id: Date.now().toString(),
                  role: 'user',
                  content: text + (imageToSendSnapshot ? "\n\n[Image Uploaded]" : ""),
                  timestamp: Date.now(),
                  ...(imageToSendSnapshot ? { image: imageToSendSnapshot.preview } : {})
               };

               const errorMsg: Message = {
                  id: (Date.now() + 0.5).toString(),
                  role: 'assistant',
                  content: 'Age restriction: You are under 18. Please ask your parents to consult on your behalf using the Parental Chat mode.',
                  timestamp: Date.now()
               };

               setMessages(prev => [...prev, userMsg, errorMsg]);
               setInputText('');
               setSelectedImage(null);
               setIsTyping(false);
               return;
            }
            profileAge = extractedAge;
            hasProfileUpdate = true;
         }
      }

      if (!profileSex && extractedSex) {
         profileSex = extractedSex;
         hasProfileUpdate = true;
      }
      
      // Save profile if we have updates
      if (hasProfileUpdate) {
        try {
          if (isParentalMode) {
            const relation = sexMatch 
              ? (sexMatch[1] === 'son' || sexMatch[1] === 'boy' ? 'son' : sexMatch[1] === 'daughter' || sexMatch[1] === 'girl' ? 'daughter' : 'other')
              : parentalProfile?.child_relation || 'other';
            await apiService.updateParentalProfile(token, profileAge || '', profileSex || '', relation);
          } else {
            await apiService.updateUserProfile(token, profileAge || '', profileSex || '');
          }
          // Reload profiles to get updated data
          await loadUserProfiles(token);
        } catch (error) {
          console.error('Error saving profile:', error);
        }
      }
    }

    // If the user switched modes while we were awaiting profile updates, don't append/send.
    if (sendSeqRef.current !== requestSeq) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text + (imageToSendSnapshot ? "\n\n[Image Uploaded]" : ""),
      timestamp: Date.now(),
      ...(imageToSendSnapshot ? { image: imageToSendSnapshot.preview } : {})
    };

    if (sendSeqRef.current !== requestSeq) return;
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    const imageToSend = imageToSendSnapshot;
    setSelectedImage(null);
    setIsTyping(true);

    try {
      let predictionContext = '';
      
      // If image is uploaded, get skin disease prediction from backend
      if (imageToSend) {
        try {
          // Convert base64 to File object
          const response = await fetch(imageToSend.preview);
          const blob = await response.blob();
          const file = new File([blob], 'skin-image.jpg', { type: imageToSend.mimeType });
          
          // Get prediction from backend
          const predictionResult = await predictImage(file);
          predictionContext = `\n\n**🔬 ML Model Detection Results:**\n**Disease:** ${predictionResult.prediction}\n**Confidence:** ${predictionResult.confidence}%\n\nPlease provide additional medical context and recommendations based on this diagnosis.`;
          
          // Show prediction immediately
          const predictionMsg: Message = {
            id: (Date.now() + 0.5).toString(),
            role: 'assistant',
            content: `### Skin Disease Detection\n\n**Detected Condition:** ${predictionResult.prediction}\n**Confidence Level:** ${predictionResult.confidence}%\n\nAnalyzing further with medical context...`,
            timestamp: Date.now()
          };
          if (sendSeqRef.current !== requestSeq) return;
          setMessages(prev => [...prev, predictionMsg]);
        } catch (predError) {
          console.error('Prediction error:', predError);
          predictionContext = '\n\n[Note: Could not connect to ML prediction service. Proceeding with visual analysis only.]';
        }
      }

      const responseText = await service.sendMessage(
        text + predictionContext, 
        imageToSend ? { data: imageToSend.data, mimeType: imageToSend.mimeType } : undefined
      );

      if (sendSeqRef.current !== requestSeq) return;

      let cleanResponseText = responseText;
      let isIntakeComplete = false;
      if (cleanResponseText.includes('[INTAKE_COMPLETE]')) {
         isIntakeComplete = true;
         cleanResponseText = cleanResponseText.replace(/\[INTAKE_COMPLETE\]/g, '').trim();
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanResponseText,
        timestamp: Date.now()
      };

      if (sendSeqRef.current !== requestSeq) return;
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);

      // Save chat history
      if (sendSeqRef.current !== requestSeq) return;
      if (token) {
        const chatMessages = [...messages, userMsg, assistantMsg];
        await apiService.saveChatHistory(token, chatMessages, isParentalMode ? 'parental' : 'normal');
      }

      // Generate assessment when Gemini informs us intake is completely finished
      const currentHistory = [...messages, userMsg, assistantMsg];
      if (isIntakeComplete && !assessment) {
        const historyString = currentHistory.map(m => `${m.role}: ${m.content}`).join('\n');
        const newAssessment = await service.getStructuredAssessment(historyString);
        if (sendSeqRef.current !== requestSeq) return;
        if (newAssessment) {
          setAssessment(newAssessment);
          setShowAssessment(true);
        }
      }
    } catch (error) {
      if (sendSeqRef.current === requestSeq) {
        setIsTyping(false);
      }
    }
  };

  // Message action handlers
  const handleCopyMessage = (msg: Message) => {
    navigator.clipboard.writeText(msg.content).then(() => {
      setCopiedMessageId(msg.id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    });
    setActiveMessageMenu(null);
  };

  const handleSelectText = (msgId: string) => {
    setActiveMessageMenu(null);
    // Find the message content element and select all text in it
    const msgElement = document.getElementById(`msg-content-${msgId}`);
    if (msgElement) {
      const range = document.createRange();
      range.selectNodeContents(msgElement);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const handleEditMessage = (msg: Message) => {
    if (msg.role === 'user') {
      setEditingMessageId(msg.id);
      const cleanText = msg.content.replace(/\n\n\[Image Uploaded\]$/, '');
      setEditText(cleanText);
      setInputText(cleanText);
    }
    setActiveMessageMenu(null);
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText('');
    setInputText('');
  };

  const renderMessageContent = (msg: Message) => {
    const content = msg.content.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.startsWith('###') ? 'font-extrabold text-3xl mt-10 mb-6 text-slate-900 tracking-tight' : 'mb-6 leading-relaxed'}>
          {line.startsWith('###') ? line.replace('###', '').trim() : parts.map((part, pi) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pi} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });

    return (
      <div className="flex flex-col gap-4">
        {(msg as any).image && (
          <img src={(msg as any).image} alt="User upload" className="rounded-3xl max-w-full md:max-w-sm shadow-lg border border-white/50" />
        )}
        <div id={`msg-content-${msg.id}`}>{content}</div>
      </div>
    );
  };

  if (isLanding) {
    return (
      <div className="relative min-h-screen flex flex-col items-center">
        <div className="grid-pattern absolute inset-0 -z-10"></div>
        {/* Transparent medical background image */}
        <div className="absolute inset-0 -z-5 flex items-center justify-center pointer-events-none overflow-hidden">
          <svg className="w-[600px] h-[600px] opacity-[0.04]" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm112 280H280v88c0 13.3-10.7 24-24 24s-24-10.7-24-24v-88H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h88v-88c0-13.3 10.7-24 24-24s24 10.7 24 24v88h88c13.3 0 24 10.7 24 24s-10.7 24-24 24z"/>
          </svg>
          <svg className="absolute top-20 left-20 w-[200px] h-[200px] opacity-[0.03]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <svg className="absolute bottom-20 right-20 w-[250px] h-[250px] opacity-[0.03]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
          </svg>
          <svg className="absolute top-40 right-40 w-[180px] h-[180px] opacity-[0.03]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
            <circle cx="20" cy="10" r="2" />
          </svg>
        </div>
        <nav className="w-full max-w-[1500px] px-12 py-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-5 glass-card py-3 pl-3 pr-10 rounded-full border border-white shadow-sm">
            <LogoIcon />
            <span className="font-extrabold text-slate-900 tracking-tighter text-2xl">HealthAssist</span>
          </div>
          <div className="flex gap-6 items-center">
            {isAuthenticated && user && (
              <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm">
                <UserIcon className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-slate-700">{user.username}</span>
              </div>
            )}
            <button
              onClick={() => setShowSafetyGuidelines(true)}
              className="hidden md:block text-base font-bold text-slate-600 tracking-tight hover:text-slate-900 transition-colors"
            >
              Safety Guidelines
            </button>
            <button
              onClick={() => { setIsLanding(false); setIsSkinMode(true); }}
              className="px-8 py-3 bg-white text-slate-700 font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Skin Check
            </button>
            <button
              onClick={() => setShowClinicalTeam(true)}
              className="px-10 py-4 bg-purple-100/60 text-purple-700 text-base font-extrabold rounded-full border border-purple-200 shadow-sm hover:bg-purple-200/60 transition-colors"
            >
              Clinical Team
            </button>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-8 py-3 bg-red-50 text-red-600 font-bold rounded-full border border-red-200 hover:bg-red-100 transition-colors shadow-sm"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <main className="w-full max-w-[1500px] px-12 pt-12 pb-12 text-center relative flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="inline-flex items-center px-6 py-2 bg-purple-50 rounded-full border border-purple-100 mb-6">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-purple-500">Multimodal v3.0 Powered by Gemini</span>
          </div>
          <h1 className="text-[64px] md:text-[90px] lg:text-[110px] font-extrabold tracking-[-0.07em] text-slate-900 leading-[0.85] mb-8">
            Next-gen<br />health triage
          </h1>
          <p className="text-slate-500 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Analyze symptoms, classify skin concerns, and get clinical guidance.<br />
            Our AI uses vision and voice for a complete intake experience.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => {
                setIsParentalMode(false);
                startNewSession(false);
              }}
              className="gradient-pill-button group hover:scale-105 transition-transform duration-300"
            >
              <span className="px-12 py-5 bg-white rounded-full flex items-center gap-4 text-xl font-extrabold text-slate-800">
                <SparklesIcon />
                Begin Assessment
              </span>
            </button>
            <button
              onClick={() => {
                setIsParentalMode(true);
                startNewSession(true);
              }}
              className="gradient-pill-button group hover:scale-105 transition-transform duration-300"
            >
              <span className="px-12 py-5 bg-white rounded-full flex items-center gap-4 text-xl font-extrabold text-slate-800">
                👨‍👩‍👧
                Parental Chat
              </span>
            </button>
          </div>
        </main>
        
        {/* Modals */}
        {showAuthPanel && <AuthPanel onAuthSuccess={handleAuthSuccess} />}
        {showSafetyGuidelines && <SafetyGuidelines onClose={() => setShowSafetyGuidelines(false)} />}
        {showClinicalTeam && token && <ClinicalTeam onClose={() => setShowClinicalTeam(false)} token={token} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-[1500px] mx-auto md:px-6 md:py-6">
      <div className="flex flex-col h-full glass-card md:rounded-[70px] shadow-2xl overflow-hidden border-none">
        <header className="px-14 py-10 flex items-center justify-between z-10 bg-white/50 border-b border-white/30 backdrop-blur-3xl">
          <div className="flex items-center gap-6">
            <LogoIcon />
            <div>
              <h2 className="font-extrabold text-2xl text-slate-900 tracking-tighter">
                HealthAssist AI {isParentalMode && <span className="text-purple-600">- Parental Mode</span>}
              </h2>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-[0.3em]">Vision & Voice Intake</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowChatHistory(true)}
              className="px-6 py-3 font-bold rounded-[20px] text-sm transition-all border bg-white text-blue-600 border-blue-100 hover:bg-blue-50"
              title="View Chat History"
            >
              📝 History
            </button>
            <button
              onClick={() => {
                const newMode = !isParentalMode;
                setIsParentalMode(newMode);
                startNewSession(newMode);
              }}
              className={`px-6 py-3 font-bold rounded-[20px] text-sm transition-all border ${
                isParentalMode 
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200' 
                  : 'bg-white text-purple-600 border-purple-100 hover:bg-purple-50'
              }`}
            >
              {isParentalMode ? "Normal Chat" : "Parental Chat"}
            </button>
            <button
              onClick={() => setIsSkinMode(!isSkinMode)}
              className={`px-6 py-3 font-bold rounded-[20px] text-sm transition-all border ${isSkinMode ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-200' : 'bg-white text-purple-600 border-purple-100 hover:bg-purple-50'}`}
            >
              {isSkinMode ? "Switch to Chat" : "Skin Analysis"}
            </button>
            {!isSkinMode && (
              <button onClick={() => startNewSession(isParentalMode)} className="p-4 text-slate-400 hover:text-slate-900 rounded-[20px] border border-transparent hover:border-slate-100"><RefreshIcon /></button>
            )}
            <button onClick={() => setIsLanding(true)} className="px-8 py-3 font-extrabold text-slate-700 bg-white rounded-[20px] border border-slate-100 text-sm">Exit</button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-14 py-16 space-y-20 custom-scrollbar scroll-smooth relative">
          {/* Transparent medical background for chat area */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-[400px] h-[400px] opacity-[0.03]" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm112 280H280v88c0 13.3-10.7 24-24 24s-24-10.7-24-24v-88H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h88v-88c0-13.3 10.7-24 24-24s24 10.7 24 24v88h88c13.3 0 24 10.7 24 24s-10.7 24-24 24z"/>
            </svg>
          </div>
          {isSkinMode ? (
            <SkinAnalysisView />
          ) : (
            <div className="max-w-[1250px] mx-auto space-y-20 relative z-10">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-700 group`}>
                  <div className={`flex gap-10 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-16 h-16 rounded-[28px] flex-shrink-0 flex items-center justify-center shadow-xl ${msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-white text-purple-600 border border-slate-50'}`}>
                      {msg.role === 'user' ? <UserIcon /> : <LogoIcon />}
                    </div>
                    <div className="relative">
                      <div className={`p-14 rounded-[56px] text-2xl font-medium shadow-2xl shadow-slate-300/10 ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white/95 text-slate-700 rounded-tl-none border border-white'}`}>
                        {renderMessageContent(msg)}
                      </div>
                      {/* Message action buttons - shown on hover */}
                      <div className={`absolute ${msg.role === 'user' ? 'left-2' : 'right-2'} -bottom-5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20`}>
                        <button
                          onClick={() => handleCopyMessage(msg)}
                          className={`p-2 rounded-full shadow-md border transition-all hover:scale-110 ${
                            copiedMessageId === msg.id 
                              ? 'bg-green-500 text-white border-green-500' 
                              : 'bg-white text-slate-500 border-slate-100 hover:text-purple-600 hover:border-purple-200'
                          }`}
                          title="Copy message"
                        >
                          {copiedMessageId === msg.id 
                            ? <span className="text-xs font-bold px-1">✓</span>
                            : <CopyIcon className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleSelectText(msg.id)}
                          className="p-2 bg-white text-slate-500 rounded-full shadow-md border border-slate-100 hover:text-purple-600 hover:border-purple-200 transition-all hover:scale-110"
                          title="Select text"
                        >
                          <SelectTextIcon className="w-3.5 h-3.5" />
                        </button>
                        {msg.role === 'user' && (
                          <button
                            onClick={() => handleEditMessage(msg)}
                            className="p-2 bg-white text-slate-500 rounded-full shadow-md border border-slate-100 hover:text-purple-600 hover:border-purple-200 transition-all hover:scale-110"
                            title="Edit & resend"
                          >
                            <EditPencilIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <div className="flex gap-10">
                    <div className="w-16 h-16 rounded-[28px] bg-white border border-slate-100 flex items-center justify-center shadow-2xl"><LogoIcon /></div>
                    <div className="bg-white/90 p-12 rounded-[56px] rounded-tl-none flex gap-4 items-center border border-white">
                      {[0, 0.1, 0.2].map(d => <div key={d} className="w-3.5 h-3.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />)}
                    </div>
                  </div>
                </div>
              )}

              {assessment && (
                <div className="animate-in fade-in duration-500">
                  <button
                    onClick={() => setShowAssessment(!showAssessment)}
                    className={`w-full py-5 px-8 font-bold rounded-[28px] text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                      showAssessment 
                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-purple-200 animate-pulse'
                    }`}
                  >
                    <SparklesIcon />
                    {showAssessment ? 'Hide Assessment Results' : '📋 View Assessment Results'}
                    <svg className={`w-5 h-5 transition-transform duration-300 ${showAssessment ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {showAssessment && (
                    <div className="animate-in slide-in-from-top-4 duration-500">
                      <SummaryCard assessment={assessment} />
                    </div>
                  )}
                </div>
              )}
              <div ref={chatEndRef} className="h-24" />
            </div>
          )}
        </main>

        {!isSkinMode && (
          <footer className="px-14 py-12 border-t border-white/30 bg-white/40 backdrop-blur-3xl">
            <div className="max-w-[1250px] mx-auto">
              {selectedImage && (
                <div className="mb-6 flex animate-in slide-in-from-bottom-4">
                  <div className="relative group">
                    <img src={selectedImage.preview} alt="Preview" className="w-32 h-32 object-cover rounded-[30px] border-4 border-white shadow-xl" />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
              )}

              {/* Editing banner */}
              {editingMessageId && (
                <div className="flex items-center gap-3 px-6 py-3 mb-2 bg-purple-50 border border-purple-200 rounded-2xl animate-in fade-in duration-200">
                  <EditPencilIcon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-purple-700 flex-1">Editing message — previous replies will be regenerated</span>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="relative flex items-center gap-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 bg-white text-slate-400 hover:text-purple-600 rounded-full shadow-lg border border-white transition-all hover:scale-105 active:scale-95"
                >
                  <ImageIcon className="w-8 h-8" />
                </button>

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={editingMessageId ? "Edit your message..." : (isRecording ? "Listening..." : (selectedImage ? "Describe this image..." : "Type your clinical response..."))}
                    className={`w-full pl-12 pr-24 py-11 bg-white border focus:ring-[20px] focus:ring-purple-500/5 rounded-[60px] outline-none transition-all text-2xl font-bold text-slate-800 shadow-2xl ${
                      editingMessageId ? 'border-purple-400 ring-[8px] ring-purple-500/10' : 'border-white focus:border-purple-400'
                    }`}
                  />
                  <button 
                    onClick={toggleRecording} 
                    disabled={!voiceSupported}
                    title={!voiceSupported ? 'Voice input not supported in this browser' : isRecording ? 'Stop recording' : 'Start voice input'}
                    className={`absolute right-8 top-1/2 -translate-y-1/2 p-5 rounded-full transition-all duration-300 ${
                      !voiceSupported ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 
                      isRecording ? 'bg-red-500 text-white scale-125 shadow-xl animate-pulse' : 
                      'bg-slate-50 text-slate-400 hover:text-slate-600 hover:scale-110'
                    }`}
                  >
                    <MicrophoneIcon className="w-8 h-8" />
                  </button>
                </div>
                <button onClick={() => handleSend()} disabled={(!inputText.trim() && !selectedImage) || isTyping} className={`px-16 py-11 text-white rounded-[45px] hover:bg-black disabled:opacity-20 transition-all flex items-center justify-center shadow-2xl h-full ${
                  editingMessageId ? 'bg-purple-600 hover:bg-purple-700' : 'bg-slate-900'
                }`}>
                  <SendIcon />
                </button>
              </div>
            </div>
          </footer>
        )
        }
      </div >
      
      {/* Modals */}
      {showAuthPanel && <AuthPanel onAuthSuccess={handleAuthSuccess} />}
      {showSafetyGuidelines && <SafetyGuidelines onClose={() => setShowSafetyGuidelines(false)} />}
      {showClinicalTeam && token && <ClinicalTeam onClose={() => setShowClinicalTeam(false)} token={token} />}
      {showChatHistory && token && (
        <ChatHistory
          onClose={() => setShowChatHistory(false)}
          token={token}
          onLoadChat={(msgs) => setMessages(msgs)}
        />
      )}
      {showFeedbackModal && user && (
        <FeedbackModal
          isOpen={showFeedbackModal}
          onClose={() => setShowFeedbackModal(false)}
          onSubmit={handleFeedbackSubmit}
          username={user.username}
        />
      )}
    </div >
  );
};

export default App;
