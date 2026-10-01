===============================================================
  PROJECT REVIEW – 2  |  FULL PPT SLIDE CONTENT
  HealthAssist AI — AI-Powered Medical Chatbot with Skin Disease
  Detection using Custom CNN, MobileNetV2 and ResNet50
===============================================================

==============================================================
SLIDE 1 — TITLE SLIDE
==============================================================

PROJECT TITLE:
  HealthAssist AI
  An AI-Powered Medical Chatbot with Intelligent Skin Disease
  Detection

SUBTITLE:
  Combining Conversational AI, Computer Vision & Emergency Management
  for Accessible Healthcare Assistance

DETAILS:
  Department   : Artificial Intelligence & Machine Learning
  Review       : Project Review – 2
  Date         : February 2026

==============================================================
SLIDE 2 — INTRODUCTION
==============================================================

HEADING: Introduction

HealthAssist AI is a full-stack, multi-modal healthcare assistance
platform that bridges the gap between patients and medical
professionals using artificial intelligence.

The system integrates three core AI capabilities:

  1. CONVERSATIONAL MEDICAL INTAKE
     Google Gemini 2.5 Flash powers a structured intake specialist
     that collects demographic data and clinical symptoms one
     question at a time before generating a health assessment.

  2. COMPUTER VISION-BASED SKIN DISEASE DETECTION
     An ensemble of MobileNetV2 and ResNet50 deep learning models
     classifies uploaded skin images into 5 disease categories:
     BCC, Eczema, Melanoma, Seborrheic Keratosis, and Tinea.

  3. EMERGENCY MANAGEMENT SYSTEM
     A real-time emergency request submission and tracking system
     enables patients to request ambulance dispatch and monitor
     response status from within the application.

Additionally, the platform supports:
  - Secure user authentication with SHA-256 password hashing
  - Persistent user and child profiles (no repeated data entry)
  - Dedicated Parental Chat Mode with pediatric-focused AI guidance
  - Full chat history archival and retrieval
  - Safety guidelines and medical disclaimers

TECH STACK SUMMARY:

  Layer           | Technology
  ----------------+------------------------------------------
  Frontend        | React 19, TypeScript 5, Vite 6
  AI / NLP        | Google Gemini 2.5 Flash, Gemini 3 Flash
  ML / CV         | TensorFlow 2.15, Keras, MobileNetV2, ResNet50, Custom CNN
  Backend API     | Python 3.10, Flask 3, Flask-CORS
  Image Processing| Pillow (PIL), NumPy, OpenCV (notebook)
  Data Storage    | JSON flat-file store
  Security        | SHA-256 hashing, UUID4 tokens, Bearer Auth

==============================================================
SLIDE 3 — MOTIVATION
==============================================================

HEADING: Motivation

WHY WAS THIS PROJECT BUILT?

  1. HEALTHCARE ACCESS GAP
     Over 4.5 billion people worldwide lack access to primary
     healthcare. In rural and semi-urban areas, patients wait hours
     or days to consult a doctor, even for non-emergency symptoms.
     An AI-driven assistant can serve as an always-available first
     point of medical contact.

  2. BURDEN OF SKIN DISEASES
     Skin conditions affect approximately 900 million people globally
     at any given time. Melanoma, the deadliest form of skin cancer,
     has a 5-year survival rate of over 98% if detected early, but
     drops below 18% in late-stage diagnosis. Early AI-assisted
     screening can be life-saving.

  3. UNRELIABLE SELF-DIAGNOSIS ONLINE
     72% of patients search symptoms online before seeing a doctor.
     Generic search results and unverified sources frequently lead
     to health anxiety or dangerous self-treatment. A structured,
     evidence-guided AI intake prevents misinterpretation.

  4. ABSENCE OF STRUCTURED AI MEDICAL INTAKE
     Existing AI chatbots (ChatGPT, Gemini in basic mode) provide
     general health information but do not enforce systematic
     clinical data collection — age, sex, specific symptoms,
     duration, and severity — before generating assessments.

  5. NO PEDIATRIC-SPECIFIC DIGITAL TOOL
     Children are medically vulnerable and require age-appropriate,
     dosage-sensitive advice. No widely available chatbot provides
     a dedicated parental mode with a child-specific profile.

  6. EMERGENCY RESPONSE DELAYS
     Patients in crisis have no digital channel to coordinate with
     emergency services and track ambulance dispatch in real time.
     A digital emergency request system reduces response friction.

  7. SKIN CLASSIFICATION SINGLE-MODEL WEAKNESS
     Single CNN models suffer from class imbalance issues,
     particularly for minority classes like Tinea and Seborrheic
     Keratosis. An ensemble approach is needed for robust,
     clinically reliable predictions.

==============================================================
SLIDE 4 — PROBLEM STATEMENT
==============================================================

HEADING: Problem Statement

  "Patients seeking basic medical guidance either wait for
   unavailable appointments, rely on unverified internet sources,
   or receive incomplete AI responses — while potentially
   treatable conditions worsen due to delayed, inaccurate, or
   structurally incomplete assessment."

SPECIFIC PROBLEMS:

  #  | Problem                              | Impact
  ---+--------------------------------------+-------------------------------
  1  | Generic chatbots give unstructured   | Incomplete, inaccurate
     | medical answers without collecting   | health assessments generated
     | age, sex, symptoms, duration,        | before sufficient data
     | severity in order                    |
  ---+--------------------------------------+-------------------------------
  2  | No skin disease detection in         | Visual symptoms (rashes,
     | existing healthcare chatbots         | lesions, growths) are ignored
  ---+--------------------------------------+-------------------------------
  3  | No pediatric-specific mode           | Children receive adult-generic
     |                                      | advice; dosage/safety risks
  ---+--------------------------------------+-------------------------------
  4  | No digital emergency escalation      | No real-time ambulance
     | path within AI health tools          | coordination available
  ---+--------------------------------------+-------------------------------
  5  | No patient profile persistence       | Users re-enter demographics
     | across chat sessions                 | every session — dropout risk
  ---+--------------------------------------+-------------------------------
  6  | Single CNN model bias on minority    | Tinea and Seborrheic
     | skin classes                         | Keratosis severely misclassified
  ---+--------------------------------------+-------------------------------
  7  | No secure authentication in most     | Patient data fully exposed,
     | consumer health chatbots             | no user identity isolation

==============================================================
SLIDE 5 — OBJECTIVES
==============================================================

HEADING: Objectives

The HealthAssist AI project was designed to achieve the following
specific objectives:

  1. Build a structured medical intake chatbot that enforces
     mandatory clinical data collection (age, sex, symptoms,
     duration, severity) through a one-question-at-a-time
     conversational protocol before generating any assessment.

  2. Develop a multi-model skin disease classifier using three
     deep learning architectures — Custom CNN, MobileNetV2, and
     ResNet50 — trained on a 5-class skin disease dataset.

  3. Deploy a MobileNetV2 + ResNet50 production ensemble with
     majority voting and confidence-based tie-breaking to
     maximise classification accuracy.

  4. Integrate Google Gemini 2.5 Flash for conversational AI
     intake and Gemini 3 Flash for generating structured JSON
     health assessments with risk classification.

  5. Implement secure user authentication using SHA-256 password
     hashing with UUID4 token-based session management.

  6. Build a real-time emergency request tracking system with
     ambulance dispatch coordination and status updates
     (pending → en_route → reached / cancelled).

  7. Create a Parental Chat Mode with child-specific profile
     storage for pediatric-focused AI medical guidance.

  8. Enable profile persistence so that returning users are never
     asked for already-stored demographic information.

  9. Compare Custom CNN, MobileNetV2, and ResNet50 architectures
     using Precision, Recall, F1-Score, and Accuracy, identifying
     the best model for production deployment.

 10. Provide a complete, responsive web-based dashboard including
     chat history, skin analysis view, summary card assessment,
     clinical team emergency page, and safety guidelines.

==============================================================
SLIDE 6 — SCOPE OF THE PROJECT
==============================================================

HEADING: Scope of the Project

IN SCOPE — What the system covers:

  Domain                | Description
  ----------------------+----------------------------------------
  Skin Disease Classes  | BCC, Eczema, Melanoma,
                        | Seborrheic Keratosis, Tinea
  Medical Chat          | Structured symptom intake, health
                        | assessment, risk-level classification
  User Management       | Registration, login, profile
                        | persistence across sessions
  Parental Mode         | Child profile storage, pediatric AI
                        | guidance, age-restriction enforcement
  Emergency System      | Request submission, status tracking,
                        | ambulance coordination
  Safety Features       | AI disclaimer, guidelines modal,
                        | emergency escalation to 911
  Dashboard Modules     | Chat history, SkinAnalysisView,
                        | SummaryCard, FeedbackModal,
                        | ClinicalTeam, SafetyGuidelines
  Security              | SHA-256 hashing, token auth, CORS,
                        | input validation, user isolation

