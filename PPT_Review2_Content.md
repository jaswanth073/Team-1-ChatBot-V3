# PROJECT REVIEW – 2 | FULL PPT CONTENT
### HealthAssist AI — AI-Powered Medical Chatbot with Skin Disease Detection

---

---

## SLIDE 1 — TITLE SLIDE

**Project Title:**
# HealthAssist AI
## An AI-Powered Medical Chatbot with Intelligent Skin Disease Detection

| Field | Details |
|-------|---------|
| Department | Artificial Intelligence & Machine Learning |
| Project Type | Final Year Project – Review 2 |
| Presentation Date | February 2026 |

---

---

## SLIDE 2 — INTRODUCTION

**HealthAssist AI** is an intelligent, multi-modal healthcare assistance platform that combines:

- 🤖 **Conversational AI** (Google Gemini 2.5 Flash) for structured medical intake
- 🔬 **Computer Vision** (Custom CNN, MobileNetV2, ResNet50) for skin disease classification
- 🏥 **Emergency Management** system for real-time clinical request tracking
- 👨‍👩‍👧 **Parental Mode** for pediatric consultation
- 🔐 **Secure Authentication** with profile persistence

> The system acts as a **digital medical intake specialist** — gathering patient history, analyzing skin conditions from images, generating structured health assessments, and routing emergencies to clinical teams.

**Key Technologies at a Glance:**

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite |
| Backend | Python, Flask |
| AI / NLP | Google Gemini 2.5 Flash, Gemini 3 Flash |
| ML / CV | TensorFlow, Keras, Custom CNN, MobileNetV2, ResNet50 |
| Storage | JSON-based file store |

---

---

## SLIDE 3 — MOTIVATION

### Why HealthAssist AI?

1. **Healthcare Access Gap**
   - Millions lack immediate access to primary healthcare, especially in rural and semi-urban areas.
   - Patients wait hours (or days) before seeing a doctor for non-emergency symptoms.

2. **Skin Disease Burden**
   - Skin conditions (eczema, BCC, melanoma, tinea) affect **~900 million people globally**.
   - Early detection of melanoma increases 5-year survival rate from **~18% to over 98%**.

3. **AI as a First Responder**
   - 72% of patients search symptoms online before consulting a doctor — with misleading results.
   - A structured, AI-driven intake system can reduce misdiagnosis risk and triage patients more effectively.

4. **Pediatric Safety**
   - Children are a medically vulnerable group requiring specialized guidance.
   - A dedicated parental chat mode ensures age-appropriate medical advice.

5. **Emergency Response Delays**
   - Digital emergency request tracking reduces response time by enabling direct ambulance coordination.

> **Motivation Summary:** Bridge the gap between patients and medical professionals using accessible, AI-powered, multi-modal assistive technology.

---

---

## SLIDE 4 — PROBLEM STATEMENT

### Problem Statement

> *"Patients in need of basic medical guidance are either forced to wait for hospital appointments, rely on unverified internet sources, or forgo consultation entirely — while potentially treatable conditions worsen due to delayed or inaccurate assessment."*

**Specific Problems Identified:**

| # | Problem | Impact |
|---|---------|--------|
| 1 | No structured symptom collection by generic chatbots | Incomplete or inaccurate assessments |
| 2 | No skin disease detection in existing chatbots | Visual symptoms ignored entirely |
| 3 | No pediatric-specific healthcare mode | Children receive incorrect adult dosage/advice |
| 4 | No emergency escalation path within digital tools | Patients have no digital emergency channel |
| 5 | No persistent patient profile across sessions | Repeated data entry, frustration |
| 6 | Low accuracy of single CNN models for skin analysis | Misclassification of critical conditions |

---

---

## SLIDE 5 — OBJECTIVES

### Project Objectives

1. **Build a structured medical intake chatbot** that systematically collects patient demographics, symptoms, duration, and severity before generating a health assessment.

2. **Develop a multi-model skin disease classifier** using Custom CNN, MobileNetV2, and ResNet50 ensemble to detect 5 skin conditions with high accuracy.

3. **Integrate Google Gemini AI** for natural conversational medical intake and structured JSON health assessments.