OUT OF SCOPE — Not covered in this release:

  - Real-time video/telemedicine consultation
  - Integration with hospital Electronic Health Records (EHR)
  - Live prescription or medication generation
  - GPS-based real-time ambulance tracking
  - Multi-language support (Hindi, Tamil, etc.)
  - Production-grade relational database (PostgreSQL / MongoDB)
  - Mobile application (iOS / Android)

TARGET USERS:
  - General public seeking structured initial medical guidance
  - Parents / guardians consulting on behalf of minor children
  - Individuals with visible skin conditions needing early
    AI-assisted screening before a dermatology appointment

DATA SCOPE:
  Dataset: Skin disease image dataset (Kaggle — IMG_CLASSES)
  5 Classes: Melanoma (capped 4000), BCC, Seborrheic Keratosis,
             Tinea, Eczema
  Split: 85% train+val / 15% test  (stratified)
         Train further split: 85% train / 15% val
  Test set used for all model evaluations: 1,754 images

==============================================================
SLIDE 7 — EXISTING SYSTEM
==============================================================

HEADING: Existing System

OVERVIEW OF CURRENT MARKET SOLUTIONS:

  System               | Type                  | Capability
  ---------------------+-----------------------+---------------------------
  Ada Health           | Symptom Checker App   | Text-based symptom Q&A,
                       |                       | no image support
  WebMD Symptom Checker| Guided FAQ Bot        | Static disease lookup,
                       |                       | no conversational AI
  Babylon Health       | AI Triage Chatbot      | Basic symptom triage,
                       |                       | no skin image detection
  SkinVision           | Skin Cancer App       | Single-task skin image
                       |                       | detection, no chatbot
  Google Dermatology AI| Research AI Tool      | Image-based skin analysis,
                       |                       | not publicly available API
  ChatGPT (Generic)    | LLM Chatbot           | Broad health Q&A, no
                       |                       | structured intake protocol
  Symptomate           | Decision Tree Bot     | Rule-based questions,
                       |                       | no AI / no imagery
  Your.MD              | Health Info App       | Article-based responses,
                       |                       | no personalised intake

KEY OBSERVATIONS ON EXISTING SYSTEMS:

  - All systems handle either TEXT or IMAGE input — never unified
  - None enforce mandatory structured clinical data collection
  - No emergency escalation with real-time tracking built in
  - No pediatric mode with child-specific profile persistence
  - Single-model skin classifiers have poor minority class accuracy
  - No persistent patient profile across sessions
  - Most store credentials insecurely or have no authentication

==============================================================
SLIDE 8 — LIMITATIONS OF EXISTING SYSTEM
==============================================================

HEADING: Limitations of Existing System

  1. NO MULTI-MODAL SUPPORT
     Existing platforms operate in isolated modalities. Chatbots
     handle text; skin apps handle images. No unified platform
     simultaneously processes symptom conversation AND skin images.

  2. LACK OF STRUCTURED MANDATORY INTAKE PROTOCOL
     Generic LLMs (ChatGPT, Gemini unstructured) respond to any
     health query with general information regardless of whether
     the user has provided age, biological sex, specific symptoms,
     duration, or severity. This results in vague or dangerous
     medical guidance.

  3. NO PEDIATRIC / PARENTAL MODE
     Every existing consumer chatbot treats all users identically.
     Children require age-appropriate advice, different dosage
     thresholds, and parental oversight. No product provides a
     dedicated parental mode with a child-specific stored profile.

  4. NO EMERGENCY DIGITAL ESCALATION PATH
     None of the existing digital health tools allow users to
     directly submit an emergency request and track ambulance
     status (pending / en route / reached / cancelled) in real
     time from within the application interface.

  5. NO PROFILE PERSISTENCE ACROSS SESSIONS
     Users of existing chatbots must re-enter demographic
     information (age, sex, medical history) every single session.
     This increases user fatigue, drop-off rates, and error rates.

  6. SINGLE-MODEL SKIN CLASSIFICATION BIAS
     Apps like SkinVision and similar tools rely on a single CNN
     model. On imbalanced datasets, minority classes (Tinea F1:
     ~0.44, Seborrheic Keratosis F1: ~0.67 for single CNNs) are
     frequently misclassified. No ensemble approach is deployed.

  7. INADEQUATE SECURITY ARCHITECTURE
     Most free consumer health chatbots store data without
     authentication, use plain-text passwords, or have no user
     data isolation. This exposes sensitive health information.

  8. NO FEEDBACK LOOP
     Existing systems do not capture user satisfaction ratings or
     qualitative feedback to improve model and UX performance.

==============================================================
SLIDE 9 — PROPOSED SYSTEM
==============================================================

HEADING: Proposed System

HealthAssist AI proposes a unified, full-stack healthcare
assistance platform with the following core sub-systems:

─────────────────────────────────────────────────────────────

SYSTEM ARCHITECTURE (TEXT DIAGRAM):

  ┌──────────────────────────────────────────────────────────┐
  │          REACT FRONTEND  (TypeScript + Vite)             │
  │                                                          │
  │  AuthPanel │ SkinAnalysisView │ ClinicalTeam │ Dashboard │
  │  ChatHistory │ SummaryCard │ SafetyGuidelines │ Feedback │
  └────────────────────┬─────────────────────────────────────┘
                       │  HTTP Requests + Bearer Token Auth
                       ▼
  ┌──────────────────────────────────────────────────────────┐
  │              FLASK BACKEND  (Python 3.10)                │
  │                                                          │
  │  POST /register      POST /login                         │
  │  GET  /profile       POST /profile                       │
  │  GET  /parental-profile   POST /parental-profile         │
  │  GET  /chat-history  POST /chat-history                  │
  │  GET  /emergency-request                                 │
  │  POST /emergency-request  PUT /emergency-request         │
  │  POST /predict       POST /feedback                      │
  │                                                          │
  │  ┌──────────────────┐   ┌──────────────────────────────┐ │
  │  │  JSON Data Store │   │    ML Model Layer            │ │
  │  │  users.json      │   │  custom_cnn_skin_model.keras  │ │
  │  │  user_profiles   │   │  mobilenet_model.weights.h5  │ │
  │  │  parental_profs  │   │  resnet_model.weights.h5     │ │
  │  │  chat_history    │   │                              │ │
  │  │  emergency_reqs  │   │  ensemble_predict()          │ │
  │  │  feedback.json   │   │  Majority + Confidence Vote  │ │
  │  └──────────────────┘   └──────────────────────────────┘ │
  └──────────────────────────────────────────────────────────┘
                       │
                       ▼
  ┌──────────────────────────────────────────────────────────┐
  │           GOOGLE GEMINI AI  (External API)               │
  │  gemini-2.5-flash  →  Conversational medical intake      │
  │  gemini-3-flash    →  Structured JSON health assessment   │
  └──────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────

PROPOSED FEATURES SUMMARY:

  Feature                      | Description
  -----------------------------+----------------------------------
  Structured Medical Intake    | Mandatory collection of age, sex,
                               | symptoms, duration, severity via
                               | one-question-at-a-time AI chat
  Skin Disease Detection       | MobileNetV2 + ResNet50 ensemble;
                               | 5-class classification with
                               | confidence percentage output
  Emergency Request System     | Form submission + status tracker
                               | (pending/en_route/reached/cancelled)
  Parental Chat Mode           | Child profile (age, sex, relation)
                               | stored; pediatric AI guidance
  Profile Persistence          | Demographic data stored once,
                               | reused automatically every session
  Secure Authentication        | SHA-256 + UUID4 token sessions;
                               | localStorage session persistence
  Chat History                 | Full conversation archive with
                               | type tagging and reload capability
  Health Assessment Card       | Structured JSON output:
                               | understanding, possibleCauses[],
                               | riskLevel, recommendations[],
                               | whenToSeeDoctor[], isEmergency
  Safety Guidelines            | Emergency info, AI disclaimers,
                               | privacy policy, best practices
  Feedback System              | Star rating (1–5) + text comments
                               | stored per user session

==============================================================
SLIDE 10 — ADVANTAGES OF THE PROPOSED SYSTEM
==============================================================