4. **Implement secure user authentication** with SHA-256 password hashing and token-based session management.

5. **Enable real-time emergency request tracking** with ambulance dispatch coordination and status updates.

6. **Create a Parental Chat Mode** with child-specific profiles for pediatric guidance.

7. **Persist user and parental profiles** to eliminate repeated data collection.

8. **Compare CNN model architectures** (Custom CNN, MobileNetV2, ResNet50) and evaluate using Precision, Recall, F1-Score, and Accuracy metrics.

---

---

## SLIDE 6 — SCOPE OF THE PROJECT

### Scope

**IN SCOPE:**

| Area | Description |
|------|-------------|
| Skin Disease Detection | BCC, Eczema, Melanoma, Seborrheic Keratosis, Tinea |
| Medical Chat | Symptom intake, health assessment, risk classification |
| User Management | Registration, login, profile persistence |
| Parental Mode | Child profile, pediatric-focused AI responses |
| Emergency System | Request creation, tracking, status management |
| Safety Features | Guidelines page, emergency escalation, AI disclaimers |
| Dashboard | Chat history, skin analysis view, summary cards |

**OUT OF SCOPE:**

- Real-time telemedicine / video consultation
- Integration with hospital EHR systems
- Live prescription generation
- GPS ambulance tracking
- Multi-language support (planned future work)

**Target Users:**
- General public seeking initial medical guidance
- Parents/guardians of minor patients
- Individuals with visible skin conditions needing early screening

---

---

## SLIDE 7 — EXISTING SYSTEM

### Existing Systems in the Market

| System | Type | Capability |
|--------|------|-----------|
| Ada Health | Symptom Checker | Text-based symptom questions |
| WebMD Chatbot | FAQ Bot | Static disease information |
| Babylon Health | AI Chatbot | Symptom triage, no image support |
| SkinVision | Skin App | Skin cancer detection only |
| Google Dermatology AI | Research Tool | Image-based diagnosis, not public API |
| ChatGPT (Generic) | LLM Chatbot | General answers, no structured intake |

**Common Characteristics of Existing Systems:**
- Most systems handle either text OR image — not both together
- No unified platform combining skin analysis + conversational intake + emergency management
- Minimal personalization (age, sex, pediatric mode)
- No emergency escalation with real-time tracking

---

---

## SLIDE 8 — LIMITATIONS OF EXISTING SYSTEM

### Limitations of Existing Systems

1. **No Multi-Modal Support**
   — Existing chatbots do not combine image-based skin analysis with conversational symptom intake in one interface.

2. **Lack of Structured Medical Intake**
   — Generic AI assistants (ChatGPT, etc.) generate unverified health information without systematically collecting mandatory clinical data points (age, sex, symptoms, duration, severity).

3. **No Pediatric Mode**
   — Adult-generic advice is dangerous for minors. No existing consumer chatbot includes a dedicated parental mode with child-specific profile storage.

4. **No Emergency Path**
   — Digital health tools do not provide integrated emergency request submission with ambulance dispatch tracking.

5. **No Patient Profile Persistence**
   — Users must re-enter demographics (age, sex) at every session — increasing dropout and frustration.

6. **Single Model Bias in Skin Detection**
   — Apps like SkinVision rely on a single model, which is susceptible to class imbalance and lower accuracy on minority categories (Tinea, Seborrheic Keratosis).

7. **No Privacy Architecture**
   — Many free chatbots store raw plaintext credentials or have no authentication at all.

---

---

## SLIDE 9 — PROPOSED SYSTEM

### Proposed System — HealthAssist AI

**HealthAssist AI** is a full-stack medical assistant platform featuring:

### Architecture Overview (Text)

```
┌──────────────────────────────────────────────────────────────────┐
│                  REACT FRONTEND (TypeScript)                     │
│     AuthPanel │ ChatInterface │ SkinAnalysisView │ Dashboard     │
└────────────────────────┬─────────────────────────────────────────┘
                         │  HTTP + Token Auth
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                  FLASK BACKEND (Python)                          │
│   /register  /login  /profile  /chat-history  /emergency-request │
│   /predict (ML Ensemble)  /feedback  /parental-profile           │
└──────┬─────────────────────────────────────────────┬────────────┘
       │                                             │
       ▼                                             ▼
┌──────────────────┐                    ┌────────────────────────┐
│  JSON Data Store │                    │   ML Model Layer       │
│  users.json      │                    │  Custom CNN (.keras)   │
│  user_profiles   │                    │  MobileNetV2 (.h5)     │
│  chat_history    │                    │  ResNet50 (.h5)        │
│  emergency_reqs  │                    │  Ensemble Prediction   │
│  parental_profs  │                    └────────────────────────┘
└──────────────────┘
                         │
                         ▼
              ┌─────────────────────────┐
              │  Google Gemini AI API   │
              │  gemini-2.5-flash       │
              │  (Conversational Intake)│
              │  gemini-3-flash         │
              │  (Structured Assessment)│
              └─────────────────────────┘
```

### Key Proposed Features:

| Feature | Description |
|---------|-------------|
| Structured Medical Intake | AI collects age, sex, symptoms, duration, severity — one-at-a-time |
| Skin Disease Detection | Ensemble of MobileNetV2 + ResNet50 with confidence scoring |
| Emergency Request System | Submit, track, and update ambulance dispatch status |
| Parental Chat Mode | Child profile storage + pediatric-focused AI prompting |
| Profile Persistence | No repeated demographic entry across sessions |
| Secure Auth | SHA-256 hashing + token-based API protection |
| Chat History | Full conversation archival and retrieval |
| Health Assessment Card | Structured JSON summary with risk level classification |

---

---

## SLIDE 10 — ADVANTAGES OF PROPOSED SYSTEM

### Advantages of HealthAssist AI

| Advantage | Description |
|-----------|-------------|
| ✅ Multi-Modal | Combines text + image input in a single healthcare platform |
| ✅ Structured AI Intake | Enforces mandatory clinical data collection before assessment |
| ✅ Ensemble Accuracy | MobileNetV2 + ResNet50 ensemble reduces single-model error |
| ✅ Pediatric Safety | Dedicated parental mode with child profile and age-restricted access |
| ✅ Emergency Channel | Real-time ambulance coordination with status tracking (pending → en route → reached) |
| ✅ Profile Persistence | One-time demographic entry, reused across all sessions |
| ✅ Secure Authentication | SHA-256 password hashing + UUID token sessions |
| ✅ Chat Archive | Full conversation history with reload capability |
| ✅ Risk Classification | LOW / MODERATE / HIGH risk auto-classification per assessment |
| ✅ Open & Extendable | React + Flask stack, easy to extend with new ML models or APIs |

---

---

## SLIDE 11 — SYSTEM ARCHITECTURE

### Full System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                FRONTEND  (React + TypeScript + Vite)        │
├──────────────┬──────────────────┬──────────────────────────-┤
│  App.tsx     │   Components     │       Services            │
│              │                  │                           │
│ Auth State   │ AuthPanel.tsx    │  geminiService.ts         │
│ Chat State   │ ChatHistory.tsx  │  → Gemini 2.5 Flash       │
│ Profile      │ ClinicalTeam.tsx │  → Gemini 3 Flash         │
│ Skin Mode    │ FeedbackModal    │                           │
│ Parental Mode│ SafetyGuidelines │  predictService.ts        │
│ UI Modals    │ SkinAnalysisView │  → POST /predict          │
│              │ SummaryCard.tsx  │                           │
│              │ Icons.tsx        │  apiService.ts            │
│              │                  │  → All backend calls      │
└──────────────┴──────────────────┴────────────┬──────────────┘
                                               │  HTTP + JWT Token
                                               ▼