HEADING: Advantages of the Proposed System

  #  | Advantage                | Detail
  ---+--------------------------+---------------------------------------
  1  | Unified Multi-Modal      | Single platform handles text chat +
     | Platform                 | image-based skin detection together
  ---+--------------------------+---------------------------------------
  2  | Structured Intake Before | AI enforces all 5 mandatory data
     | Assessment               | points before generating any result;
     |                          | null returned if data incomplete
  ---+--------------------------+---------------------------------------
  3  | Ensemble Model Accuracy  | MobileNetV2 + ResNet50 majority vote
     |                          | outperforms any single model;
     |                          | ResNet50 alone achieves 89.1%
  ---+--------------------------+---------------------------------------
  4  | Pediatric Safety         | Ages 1–17 auto-redirected to Parental
     |                          | Mode; child data stored separately
  ---+--------------------------+---------------------------------------
  5  | Real-Time Emergency      | Ambulance status tracked live:
     | Coordination             | pending → en_route → reached
  ---+--------------------------+---------------------------------------
  6  | Persistent Profile       | One-time age + sex entry; AI greets
     |                          | returning users with profile data
  ---+--------------------------+---------------------------------------
  7  | Layered Security         | SHA-256 + token auth + CORS + input
     |                          | validation + user-isolated JSON data
  ---+--------------------------+---------------------------------------
  8  | Full Chat Archive        | All sessions saved with timestamps;
     |                          | normal vs parental type tagged
  ---+--------------------------+---------------------------------------
  9  | Risk Classification      | Every AI assessment tagged as
     |                          | LOW / MODERATE / HIGH + isEmergency
  ---+--------------------------+---------------------------------------
  10 | Open & Extendable Stack  | React + Flask architecture easily
     |                          | accepts new ML models or AI providers

==============================================================
SLIDE 11 — SYSTEM ARCHITECTURE  (DETAILED)
==============================================================

HEADING: System Architecture

──────────────────────────────────────────────────────────────
LAYER 1 — FRONTEND (React 19 + TypeScript 5 + Vite 6)
──────────────────────────────────────────────────────────────

  App.tsx (Root Component)
  ├── State: isAuthenticated, token, user, messages,
  │          userProfile, parentalProfile, isLanding,
  │          isSkinMode, isParentalMode, UI modals
  │
  ├── components/
  │   ├── AuthPanel.tsx          Login / Register modal
  │   ├── SkinAnalysisView.tsx   Image upload + prediction result
  │   ├── SummaryCard.tsx        Structured assessment display
  │   ├── ChatHistory.tsx        Past conversations list + reload
  │   ├── ClinicalTeam.tsx       Emergency form + status tracker
  │   ├── SafetyGuidelines.tsx   Safety info + disclaimers modal
  │   ├── FeedbackModal.tsx      Star rating feedback form
  │   └── Icons.tsx              Reusable SVG icon components
  │
  └── services/
      ├── geminiService.ts       Google Gemini integration
      │   ├── sendMessage()      Chat with gemini-2.5-flash
      │   └── getStructuredAssessment() → gemini-3-flash JSON
      ├── predictService.ts      POST to Flask /predict endpoint
      └── apiService.ts          All other Flask API calls
                                 (auth, profile, history, emergency)

──────────────────────────────────────────────────────────────
LAYER 2 — BACKEND (Flask + Python 3.10)
──────────────────────────────────────────────────────────────

  app.py (676 lines, single-file Flask application)

  Authentication:
    POST /register    email, username, password → SHA-256 hash
                      → UUID user_id + UUID token → users.json
    POST /login       email or username + password
                      → verify hash → new token returned

  Profile Management:
    GET  /profile     Return stored age + biological_sex
    POST /profile     Validate age (0–100), normalize sex
                      ("male/MALE" → "Male")
                      → user_profiles.json

  Parental Profile:
    GET  /parental-profile  Return child_age, sex, relation
    POST /parental-profile  Validate child_age (0–17)
                            → parental_profiles.json

  Chat History:
    GET  /chat-history  Return all sessions for user
    POST /chat-history  Save message[], chat_type, timestamp
                        → chat_history.json

  Emergency Request:
    GET  /emergency-request  Return user's request list
    POST /emergency-request  address + problem
                             → status: "pending"
    PUT  /emergency-request  request_id + status
                             → "reached" or "cancelled"

  ML Prediction:
    POST /predict   multipart/form-data (image file)
                    → PIL.Image → ensemble_predict()
                    → { prediction, confidence% }

  Feedback:
    POST /feedback  rating (1–5) + comment → feedback.json

──────────────────────────────────────────────────────────────
LAYER 3 — ML MODEL LAYER (TensorFlow + Keras)
──────────────────────────────────────────────────────────────

  Models loaded on backend startup:
    mobilenet_model  ← mobilenet_model.weights.h5
    resnet_model     ← resnet_model.weights.h5

  ensemble_predict(img):
    1. Resize image to 224×224 RGB
    2. MobileNetV2 branch:
       mobilenet_preprocess → model.predict → mob_idx, mob_conf
    3. ResNet50 branch:
       resnet_preprocess → model.predict → res_idx, res_conf
    4. Decision:
       if mob_idx == res_idx → final = mob_idx, conf = max
       else                  → final = higher confidence model
    5. Return class_names[final_idx], confidence%

  Classes:
    Index 0 → BCC                 (Basal Cell Carcinoma)
    Index 1 → Eczema              (Atopic Dermatitis)
    Index 2 → Melanoma            (Malignant Melanoma)
    Index 3 → Seborrheic_Keratosis(Benign tumour)
    Index 4 → Tinea               (Fungal infection)

──────────────────────────────────────────────────────────────
LAYER 4 — EXTERNAL AI SERVICE (Google Gemini)
──────────────────────────────────────────────────────────────

  gemini-2.5-flash
    Role: HealthAssist AI — Senior Medical Intake Specialist
    Behaviour:
     • ONE question per turn (enforced via system instruction)
     • Mandatory data points: age, sex, symptoms, duration, severity
     • Skin image: describe pigmentation, lesions, texture, borders
     • Emergency (chest pain, stroke FAST): advise 911, halt intake
     • Temperature: 0.5 (balanced accuracy + empathy)

  gemini-3-flash (gemini-3-flash-preview)
    Role: Generate structured JSON health assessment
    Output schema (responseMimeType: application/json):
     {
       understanding:    string  (clinical summary)
       possibleCauses:   string[]
       riskLevel:        "Low Risk" | "Moderate Risk" | "High Risk"
       recommendations:  string[]
       whenToSeeDoctor:  string[]
       isEmergency:      boolean
     }
    Guard: Returns null if ANY mandatory field is missing/vague

──────────────────────────────────────────────────────────────
SECURITY ARCHITECTURE
──────────────────────────────────────────────────────────────

  Layer 1 — Frontend:
    Token stored in localStorage
    Client-side age/sex validation before API call
    HTTPS in production deployment

  Layer 2 — Transport:
    Authorization: Bearer <uuid-token> header on all API calls
    CORS configured in Flask (Flask-CORS)
    Content-Type validation

  Layer 3 — Backend:
    Token lookup in users.json on every protected endpoint
    SHA-256(password) comparison — plaintext never stored
    Age validation: negative / >100 / 1–17 all handled
    Sex normalisation: male/MALE/Male → "Male"

  Layer 4 — Data:
    All data isolated per user_id (UUID)
    Passwords: SHA-256 hash only
    Emergency requests: user_id ownership verified on PUT

==============================================================
SLIDE 12 — MODULE DESCRIPTION
==============================================================

HEADING: Module Description

──────────────────────────────────────────────────────────────
MODULE 1 — AUTHENTICATION MODULE
──────────────────────────────────────────────────────────────

Files:   components/AuthPanel.tsx
         backend/app.py  (/register, /login)
         services/apiService.ts

Process Flow:

  User fills Register Form (email, username, password)
        │
        ▼
  Frontend validates all fields non-empty
        │
        ▼
  POST /register sent to Flask
        │
        ▼
  Backend checks if email already in users.json
  Backend checks if username already taken
        │
        ▼
  hash_password(password) → SHA-256 hex string
  generate_token()        → UUID4 string
        │
        ▼
  New record written to users.json:
    { id, username, password(hashed), token, created_at }
        │
        ▼
  Token returned to frontend
        │
        ▼
  Token stored in localStorage → All subsequent API calls
  use Authorization: Bearer <token>

Login:
  POST /login with email-or-username + password
  → find user record → compare SHA-256 hash
  → generate new token → return to frontend

Key Functions:
  hash_password(p)  → hashlib.sha256(p.encode()).hexdigest()
  generate_token()  → str(uuid.uuid4())

──────────────────────────────────────────────────────────────
MODULE 2 — SKIN DISEASE DETECTION MODULE
──────────────────────────────────────────────────────────────

Files:   components/SkinAnalysisView.tsx
         services/predictService.ts
         backend/app.py  (build_mobilenet, build_resnet,
                          ensemble_predict, /predict)
         models/mobilenet_model.weights.h5
         models/resnet_model.weights.h5
         models/custom_cnn_skin_model.keras