┌─────────────────────────────────────────────────────────────┐
│                BACKEND  (Python + Flask)                    │
├────────────────────────────────────────────────────────────-┤
│  Auth:    POST /register  │  POST /login                    │
│  Profile: GET /profile    │  POST /profile                  │
│  Parent:  GET/POST /parental-profile                        │
│  History: GET/POST /chat-history                            │
│  Emergency: GET/POST/PUT /emergency-request                 │
│  ML:      POST /predict                                     │
│  Feedback: POST /feedback                                   │
├──────────────────────────┬──────────────────────────────────┤
│  JSON Data Store         │  ML Model Layer                  │
│  users.json              │  custom_cnn_skin_model.keras     │
│  user_profiles.json      │  mobilenet_model.weights.h5      │
│  parental_profiles.json  │  resnet_model.weights.h5         │
│  chat_history.json       │  Ensemble Predict Logic          │
│  emergency_requests.json │  (Majority + Confidence Vote)    │
│  feedback.json           │                                  │
└──────────────────────────┴──────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────┐
│          External AI Service — Google Gemini API            │
│  Gemini 2.5 Flash  →  Conversational Medical Intake         │
│  Gemini 3 Flash    →  Structured JSON Assessment Output     │
└─────────────────────────────────────────────────────────────┘
```

### Security Layers

```
Layer 1 (Frontend): Token in localStorage, client-side validation, HTTPS
Layer 2 (Transport): Authorization Bearer Token header, CORS config
Layer 3 (Backend):  Token verification, SHA-256 password hashing, input validation
Layer 4 (Data):     User-isolated data, no plaintext credentials stored
```

---

---

## SLIDE 12 — MODULE DESCRIPTION

### Module 1: Authentication Module

**File:** `backend/app.py` | `components/AuthPanel.tsx` | `services/apiService.ts`

**Flow:**
```
User Enters Credentials
        │
        ▼
Frontend Validation
        │
        ▼
POST /register or POST /login
        │
        ▼
SHA-256 Hash Password  →  Store in users.json
        │
        ▼
Generate UUID Token  →  Return to Frontend
        │
        ▼
Store Token in localStorage  →  Include in All API Calls
```

**Key Functions:**
- `hash_password()` — SHA-256 encryption
- `generate_token()` — UUID4 session token
- Register: validates unique email & username, stores hashed password
- Login: supports both email and username login

---

### Module 2: Skin Disease Detection Module

**Files:** `backend/app.py` (ML section) | `components/SkinAnalysisView.tsx` | `services/predictService.ts`

**Flow:**
```
User Uploads Skin Image
        │
        ▼
Frontend Preview (SkinAnalysisView)
        │
        ▼
POST /predict (multipart/form-data)
        │
        ▼
PIL Image → RGB → Resize to 224×224
        │
        ▼
  ┌─────────────────────────────┐
  │     Ensemble Prediction     │
  │                             │
  │  MobileNetV2 preprocess     │
  │  → mobilenet_preprocess()   │
  │  → model.predict()          │
  │  → mob_idx, mob_conf        │
  │                             │
  │  ResNet50 preprocess         │
  │  → resnet_preprocess()      │
  │  → model.predict()          │
  │  → res_idx, res_conf        │
  │                             │
  │  Decision Logic:            │
  │  if mob_idx == res_idx:     │
  │    final = mob_idx          │
  │  else:                      │
  │    final = higher conf      │
  └─────────────────────────────┘
        │
        ▼
Return { prediction, confidence% } → Display in UI
```

**Classes Detected:**
| Label | Class |
|-------|-------|
| BCC | Basal Cell Carcinoma |
| Eczema | Atopic Dermatitis |
| Melanoma | Malignant Melanoma |
| Seborrheic_Keratosis | Benign skin growth |
| Tinea | Fungal infection |

---

### Module 3: Conversational Medical Intake (Gemini AI)

**Files:** `services/geminiService.ts` | `App.tsx`

**Flow:**
```
User Opens Chat
      │
      ▼
System Prompt Loaded
(HealthAssist AI — Senior Medical Intake Specialist)
      │
      ▼
AI Collects (One-at-a-time):
  → Age (if not in profile)
  → Biological Sex (if not in profile)
  → Primary Symptoms
  → Duration
  → Severity (1–10 / Mild / Moderate / Severe)
      │
      ▼
After All Data Collected:
  → Gemini 3 Flash generates structured JSON assessment
      │
      ▼
HealthAssessment Object:
  { understanding, possibleCauses[], riskLevel,
    recommendations[], whenToSeeDoctor[], isEmergency }
      │
      ▼