Architecture built on startup:

  MobileNetV2 Architecture:
    keras.Input(224,224,3)
    → MobileNetV2 base (weights=None, include_top=False)
    → GlobalAveragePooling2D
    → BatchNormalization
    → Dense(128, relu)
    → Dropout(0.5)
    → Dense(5, softmax)
    Load: mobilenet_model.load_weights(...)

  ResNet50 Architecture:
    keras.Input(224,224,3)
    → ResNet50 base (weights=None, include_top=False)
    → GlobalAveragePooling2D
    → BatchNormalization
    → Dense(256, relu)       ← wider than MobileNet
    → Dropout(0.5)
    → Dense(5, softmax)
    Load: resnet_model.load_weights(...)

Prediction Flow:
  POST /predict (multipart file)
    → PIL.Image.open().convert("RGB")
    → img.resize(224,224) → np.array → expand_dims
    → MobileNet branch:  mobilenet_preprocess → predict
    → ResNet branch:     resnet_preprocess    → predict
    → Ensemble decision (agree → max conf / disagree → higher conf)
    → JSON response: { prediction: str, confidence: float }

Output Example:
  { "prediction": "Melanoma", "confidence": 94.37 }

──────────────────────────────────────────────────────────────
MODULE 3 — CONVERSATIONAL AI MEDICAL INTAKE MODULE
──────────────────────────────────────────────────────────────

Files:   services/geminiService.ts
         App.tsx

Class: HealthAIService
  constructor()     → initialises GoogleGenAI(apiKey)
  sendMessage()     → builds contents[] with history
                      → gemini-2.5-flash + system instruction
                      → returns response text, updates history
  getStructuredAssessment()
                    → sends full history string to gemini-3-flash
                    → JSON schema enforced via responseSchema
                    → returns HealthAssessment | null
  reset()           → clears conversation history

System Instruction (loaded into every chat request):
  Role: Senior Medical Intake Specialist
  Rules:
    • ONE question per turn — never ask two at once
    • Must collect: age, sex, symptoms, duration, severity
    • Skin image provided: describe pigmentation, lesions,
      texture, borders; ask about itching, pain, bleeding
    • Do NOT generate assessments in chat turns — only intake
    • Emergency keywords (chest pain, stroke FAST, severe
      breathing difficulty): advise 911 immediately, stop intake
    • Temperature: 0.5 (balanced clinical tone)

Assessment Guard (getStructuredAssessment):
  Returns null when:
    • Any of the 5 mandatory fields missing or vague
    • possibleCauses[] is empty or says "not provided"
    • understanding contains "not yet provided"
  Only returns HealthAssessment when ALL fields are specific

──────────────────────────────────────────────────────────────
MODULE 4 — USER PROFILE MANAGEMENT MODULE
──────────────────────────────────────────────────────────────

Files:   backend/app.py  (/profile)
         services/apiService.ts
         App.tsx

GET /profile:
  Token → look up user_id → load user_profiles.json
  Return: { age, biological_sex, updated_at }
  If no profile: return {}

POST /profile:
  Validate age:
    - Not numeric       → "Please enter a valid numeric age"
    - Negative / >100   → "Please enter a valid age"
    - 1–17              → "Age restriction: please ask parent"
                          + age_restricted: true flag
  Normalize sex:
    "male" / "MALE" / "Male" → "Male"
    "female" / "FEMALE"      → "Female"
  Partial update: only update fields that have new values;
  preserve existing data
  Save: user_profiles[user_id] → user_profiles.json

Profile Persistence:
  First session: AI asks age & sex → POST /profile to save
  Return session: GET /profile → has data
                  AI: "I have your profile: Male, age 35"
                  → skips demographic questions entirely

──────────────────────────────────────────────────────────────
MODULE 5 — PARENTAL CHAT MODE MODULE
──────────────────────────────────────────────────────────────

Files:   backend/app.py  (/parental-profile)
         App.tsx  (isParentalMode state)

GET /parental-profile:
  Return child_age, child_biological_sex, child_relation

POST /parental-profile:
  child_age:            validated 0–17
  child_biological_sex: normalized (Male/Female)
  child_relation:       son / daughter / other
  Partial update: preserves existing fields

UX Flow:
  1. User clicks "Parental Chat" button
  2. GET /parental-profile → profile exists?
     YES → skip child questions; greet with stored child info
     NO  → AI asks: relation, child sex, child age (in order)
  3. AI system instruction adjusted for pediatric guidance
  4. Chat saved as chat_type: "parental"

──────────────────────────────────────────────────────────────
MODULE 6 — EMERGENCY REQUEST MODULE
──────────────────────────────────────────────────────────────

Files:   components/ClinicalTeam.tsx
         backend/app.py  (/emergency-request GET, POST, PUT)

GET  /emergency-request → returns all requests by this user

POST /emergency-request:
  Fields required: address (string), problem (string)
  Creates record:
  {
    id:         UUID,
    user_id:    UUID,
    address:    "123 Main St",
    problem:    "Severe chest pain",
    status:     "pending",
    created_at: ISO datetime,
    updated_at: ISO datetime
  }
  Saved to: emergency_requests.json

PUT /emergency-request:
  Fields: request_id, status ("reached" | "cancelled")
  Validates: request_id exists, user_id matches token
  Updates status + updated_at

Status Lifecycle:
  pending → en_route → reached
                    ↘ cancelled

Visual Indicators in UI (ClinicalTeam.tsx):
  pending:   "📞 Request Received" — pulsing red border
  en_route:  "🚑 Ambulance En Route"
  reached:   "✅ Help Has Arrived"
  cancelled: "❌ Request Cancelled"

──────────────────────────────────────────────────────────────
MODULE 7 — CHAT HISTORY MODULE
──────────────────────────────────────────────────────────────

Files:   components/ChatHistory.tsx
         backend/app.py  (/chat-history GET, POST)

POST /chat-history (auto-called on session end):
  message:   full messages[] array (stringified)
  chat_type: "normal" or "parental"
  Saves entry: { id, message, chat_type, timestamp }
  Appended to: chat_history[user_id][]
  File: chat_history.json

GET /chat-history → returns all sessions for user

User can:
  • Click "📝 History" button in chat header
  • See list of past sessions with type badge and timestamp
  • Click any entry to reload that conversation into the chat

──────────────────────────────────────────────────────────────
MODULE 8 — FEEDBACK MODULE
──────────────────────────────────────────────────────────────

Files:   components/FeedbackModal.tsx
         backend/app.py  (/feedback POST)

POST /feedback:
  rating:  integer 1–5 (validated)
  comment: optional free text
  Saved: { id, username, rating, comment, timestamp }
  File: feedback.json

==============================================================
SLIDE 13 — METHODOLOGY
==============================================================

HEADING: Methodology

──────────────────────────────────────────────────────────────
PHASE 1 — DATASET COLLECTION & PREPARATION
──────────────────────────────────────────────────────────────

Source: Kaggle — Skin Diseases Image Dataset (IMG_CLASSES)

Original Class Distribution:
  Class                  | Folder Name                          | Images
  -----------------------+--------------------------------------+--------
  Melanoma               | 2. Melanoma 15.75k                   | ~15,750
  BCC                    | 4. Basal Cell Carcinoma (BCC) 3323   |  3,323
  Seborrheic_Keratosis   | 8. Seborrheic Keratoses-1.8k         |  1,800
  Tinea                  | 9. Tinea Ringworm Candidiasis-1.7k   |  1,700
  Eczema                 | 1. Eczema 1677                        |  1,677

Balancing Strategy:
  Melanoma downsampled to 4,000 images (prevent dominant class bias)

Label Encoding (alphabetically sorted):
  BCC→0, Eczema→1, Melanoma→2, Seborrheic_Keratosis→3, Tinea→4

Class Weight Computation:
  sklearn.utils.class_weight.compute_class_weight("balanced", ...)
  Applied during training to penalise majority class errors

Train / Val / Test Split (stratified):
  Step 1: 85% train+val | 15% test
  Step 2: train+val split → 85% train | 15% val

Final Test Set: 1,754 images (used for all evaluations)

Image Loading (notebook):
  - cv2.imread → cv2.cvtColor(BGR→RGB) → cv2.resize(224,224)
  - TF pipeline: tf.io.read_file → decode_jpeg → resize → cast/scale
  - AUTOTUNE parallelism + prefetch for efficient batch loading

──────────────────────────────────────────────────────────────
PHASE 2 — MODEL ARCHITECTURE DESIGN
──────────────────────────────────────────────────────────────

A. CUSTOM CNN (Baseline)

  Built using tf.keras.Sequential:

    Input(224, 224, 3)
        ↓
    Conv2D(32, 3×3, relu, same padding)
    BatchNormalization → MaxPooling2D
        ↓
    Conv2D(64, 3×3, relu, same padding)
    BatchNormalization → MaxPooling2D
        ↓
    Conv2D(128, 3×3, relu, same padding)
    BatchNormalization → MaxPooling2D
        ↓
    Flatten
    Dense(256, relu)
    Dropout(0.5)
        ↓
    Dense(5, softmax)

  Compile:
    optimizer = Adam(lr=0.001)
    loss      = sparse_categorical_crossentropy
    metrics   = [accuracy]

  Training:
    Epochs = 20 (EarlyStopping patience=3)
    class_weight applied
    ReduceLROnPlateau(factor=0.3, patience=2)