SummaryCard.tsx renders assessment
```

**Models Used:**
- `gemini-2.5-flash` → Conversational intake (temperature: 0.5)
- `gemini-3-flash` → Structured JSON output for assessment

---

### Module 4: Profile Management Module

**Files:** `backend/app.py` | `services/apiService.ts`

```
First Visit:
  User answers age + biological sex
  → POST /profile → saved to user_profiles.json

Returning Visit:
  GET /profile → profile exists
  → AI greets: "I have your profile: Male, age 35"
  → Skips demographic questions

Parental Mode:
  GET/POST /parental-profile
  → child_age, child_biological_sex, child_relation
  → Stored in parental_profiles.json
```

**Validation Rules:**
- Age must be numeric, 0–100
- Ages 1–17 → redirected to Parental Chat Mode
- Biological sex normalized to "Male" / "Female"

---

### Module 5: Emergency Request Module

**Files:** `components/ClinicalTeam.tsx` | `backend/app.py`

**Flow:**
```
User Clicks "Clinical Team"
        │
        ▼
ClinicalTeam Modal Opens
        │
        ▼
"Request Emergency Assistance"
        │
        ▼
User Fills: Address + Problem Description
        │
        ▼
POST /emergency-request → saved to emergency_requests.json
        │
        ▼
Status: pending
        │
   ┌────┴────┐
   ▼         ▼
PUT /        PUT /
status:    status:
reached    cancelled
```

**Status Flow:**
`pending` → `en_route` → `reached` | `cancelled`

---

### Module 6: Chat History Module

**Files:** `components/ChatHistory.tsx` | `backend/app.py`

- All conversations auto-saved via `POST /chat-history`
- Stores: messages[], chat_type (normal/parental), timestamp
- Users can click any history entry to reload the conversation
- Organized per user_id in `chat_history.json`

---

### Module 7: Safety Guidelines Module

**File:** `components/SafetyGuidelines.tsx`

Sections:
1. Emergency Situations (call 911)
2. AI Capabilities & Limitations
3. Privacy & Data Security
4. Parental Guidance for Minors
5. Best Practices for Use
6. Legal Medical Disclaimer

---

---

## SLIDE 13 — METHODOLOGY

### Phase 1: Data Collection & Preparation

**Dataset:** Skin disease image dataset with 5 classes
```
DATA/
  train/   → BCC, Eczema, Melanoma, Seborrheic_Keratosis, Tinea
  val/     → Validation split
  test/    → 1,754 test images used for evaluation
```

**Preprocessing:**
- All images resized to **224 × 224 × 3** (RGB)
- MobileNetV2: `mobilenet_v2.preprocess_input()` — scales [-1, 1]
- ResNet50: `resnet50.preprocess_input()` — channel-wise mean subtraction

---

### Phase 2: Model Architecture Design

#### A. Custom CNN
```
Input (224×224×3)
  → Conv2D layers × N
  → MaxPooling2D
  → BatchNormalization
  → Dense(128, relu)
  → Dropout(0.5)
  → Dense(5, softmax)
```

#### B. MobileNetV2 (Transfer Learning)
```
MobileNetV2 Base (weights=None, fine-tuned)
  → GlobalAveragePooling2D
  → BatchNormalization
  → Dense(128, relu)
  → Dropout(0.5)
  → Dense(5, softmax)
```

#### C. ResNet50 (Transfer Learning)
```
ResNet50 Base (weights=None, fine-tuned)
  → GlobalAveragePooling2D
  → BatchNormalization
  → Dense(256, relu)   ← Deeper than MobileNet
  → Dropout(0.5)
  → Dense(5, softmax)
```

---

### Phase 3: Training

| Parameter | Value |
|-----------|-------|
| Input Size | 224 × 224 × 3 |
| Num Classes | 5 |
| Optimizer | Adam |
| Loss | Categorical Crossentropy |
| Dropout | 0.5 |
| Batch Normalization | Yes (post-pooling) |

---

### Phase 4: Evaluation & Results

#### Model Performance Comparison

| Model | Test Accuracy | Weighted F1 | Macro F1 |
|-------|-------------|-------------|----------|
| Custom CNN | 80.0% | 0.7900 | 0.7350 |
| MobileNetV2 | 77.3% | 0.7672 | 0.7200 |
| ResNet50 | **89.1%** | **0.8903** | **0.8600** |

---

#### Custom CNN — Classification Report

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| BCC | 0.98 | 0.96 | 0.97 | 499 |
| Eczema | 0.64 | 0.62 | 0.63 | 252 |
| Melanoma | 0.95 | 0.97 | 0.96 | 471 |
| Seborrheic_Keratosis | 0.63 | 0.71 | 0.67 | 277 |
| Tinea | 0.47 | 0.42 | 0.44 | 255 |
| **Accuracy** | | | **0.80** | 1754 |
| Macro Avg | 0.73 | 0.74 | 0.74 | 1754 |
| Weighted Avg | 0.79 | 0.80 | 0.79 | 1754 |

---

#### MobileNetV2 — Classification Report

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| BCC (0) | 0.93 | 0.91 | 0.92 | 499 |
| Eczema (1) | 0.57 | 0.70 | 0.63 | 252 |
| Melanoma (2) | 0.90 | 0.93 | 0.91 | 471 |
| Seborrheic_Keratosis (3) | 0.62 | 0.71 | 0.66 | 277 |
| Tinea (4) | 0.61 | 0.36 | 0.45 | 255 |
| **Accuracy** | | | **0.77** | 1754 |
| Macro Avg | 0.73 | 0.72 | 0.72 | 1754 |
| Weighted Avg | 0.77 | 0.77 | 0.77 | 1754 |

---

#### ResNet50 — Classification Report ✅ Best Model

| Class | Precision | Recall | F1-Score | Support |
|-------|-----------|--------|----------|---------|
| BCC (0) | 0.98 | 0.99 | 0.98 | 499 |
| Eczema (1) | 0.77 | 0.75 | 0.76 | 252 |
| Melanoma (2) | 0.99 | 0.97 | 0.98 | 471 |
| Seborrheic_Keratosis (3) | 0.81 | 0.84 | 0.83 | 277 |
| Tinea (4) | 0.75 | 0.73 | 0.74 | 255 |
| **Accuracy** | | | **0.89** | 1754 |
| Macro Avg | 0.86 | 0.86 | 0.86 | 1754 |
| Weighted Avg | 0.89 | 0.89 | 0.89 | 1754 |

---

#### Bar Graph — F1-Score Comparison (use in PPT as chart)

```
F1-Score Comparison (Weighted)
BCC:                   CNN=0.97 | MobileNet=0.92 | ResNet=0.98
Eczema:                CNN=0.63 | MobileNet=0.63 | ResNet=0.76
Melanoma:              CNN=0.96 | MobileNet=0.91 | ResNet=0.98
Seborrheic_Keratosis:  CNN=0.67 | MobileNet=0.66 | ResNet=0.83
Tinea:                 CNN=0.44 | MobileNet=0.45 | ResNet=0.74
                       ─────────────────────────────────────────
Overall Accuracy:      80%       77.3%            89.1%
```

---

### Phase 5: Ensemble Deployment

```
Image Input
     │
     ├──────────────────┐
     ▼                  ▼
MobileNetV2         ResNet50
preprocess()        preprocess()
     │                  │
predict()          predict()
mob_idx, mob_conf  res_idx, res_conf
     │                  │
     └────────┬──────────┘
              ▼
    Both Agree?
     YES → Use that class (max confidence)
     NO  → Use class with higher confidence
              │
              ▼
    { prediction, confidence% }
              │
              ▼
    Flask JSON Response → UI Display
```

---

### Phase 6: System Integration

```
ML Models ────────────────┐
(Custom CNN / ResNet50 /   │
 MobileNetV2)              │
                           ▼
              Flask Backend (app.py)
              /predict endpoint
                           │
                           ▼
              React Frontend
              SkinAnalysisView.tsx
              predictService.ts
                           │
                           ▼
              Gemini AI Integration
              geminiService.ts
              (Combine image result + symptom chat)
                           │
                           ▼
              SummaryCard Assessment
              { riskLevel, recommendations,
                possibleCauses, whenToSeeDoctor }