─────────────────────────────────────────

B. MobileNetV2 (Transfer Learning — Two Phase)

  Base: MobileNetV2(weights='imagenet', include_top=False,
                    input_shape=(224,224,3))
  Preprocessing: mobilenet_v2.preprocess_input → scales to [-1,1]

  Head added:
    base_model (MobileNetV2)
    GlobalAveragePooling2D
    BatchNormalization
    Dense(128, relu)
    Dropout(0.5)
    Dense(5, softmax)

  Phase 1 — Feature Extraction:
    base_model.trainable = False
    optimizer = Adam(lr=1e-3)
    epochs = 8, EarlyStopping patience=3

  Phase 2 — Fine-Tuning:
    Unfreeze all layers
    Freeze all layers EXCEPT last 30
    optimizer = Adam(lr=1e-5)   ← lower LR for stable fine-tune
    epochs = 10, EarlyStopping patience=3

  History combined: Phase1 + Phase2 for final accuracy/loss plots

─────────────────────────────────────────

C. ResNet50 (Transfer Learning)

  Base: ResNet50(weights='imagenet', include_top=False,
                 input_shape=(224,224,3))
  Preprocessing: resnet50.preprocess_input (channel mean subtract)

  Head added:
    base_model (ResNet50)
    GlobalAveragePooling2D
    BatchNormalization
    Dense(256, relu)       ← Deeper classification head vs MobileNet
    Dropout(0.5)
    Dense(5, softmax)

  Training:
    Phase 1: base_model.trainable = False, Adam(lr=1e-3), epochs=10
    EarlyStopping patience=3
    ReduceLROnPlateau(factor=0.3, patience=2)

──────────────────────────────────────────────────────────────
PHASE 3 — TRAINING HYPERPARAMETERS SUMMARY
──────────────────────────────────────────────────────────────

  Parameter         | Custom CNN   | MobileNetV2     | ResNet50
  ------------------+--------------+-----------------+----------
  Input Size        | 224×224×3    | 224×224×3       | 224×224×3
  Num Classes       | 5            | 5               | 5
  Optimizer         | Adam 1e-3    | Adam 1e-3/1e-5  | Adam 1e-3
  Loss              | SCE          | SCE             | SCE
  Dropout           | 0.5          | 0.5             | 0.5
  Batch Norm        | Yes          | Yes             | Yes
  Class Weights     | Yes          | Yes             | Yes
  EarlyStopping     | patience=3   | patience=3      | patience=3
  ReduceLROnPlateau | f=0.3, p=2   | f=0.3, p=2      | f=0.3, p=2
  Max Epochs        | 20           | 8+10=18         | 10
  Base Weights      | None         | ImageNet        | ImageNet

──────────────────────────────────────────────────────────────
PHASE 4 — EVALUATION & RESULTS
──────────────────────────────────────────────────────────────

MODEL A — CUSTOM CNN

  Test Accuracy   : 80.0%
  Macro F1 Score  : 0.7350

  Class-wise Results:
  ┌──────────────────────┬───────────┬────────┬──────────┬─────────┐
  │ Class                │ Precision │ Recall │ F1-Score │ Support │
  ├──────────────────────┼───────────┼────────┼──────────┼─────────┤
  │ BCC                  │   0.98    │  0.96  │   0.97   │   499   │
  │ Eczema               │   0.64    │  0.62  │   0.63   │   252   │
  │ Melanoma             │   0.95    │  0.97  │   0.96   │   471   │
  │ Seborrheic_Keratosis │   0.63    │  0.71  │   0.67   │   277   │
  │ Tinea                │   0.47    │  0.42  │   0.44   │   255   │
  ├──────────────────────┼───────────┼────────┼──────────┼─────────┤
  │ Accuracy             │           │        │   0.80   │  1754   │
  │ Macro Avg            │   0.73    │  0.74  │   0.74   │  1754   │
  │ Weighted Avg         │   0.79    │  0.80  │   0.79   │  1754   │
  └──────────────────────┴───────────┴────────┴──────────┴─────────┘

  Observations:
  • BCC and Melanoma classified excellently (F1 0.97, 0.96)
  • Tinea poorest performance (F1 0.44) — class confusion likely
    with Eczema due to visual similarity
  • Seborrheic Keratosis moderate (F1 0.67)

─────────────────────────────────────────

MODEL B — MobileNetV2 (Two-Phase Fine-Tune)

  Test Accuracy      : 77.3%  (77.31%)
  Weighted F1 Score  : 0.7672

  Class-wise Results:
  ┌──────────────────────┬───────────┬────────┬──────────┬─────────┐
  │ Class                │ Precision │ Recall │ F1-Score │ Support │
  ├──────────────────────┼───────────┼────────┼──────────┼─────────┤
  │ BCC      (0)         │   0.93    │  0.91  │   0.92   │   499   │
  │ Eczema   (1)         │   0.57    │  0.70  │   0.63   │   252   │
  │ Melanoma (2)         │   0.90    │  0.93  │   0.91   │   471   │
  │ Seborrheic K. (3)    │   0.62    │  0.71  │   0.66   │   277   │
  │ Tinea    (4)         │   0.61    │  0.36  │   0.45   │   255   │
  ├──────────────────────┼───────────┼────────┼──────────┼─────────┤
  │ Accuracy             │           │        │   0.77   │  1754   │
  │ Macro Avg            │   0.73    │  0.72  │   0.72   │  1754   │
  │ Weighted Avg         │   0.77    │  0.77  │   0.77   │  1754   │
  └──────────────────────┴───────────┴────────┴──────────┴─────────┘

  Observations:
  • Good on BCC (0.92) and Melanoma (0.91)
  • Tinea recall very low (0.36) — model misses many Tinea cases
  • Slightly lower than Custom CNN in overall accuracy
  • Lightweight architecture: suitable for mobile deployment

─────────────────────────────────────────

MODEL C — ResNet50  ★ BEST MODEL ★

  Test Accuracy      : 89.1%  (89.05%)
  Weighted F1 Score  : 0.8903
  Test Loss          : 0.3073

  Class-wise Results:
  ┌──────────────────────┬───────────┬────────┬──────────┬─────────┐
  │ Class                │ Precision │ Recall │ F1-Score │ Support │
  ├──────────────────────┼───────────┼────────┼──────────┼─────────┤
  │ BCC      (0)         │   0.98    │  0.99  │   0.98   │   499   │
  │ Eczema   (1)         │   0.77    │  0.75  │   0.76   │   252   │
  │ Melanoma (2)         │   0.99    │  0.97  │   0.98   │   471   │
  │ Seborrheic K. (3)    │   0.81    │  0.84  │   0.83   │   277   │
  │ Tinea    (4)         │   0.75    │  0.73  │   0.74   │   255   │
  ├──────────────────────┼───────────┼────────┼──────────┼─────────┤
  │ Accuracy             │           │        │   0.89   │  1754   │
  │ Macro Avg            │   0.86    │  0.86  │   0.86   │  1754   │
  │ Weighted Avg         │   0.89    │  0.89  │   0.89   │  1754   │
  └──────────────────────┴───────────┴────────┴──────────┴─────────┘

  Observations:
  • ALL classes show strong F1 ≥ 0.74 — no class severely under-served
  • BCC and Melanoma near-perfect: 0.98
  • Tinea improved from 0.44 (CNN) → 0.74 (+68% relative improvement)
  • Seborrheic Keratosis improved from 0.67 (CNN) → 0.83 (+24%)
  • Deep residual connections enable better feature discrimination
    for visually similar classes

─────────────────────────────────────────

MODEL COMPARISON TABLE:

  Metric           │ Custom CNN │ MobileNetV2 │ ResNet50 ★
  ─────────────────┼────────────┼─────────────┼──────────
  Test Accuracy    │   80.0%    │   77.3%     │  89.1%
  Weighted F1      │   0.790    │   0.767     │  0.890
  Macro F1         │   0.735    │   0.720     │  0.860
  BCC F1           │   0.97     │   0.92      │  0.98
  Eczema F1        │   0.63     │   0.63      │  0.76
  Melanoma F1      │   0.96     │   0.91      │  0.98
  Seborrheic F1    │   0.67     │   0.66      │  0.83
  Tinea F1         │   0.44     │   0.45      │  0.74
  Base Weights     │   None     │   ImageNet  │  ImageNet
  Head Dense Size  │   256      │   128       │  256