```

---

---

## SLIDE 14 — TECH STACK (DETAILED)

### Frontend Tech Stack

| Technology | Version / Detail | Role |
|-----------|-----------------|------|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type-safe JavaScript |
| Vite | 5.x | Build tool & dev server |
| Google GenAI SDK | `@google/genai` | Gemini API client |
| CSS / Tailwind-style | Inline + className | Styling |

### Backend Tech Stack

| Technology | Version / Detail | Role |
|-----------|-----------------|------|
| Python | 3.10+ | Backend language |
| Flask | 3.x | REST API framework |
| Flask-CORS | 4.x | Cross-origin requests |
| TensorFlow | 2.15+ | Deep learning framework |
| Keras | Built-in (tf.keras) | Model building & loading |
| MobileNetV2 | `tf.keras.applications` | Transfer learning base |
| ResNet50 | `tf.keras.applications` | Transfer learning base |
| NumPy | 1.26+ | Array & math operations |
| Pillow (PIL) | 10.x | Image processing |
| hashlib + uuid | stdlib | Password hashing + tokens |

### AI / ML Stack

| Component | Model | Purpose |
|-----------|-------|---------|
| Conversational AI | Google Gemini 2.5 Flash | Medical symptom intake |
| Structured Assessment | Google Gemini 3 Flash | JSON health assessment output |
| Skin Classification | Custom CNN | Baseline classifier |
| Skin Classification | MobileNetV2 (fine-tuned) | Lightweight classification |
| Skin Classification | ResNet50 (fine-tuned) | High-accuracy classification |
| Ensemble | MobileNetV2 + ResNet50 | Production prediction logic |

### Data Storage

| File | Content |
|------|---------|
| `users.json` | User accounts, SHA-256 passwords, tokens |
| `user_profiles.json` | Age, biological sex per user |
| `parental_profiles.json` | Child age, sex, relation |
| `chat_history.json` | Full conversation per session |
| `emergency_requests.json` | Emergency request records with status |
| `feedback.json` | User feedback submissions |

---

---

## SLIDE 15 — DASHBOARD & UI OVERVIEW

### Application Dashboard Modules

```
┌──────────────────────────────────────────────────────────────────┐
│                       LANDING PAGE                               │
│                                                                  │
│  [Safety Guidelines]  [Skin Check]  [Clinical Team]  [Logout]   │
│                                                                  │
│              ┌─────────────────────────────────┐                │
│              │   Welcome, [Username]!           │                │
│              │   Profile: Male, Age 35          │                │
│              │                                  │                │
│              │   [Begin Assessment]             │                │
│              │   [Parental Chat]                │                │
│              │   [View History]                 │                │
│              └─────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────────┐
          ▼              ▼                  ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
  │  Chat Mode   │  │  Skin Mode   │  │  Emergency Mode  │
  ├──────────────┤  ├──────────────┤  ├──────────────────┤
  │ AI Intake    │  │ Upload Image │  │ Team Info        │
  │ History      │  │ Prediction   │  │ Request Form     │
  │ Summary Card │  │ Confidence % │  │ Status Tracker   │
  └──────────────┘  └──────────────┘  └──────────────────┘
```

### Key UI Components

| Component | Function |
|-----------|----------|
| `AuthPanel.tsx` | Login / Register modal with validation |
| `SkinAnalysisView.tsx` | Image upload, preview, prediction result |
| `SummaryCard.tsx` | Structured health assessment with risk badge |
| `ChatHistory.tsx` | Past conversation list + reload |
| `ClinicalTeam.tsx` | Emergency form + status tracker |
| `SafetyGuidelines.tsx` | Medical disclaimer + guidelines modal |
| `FeedbackModal.tsx` | User satisfaction feedback |

---

---

## SLIDE 16 — FLOW DIAGRAMS

### A. Complete System Data Flow

```
USER
 │
 ├──[Register/Login]──► AuthPanel ──► POST /register, /login
 │                                         │
 │                                    users.json
 │
 ├──[Chat]──────────────► App.tsx ──► GET /profile
 │                           │              │
 │                           │        user_profiles.json
 │                           │
 │                     geminiService ──► Gemini 2.5 Flash
 │                           │                │
 │                     Collect: age, sex,  Conversational
 │                     symptoms, duration,  AI Response
 │                     severity
 │                           │
 │                     getStructuredAssessment()
 │                           │
 │                     Gemini 3 Flash ──► JSON Assessment
 │                           │
 │                     SummaryCard ──► Risk: LOW/MOD/HIGH
 │                           │
 │                     POST /chat-history ──► chat_history.json
 │
 ├──[Skin Image]─────► SkinAnalysisView ──► POST /predict
 │                                                │
 │                                     ensemble_predict()
 │                                     MobileNetV2 + ResNet50
 │                                                │
 │                                     { prediction, confidence }
 │
 ├──[Emergency]──────► ClinicalTeam ──► POST /emergency-request
 │                                               │
 │                                  emergency_requests.json
 │                                               │
 │                                  Status: pending → en_route
 │                                          → reached/cancelled
 │
 └──[History]────────► ChatHistory ──► GET /chat-history
                                               │
                                        chat_history.json