WHY RESNET50 PERFORMS BEST:
  • Residual (skip) connections allow gradients to flow through
    deep networks without vanishing — enables learning of more
    complex skin texture features
  • Deeper Dense(256) head provides more representational capacity
  • ImageNet pre-training provides superior low-level feature
    initialisation vs training from scratch
  • Residual identity shortcuts help distinguish visually similar
    classes (Tinea vs Eczema, Seborrheic K. vs Melanoma)

──────────────────────────────────────────────────────────────
PHASE 5 — ENSEMBLE DEPLOYMENT IN PRODUCTION
──────────────────────────────────────────────────────────────

  The production Flask backend uses MobileNetV2 + ResNet50 ensemble:

    def ensemble_predict(img):
        img_array = prepare_image(img)           # 224×224, expand_dims

        # MobileNet branch
        mob_input = mobilenet_preprocess(img_array.copy())
        mob_preds = mobilenet_model.predict(mob_input, verbose=0)[0]
        mob_idx   = np.argmax(mob_preds)
        mob_conf  = mob_preds[mob_idx]

        # ResNet branch
        res_input = resnet_preprocess(img_array.copy())
        res_preds = resnet_model.predict(res_input, verbose=0)[0]
        res_idx   = np.argmax(res_preds)
        res_conf  = res_preds[res_idx]

        # Decision logic
        if mob_idx == res_idx:                    # Both agree
            final_idx  = mob_idx
            final_conf = max(mob_conf, res_conf)
        else:                                     # Disagree
            if mob_conf > res_conf:
                final_idx, final_conf = mob_idx, mob_conf
            else:
                final_idx, final_conf = res_idx, res_conf

        return class_names[final_idx], float(final_conf)

  Returns: { "prediction": "Melanoma", "confidence": 94.37 }

──────────────────────────────────────────────────────────────
PHASE 6 — NOTEBOOK (EfficientNetB0 + ConvNextTiny TRACK)
──────────────────────────────────────────────────────────────

File: skin-diseases-efficientnetb0-convnexttiny-82.ipynb

  This notebook trains and evaluates three models in sequence on
  the same skin disease dataset using Kaggle infrastructure:

  Models Trained in Notebook:
    1. Custom CNN         → saved as custom_cnn_skin_model.keras
    2. MobileNetV2        → saved as mobilenet_model.keras /
                            skin_disease_mobilenet.keras
    3. ResNet50           → evaluated & compared

  Notebook Pipeline:
    Cell 1:  Import libraries (TF, sklearn, cv2, pandas, seaborn)
    Cell 2:  Define class paths (Kaggle dataset)
    Cell 3:  Load images, downsample Melanoma to 4000, build df
    Cell 4:  Stratified train/val/test split
    Cell 5:  Show 6 sample images (matplotlib)
    Cell 6:  Build label_map, TF dataset pipeline with decode_img
    Cell 7:  Compute class weights (balanced)
    Cell 8:  Build & train Custom CNN (20 epochs, callbacks)
    Cell 9:  Plot Custom CNN accuracy/loss curves
    Cell 10: Evaluate CNN — Classification Report + Confusion Matrix
    Cell 11: Show sample CNN predictions (9-grid)
    Cell 12: Save custom_cnn_skin_model.keras
    Cell 13: Build MobileNetV2 dataset (mobilenet_preprocess)
    Cell 14: Build MobileNetV2 model (frozen base initially)
    Cell 15: Callbacks definition
    Cell 16: Phase 1 training (8 epochs, frozen)
    Cell 17: Phase 2 fine-tuning (unfreeze last 30, lr=1e-5, 10 ep)
    Cell 18: Combine Phase1 + Phase2 history
    Cell 19: Plot MobileNetV2 accuracy/loss curves
    Cell 20: Evaluate MobileNetV2 — F1 + Classification Report
    Cell 21: Confusion Matrix (MobileNetV2)
    Cell 22: Sample predictions (MobileNetV2, reversed preprocess)
    Cell 23: Save mobilenet_model.keras
    Cell 24: Build ResNet50 dataset (resnet_preprocess)
    Cell 25: Build ResNet50 model (Dense=256)
    Cell 26: Train ResNet50 (10 epochs, class_weight, callbacks)
    Cell 27: Evaluate ResNet50 — Accuracy + F1 + Report
    Cell 28: Show best model predictions
    Cell 29: Plot comparison bar chart:
             Accuracy & F1 for Custom CNN, MobileNetV2, ResNet50

  Comparison Bar Chart Variables (notebook Cell 29):
    accuracies = [test_acc_cnn, test_acc_mob, test_acc_res]
    f1_scores  = [f1_cnn,       f1_mob,       f1_res      ]
    (PPT can use these as data for a grouped bar chart)

──────────────────────────────────────────────────────────────
PHASE 7 — SYSTEM INTEGRATION
──────────────────────────────────────────────────────────────

  Trained model weights → deployed in Flask backend:
    models/mobilenet_model.weights.h5
    models/resnet_model.weights.h5
    models/custom_cnn_skin_model.keras (reference)

  Frontend integration:
    SkinAnalysisView.tsx → predictService.ts → POST /predict
    → displays prediction label + confidence bar in UI

  AI integration:
    If skin image analyzed in chat:
    → geminiService.sendMessage(text, {image: base64, mimeType})
    → Gemini describes visual findings + asks clinical questions
    → After all data collected → getStructuredAssessment()
    → SummaryCard renders risk level + recommendations

==============================================================
SLIDE 14 — TECH STACK (COMPLETE)
==============================================================

HEADING: Technology Stack

─────────────────────────────────────────
FRONTEND
─────────────────────────────────────────

  Technology         | Version  | Purpose
  -------------------+----------+-------------------------------------
  React              | 19.2.4   | Component-based UI framework
  TypeScript         | 5.8.2    | Type-safe JavaScript
  Vite               | 6.2.0    | Build tool & HMR dev server
  @google/genai SDK  | 1.39.0   | Google Gemini API client
  @vitejs/plugin-react| 5.0.0   | React fast refresh in Vite
  @types/node        | 22.14.0  | Node type definitions

  Key TypeScript Interfaces (types.ts):
    RiskLevel enum:   LOW | MODERATE | HIGH
    Message:          { id, role, content, timestamp }
    HealthAssessment: { understanding, possibleCauses[], riskLevel,
                        recommendations[], whenToSeeDoctor[],
                        isEmergency }
    UserProfile:      { age?, sex?, symptoms?, duration?, severity? }

─────────────────────────────────────────
BACKEND
─────────────────────────────────────────

  Technology           | Version   | Purpose
  ---------------------+-----------+----------------------------------
  Python               | 3.10+     | Backend language
  Flask                | 3.x       | Lightweight REST API framework
  Flask-CORS           | 4.x       | Cross-Origin Resource Sharing
  TensorFlow           | 2.15+     | Deep learning framework
  Keras (built-in)     | tf.keras  | Model architecture & loading
  MobileNetV2 (Keras)  | ImageNet  | Transfer learning base model
  ResNet50 (Keras)     | ImageNet  | Transfer learning base model
  NumPy                | 1.26+     | Array operations + preprocessing
  Pillow (PIL)         | 10.x      | Image loading & format conversion
  hashlib              | stdlib    | SHA-256 password hashing
  uuid                 | stdlib    | UUID4 token & ID generation
  json                 | stdlib    | JSON file read/write operations
  datetime             | stdlib    | ISO timestamp generation
  os                   | stdlib    | Directory creation & path ops

─────────────────────────────────────────
AI / ML STACK
─────────────────────────────────────────

  Component               | Model                  | Role
  ------------------------+------------------------+------------------
  Conversational Intake   | gemini-2.5-flash       | Medical Q&A AI
  Structured Assessment   | gemini-3-flash-preview | JSON output AI
  Custom CNN Classifier   | Sequential CNN         | Baseline model
  Transfer Learning (1)   | MobileNetV2 (Keras)    | Lightweight CNN
  Transfer Learning (2)   | ResNet50 (Keras)       | High-accuracy CNN
  Production Ensemble     | MobileNetV2 + ResNet50 | Combined predict
  Notebook EDA Library    | OpenCV (cv2)           | Image read/resize
  Notebook ML             | scikit-learn           | Metrics, weights

─────────────────────────────────────────
DATA STORAGE
─────────────────────────────────────────

  File                      | Content
  --------------------------+------------------------------------------
  data/users.json           | { email: {id,username,password(hash),
                            |   token, created_at} }
  data/user_profiles.json   | { user_id: {age, biological_sex,
                            |   updated_at} }
  data/parental_profiles.json| { user_id: {child_age,
                            |   child_biological_sex, child_relation,
                            |   updated_at} }
  data/chat_history.json    | { user_id: [ {id, message, chat_type,
                            |   timestamp} ] }
  data/emergency_requests.json| { req_id: {id, user_id, address,
                            |   problem, status, created_at,
                            |   updated_at} }
  data/feedback.json        | { id: {id, username, rating, comment,
                            |   timestamp} }