```

---

### B. ML Prediction Flow

```
             Skin Image Upload
                    │
                    ▼
           PIL.Image.open()
           .convert("RGB")
                    │
                    ▼
           img.resize(224, 224)
                    │
                    ▼
        np.array() → expand_dims()
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
  mobilenet_preprocess()  resnet_preprocess()
  (scale to [-1, 1])      (channel mean subtract)
         │                     │
   mobilenet_model         resnet_model
   .predict()              .predict()
         │                     │
   mob_preds[5]          res_preds[5]
   mob_idx, mob_conf     res_idx, res_conf
         │                     │
         └──────────┬──────────┘
                    ▼
          mob_idx == res_idx?
           ┌────────┴────────┐
          YES               NO
           │                 │
     Use mob_idx      Compare confidence
     max(mob,res)     Use higher confidence
     confidence       model's prediction
           │                 │
           └────────┬────────┘
                    ▼
       class_names[final_idx]
       round(final_conf * 100, 2)
                    │
                    ▼
      JSON: { prediction, confidence% }
```

---

---

## SLIDE 17 — CONCLUSION & FUTURE WORK

### Conclusion

- HealthAssist AI successfully integrates **conversational AI, computer vision, and emergency management** into a unified healthcare assistance platform.
- **ResNet50** achieved the best performance with **89.1% test accuracy** and **0.89 weighted F1-score**, significantly outperforming Custom CNN (80%) and MobileNetV2 (77.3%).
- The **MobileNetV2 + ResNet50 ensemble** in production leverages the strengths of both models for more robust skin disease prediction.
- All 5 skin disease classes (BCC, Eczema, Melanoma, Seborrheic Keratosis, Tinea) are detected with clinically meaningful confidence.
- The system successfully implements **secure authentication, profile persistence, parental mode, and emergency request tracking** as a complete healthcare assistant.

### Future Work

| Enhancement | Description |
|-------------|-------------|
| EfficientNetB0 Integration | Add EfficientNetB0 (.ipynb trained) to ensemble for potential accuracy > 90% |
| GPS Ambulance Tracking | Real-time location of emergency vehicles |
| Email Verification | Enhanced account security |
| Video Consultation | WebRTC-based telemedicine integration |
| Multi-Language | Hindi, Tamil, Arabic support |
| Hospital EHR API | Connect with electronic health records |
| Mobile App | React Native port for iOS/Android |
| Dermatologist Review Loop | Flag high-confidence predictions for expert validation |

---

---

## SLIDE 18 — REFERENCES

1. Sandler, M. et al. (2018). *MobileNetV2: Inverted Residuals and Linear Bottlenecks.* CVPR 2018.
2. He, K. et al. (2016). *Deep Residual Learning for Image Recognition.* CVPR 2016.
3. Google DeepMind. (2023). *Gemini: A Family of Highly Capable Multimodal Models.*
4. Codella, N. et al. (2018). *Skin Lesion Analysis Toward Melanoma Detection.* ISIC Challenge.
5. Tan, M. & Le, Q. (2019). *EfficientNet: Rethinking Model Scaling for CNNs.* ICML 2019.
6. TensorFlow / Keras Documentation — https://www.tensorflow.org
7. Flask Documentation — https://flask.palletsprojects.com
8. Google Generative AI SDK — https://ai.google.dev

---

*End of PPT Review-2 Content*
*Project: HealthAssist AI | Team 1 | February 2026*