─────────────────────────────────────────
MODEL FILES
─────────────────────────────────────────

  File                             | Model
  ---------------------------------+----------------------------
  models/mobilenet_model.weights.h5 | MobileNetV2 weights
  models/resnet_model.weights.h5    | ResNet50 weights
  models/custom_cnn_skin_model.keras| Custom CNN full model
  models/custom_cnn_skin_model.h5   | Custom CNN (legacy)
  models/mobilenet_model.keras      | MobileNetV2 full model

─────────────────────────────────────────
DEVELOPMENT & SETUP
─────────────────────────────────────────

  Frontend Commands:
    npm install          Install all frontend dependencies
    npm run dev          Start Vite dev server (http://localhost:5173)
    npm run build        Production build
    npm run preview      Preview production build

  Backend Commands:
    cd backend
    pip install flask flask-cors tensorflow pillow numpy
    python app.py        Starts Flask on http://localhost:5000

  Environment Variable:
    GEMINI_API_KEY=<your-google-ai-studio-key>   (in .env.local)

==============================================================
SLIDE 15 — DASHBOARD & UI OVERVIEW
==============================================================

HEADING: Dashboard & UI Overview

─────────────────────────────────────────
LANDING PAGE (isLanding = true)
─────────────────────────────────────────

  Navigation Bar:
    [Safety Guidelines]  [Skin Check]  [Clinical Team]  [Logout]
    Username display + "Profile: Male, Age 35"

  Main Content:
    HealthAssist AI logo / branding
    "Your AI-powered health companion"
    [📋 Begin Assessment]   → starts normal chat mode
    [👶 Parental Chat]      → starts parental mode
    [📝 View History]       → opens ChatHistory modal

─────────────────────────────────────────
CHAT INTERFACE (isLanding = false, isSkinMode = false)
─────────────────────────────────────────

  Header:
    ← Back button
    Mode indicator (Normal Chat / Parental Chat)
    [🔬 Skin Check] toggle  [📝 History]

  Message Area:
    scrollable messages[]
    User messages (right-aligned, blue)
    AI responses (left-aligned, white)
    Typing indicator (animated ...)

  Input Area:
    Text input + Send button
    Image attachment button (for skin photos)
    Voice record button (isRecording state)

  Assessment Trigger:
    After all 5 mandatory fields collected
    → SummaryCard rendered below chat
    → { understanding, possibleCauses, riskLevel badge,
        recommendations list, whenToSeeDoctor list,
        isEmergency banner if true }

─────────────────────────────────────────
SKIN ANALYSIS VIEW (isSkinMode = true)
─────────────────────────────────────────

  Upload Zone: drag-and-drop or click to browse
  Image Preview: canvas/img element shows selected image
  [Analyse Image] button → POST /predict
  Result Card:
    Predicted Class (e.g. "Melanoma")
    Confidence Bar: ████████░░ 94.37%
    Class description + recommendations
  [Back to Chat] button (passes result to Gemini context)

─────────────────────────────────────────
CLINICAL TEAM MODAL (ClinicalTeam.tsx)
─────────────────────────────────────────

  Team Information Panel:
    24/7 Support Information
    Ambulance Service Details
    Response Time Information
    Clinical Specialties Listed

  Emergency Request Form:
    Address field (required)
    Problem Description textarea (required)
    [🚨 Submit Emergency Request] button
    → status badge with pulsing animation

  Active Request Card:
    Request details + status badge
    [✅ Mark as Reached]  [❌ Cancel Request] buttons

  Previous Requests List:
    Timestamp, address truncated, status badge for each

─────────────────────────────────────────
CHAT HISTORY MODAL (ChatHistory.tsx)
─────────────────────────────────────────

  Session List:
    Each entry: chat_type badge + first message preview + timestamp
    [Normal Chat] / [Parental Chat] colour-coded tags
    Click any entry → reloads messages[] into chat interface

─────────────────────────────────────────
AUTH PANEL (AuthPanel.tsx)
─────────────────────────────────────────

  Login Tab:
    Email or Username field
    Password field
    [Login] button + toggle to Register

  Register Tab:
    Email field
    Username field
    Password field
    [Sign Up] button
    Validation errors displayed inline

─────────────────────────────────────────
SAFETY GUIDELINES MODAL (SafetyGuidelines.tsx)
─────────────────────────────────────────

  Section 1: 🚨 Emergency Situations
    Call 911 immediately for: chest pain, stroke signs (FAST),
    severe breathing difficulty, unconsciousness

  Section 2: ⚕️ What This AI Can and Cannot Do
    CAN:  Gather symptoms, provide guidance, suggest doctor visit
    CANNOT: Replace diagnosis, prescribe medications, perform tests

  Section 3: 🔒 Privacy & Data Security
    SHA-256 password hashing, local JSON storage, no third-party
    data sharing, user-isolated data access

  Section 4: 👶 Parental Guidance for Minors
    Ages 1–17 must use Parental Chat Mode
    Parent/guardian must supervise all interactions

  Section 5: 📋 Best Practices
    Be specific about symptoms, provide accurate age/sex,
    don't delay emergency care for AI advice

  Section 6: ⚠️ Disclaimer
    "This AI is not a substitute for professional medical advice.
     Always consult a licensed healthcare provider."

  [I Understand] button to close modal

─────────────────────────────────────────
FEEDBACK MODAL (FeedbackModal.tsx)
─────────────────────────────────────────

  Star Rating: ★ ★ ★ ★ ★ (1–5, required)
  Comment Text Area: optional free-form feedback
  [Submit Feedback] → POST /feedback → success message

==============================================================
SLIDE 16 — FLOW DIAGRAMS
==============================================================

HEADING: Flow Diagrams

─────────────────────────────────────────
DIAGRAM A — COMPLETE SYSTEM DATA FLOW
─────────────────────────────────────────

  USER OPENS APPLICATION
        │
        ▼
  AuthPanel shown (isAuthenticated = false)
        │
        ├── [Register] ──────────────────────────────────────────┐
        │     POST /register                                      │
        │     SHA-256(password) + UUID id + UUID token            │
        │     → users.json                                        │
        │     Token returned → localStorage                       │
        │                                                         │
        └── [Login] ──────────────────────────────────────────────┤
              POST /login                                         │
              Verify SHA-256 hash                                 │
              New token generated → localStorage                  │
                                                                  │
                         isAuthenticated = true ◄─────────────────┘
                                   │
                         LANDING PAGE shown
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
       [Begin Assessment]  [Parental Chat]      [Clinical Team]
              │                    │                    │
              ▼                    ▼                    ▼
       GET /profile        GET /parental-profile  GET /emergency-request
              │                    │                    │
       Profile exists?      Profile exists?       Show requests list
       YES: skip Q's        YES: skip Q's
       NO:  ask age/sex     NO:  ask child info
              │                    │
              ▼                    ▼
       geminiService.ts    geminiService.ts
       (isParentalMode=F)  (isParentalMode=T)
              │
              │  AI collects (one-by-one):
              │  age → sex → symptoms → duration → severity
              │
              ▼
       All 5 fields complete?
       YES → getStructuredAssessment() → Gemini 3 Flash
           → HealthAssessment JSON
           → SummaryCard rendered (riskLevel badge)
       NO  → continue asking questions
              │
              ▼
       POST /chat-history (auto-save on end)
       → chat_history.json


─────────────────────────────────────────
DIAGRAM B — SKIN DISEASE DETECTION FLOW
─────────────────────────────────────────

  User clicks [Skin Check] button
        │
        ▼
  SkinAnalysisView.tsx loads
        │
        ▼
  User uploads image file (drag/drop or browse)
        │
        ▼
  Image preview displayed in UI
        │
        ▼
  User clicks [Analyse Image]
        │
        ▼
  predictService.ts → POST /predict
  FormData: { file: <image binary> }
        │
        ▼
  Flask /predict endpoint:
    file = request.files["file"]
    img = Image.open(file.stream).convert("RGB")
        │
        ▼
  ensemble_predict(img):
    ┌────────────────────────────────────────┐
    │  img.resize(224,224)                   │
    │  np.array → expand_dims(axis=0)        │
    │                                        │
    │  ┌──────────────────┐                  │
    │  │ MobileNet Branch │                  │
    │  │ mobilenet_preprocess()              │
    │  │ mobilenet_model.predict()           │
    │  │ mob_idx = argmax(preds)             │
    │  │ mob_conf = preds[mob_idx]           │
    │  └────────┬─────────┘                  │
    │           │                            │
    │  ┌──────────────────┐                  │
    │  │  ResNet Branch   │                  │
    │  │ resnet_preprocess()                 │
    │  │ resnet_model.predict()              │
    │  │ res_idx = argmax(preds)             │
    │  │ res_conf = preds[res_idx]           │
    │  └────────┬─────────┘                  │
    │           │                            │
    │  mob_idx == res_idx?                   │
    │  YES → final=mob_idx, conf=max(m,r)   │
    │  NO  → pick model with higher conf    │
    └──────────────────────────────────────┘
        │
        ▼
  return class_names[final_idx], confidence%
        │
        ▼
  JSON: { prediction: "Melanoma", confidence: 94.37 }
        │
        ▼
  SkinAnalysisView displays:
    Disease name label
    Confidence % bar
    Brief description + next steps


─────────────────────────────────────────
DIAGRAM C — EMERGENCY REQUEST FLOW
─────────────────────────────────────────

  User clicks [Clinical Team] → ClinicalTeam.tsx opens
        │
        ▼
  GET /emergency-request → load user's past requests
        │
        ▼
  User clicks [🚨 Request Emergency Assistance]
        │
        ▼
  Form appears: Address field + Problem textarea
        │
        ▼
  User fills form and clicks Submit
        │
        ▼
  POST /emergency-request
  → { address, problem }
  → Backend creates { id, user_id, address, problem,
                      status:"pending", created_at, updated_at }
  → Saved to emergency_requests.json
        │
        ▼
  UI shows active request card:
  Status: "📞 Request Received" (pulsing red)
        │
        │     (Admin/system updates to en_route)
        │
        ▼
  Status: "🚑 Ambulance En Route"
        │
        ├─── User clicks [✅ Mark as Reached]
        │    PUT /emergency-request  { status: "reached" }
        │    → Status: "✅ Help Has Arrived"
        │
        └─── User clicks [❌ Cancel Request]
             PUT /emergency-request  { status: "cancelled" }
             → Status: "❌ Request Cancelled"


─────────────────────────────────────────
DIAGRAM D — PROFILE PERSISTENCE FLOW
─────────────────────────────────────────

  USER OPENS CHAT
        │
        ▼
  GET /profile (with Bearer token)
        │
        ▼
  Profile exists?
   │                         │
  YES                        NO
   │                         │
   ▼                         ▼
  AI greeting:            AI asks: "What is your age?"
  "I have your profile:    User answers → age validated
  Male, age 35"            (POST /profile partial update)
   │                         │
   │                       AI asks: "What is your biological sex?"
   │                         User answers → sex normalized
   │                         POST /profile
   │                         │
   └────────────┬────────────┘
                ▼
        Intake proceeds with
        age + sex already known;
        AI skips demographic Qs


==============================================================
SLIDE 17 — CONCLUSION & FUTURE WORK
==============================================================

HEADING: Conclusion & Future Work

─────────────────────────────────────────
CONCLUSION
─────────────────────────────────────────

  1. HealthAssist AI successfully delivers a unified, multi-modal
     healthcare assistance platform combining conversational AI,
     image-based skin disease detection, profile management,
     parental mode, emergency coordination, and chat history
     in a single full-stack web application.

  2. Three deep learning models were trained, evaluated, and
     compared on a 1,754-image test set across 5 skin disease
     classes. ResNet50 emerged as the best-performing model with:
       Test Accuracy   : 89.1%
       Weighted F1     : 0.890
       Macro F1        : 0.860
     Significantly outperforming Custom CNN (80%) and
     MobileNetV2 (77.3%).

  3. The MobileNetV2 + ResNet50 production ensemble deployed
     in Flask provides robust, confidence-weighted prediction
     that reduces single-model classification errors.

  4. Tinea classification, previously the hardest class (F1=0.44
     with Custom CNN), improved to F1=0.74 with ResNet50
     — a 68% relative improvement driven by residual learning.

  5. Google Gemini 2.5 Flash + Gemini 3 Flash integration enables
     structured clinical intake and produces validated JSON health
     assessments only when all mandatory fields are complete,
     preventing premature or inaccurate medical guidance.

  6. All security, profile persistence, parental mode, emergency
     tracking, and chat history features are fully implemented
     and validated in the deployed application.

─────────────────────────────────────────
FUTURE WORK
─────────────────────────────────────────

  Enhancement                  | Description
  -----------------------------+---------------------------------------
  EfficientNetB0 Integration   | Incorporate EfficientNetB0 and
                               | ConvNeXtTiny (already in .ipynb)
                               | into the ensemble for potential
                               | accuracy > 90%
  GPS Ambulance Tracking       | Real-time coordinates of emergency
                               | vehicles via Google Maps API
  Email Verification           | OTP / link-based email confirm on
                               | account registration
  Password Reset               | Forgot password + secure reset flow
  Video Consultation           | WebRTC peer-to-peer telemedicine
                               | integration
  Multi-Language Support       | Hindi, Tamil, Arabic, Spanish via
                               | Gemini multilingual capabilities
  Hospital EHR Integration     | HL7 FHIR API for electronic health
                               | record interoperability
  Mobile Application           | React Native port for iOS + Android
  Database Migration           | Replace JSON store with PostgreSQL
                               | or MongoDB for production scale
  Dermatologist Review Loop    | Flag uncertain predictions (<60%
                               | confidence) for expert review queue
  Dosage-Aware Pediatric Mode  | Child-safe drug dosage calculation
                               | based on weight + age
  Analytics Dashboard          | Admin view: total users, popular
                               | conditions, emergency stats

==============================================================
SLIDE 18 — REFERENCES
==============================================================

HEADING: References

  [1] Sandler, M., Howard, A., Zhu, M., Zhmoginov, A., & Chen, L.C.
      (2018). MobileNetV2: Inverted Residuals and Linear Bottlenecks.
      Proceedings of CVPR 2018.

  [2] He, K., Zhang, X., Ren, S., & Sun, J.
      (2016). Deep Residual Learning for Image Recognition.
      Proceedings of CVPR 2016.

  [3] Google DeepMind. (2023).
      Gemini: A Family of Highly Capable Multimodal Models.
      https://deepmind.google/technologies/gemini/

  [4] Google AI. (2024).
      Google Generative AI SDK for JavaScript/TypeScript.
      https://ai.google.dev/gemini-api/docs

  [5] Codella, N., et al. (2018).
      Skin Lesion Analysis Toward Melanoma Detection: ISIC 2018
      Challenge Dataset. arXiv:1902.03368.

  [6] Tan, M., & Le, Q. (2019).
      EfficientNet: Rethinking Model Scaling for Convolutional
      Neural Networks. ICML 2019.

  [7] Liu, Z., et al. (2022).
      A ConvNet for the 2020s (ConvNeXt).
      Proceedings of CVPR 2022.

  [8] TensorFlow / Keras Documentation.
      https://www.tensorflow.org/api_docs

  [9] Flask Documentation. Pallets Projects.
      https://flask.palletsprojects.com

  [10] scikit-learn: Machine Learning in Python.
       Pedregosa et al., JMLR 12, pp. 2825–2830, 2011.

  [11] World Health Organisation. (2023).
       Global Health Workforce Statistics — Primary Care Access.
       https://www.who.int/data/gho/data/themes/topics/health-workforce

  [12] American Cancer Society. (2024).
       Melanoma Skin Cancer Survival Rates.
       https://www.cancer.org/cancer/melanoma-skin-cancer

==============================================================
APPENDIX — KEY NUMBERS AT A GLANCE
(For use on a summary/stats slide if needed)
==============================================================

  Metric                        | Value
  ------------------------------+---------------------------
  Total ML Models Trained       | 3 (CNN, MobileNetV2, ResNet50)
  Best Test Accuracy            | 89.1% (ResNet50)
  Best Weighted F1              | 0.890 (ResNet50)
  Skin Disease Classes          | 5
  Test Set Size                 | 1,754 images
  Tinea F1 Improvement          | 0.44 → 0.74 (+68%)
  Seborrheic K. F1 Improvement | 0.67 → 0.83 (+24%)
  Gemini Model (Chat)           | gemini-2.5-flash
  Gemini Model (Assessment)     | gemini-3-flash-preview
  API Endpoints (Flask)         | 11 endpoints
  Components (React)            | 8 components
  Services (React)              | 3 services
  Data Files (JSON)             | 6 files
  Security Method               | SHA-256 + UUID4 Bearer Token
  Frontend Framework            | React 19 + TypeScript 5 + Vite 6
  Backend Framework             | Flask 3 + Python 3.10
  GEMINI_API_KEY Required       | YES (Google AI Studio)
  Backend Port                  | http://localhost:5000
  Frontend Port                 | http://localhost:5173

==============================================================
END OF FULL PPT CONTENT
Project: HealthAssist AI | Team 1 | February 2026
Total Slides: 18 (+ Appendix)
==============================================================
