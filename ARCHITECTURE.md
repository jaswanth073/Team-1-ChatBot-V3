# System Architecture Overview

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + TypeScript)            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  App.tsx     │  │ Components   │  │  Services    │      │
│  │              │  │              │  │              │      │
│  │ - Auth State │  │ AuthPanel    │  │ geminiService│      │
│  │ - Chat State │  │ SafetyGuide  │  │ predictServ. │      │
│  │ - Profile    │  │ ClinicalTeam │  │ apiService   │      │
│  │ - Modals     │  │ ChatHistory  │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP Requests
                            │ (Token Authentication)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Flask + Python)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │              API Endpoints (app.py)                │     │
│  ├────────────────────────────────────────────────────┤     │
│  │                                                     │     │
│  │  Authentication:                                   │     │
│  │  • POST /register    - Create account             │     │
│  │  • POST /login       - Authenticate user           │     │
│  │                                                     │     │
│  │  User Profile:                                     │     │
│  │  • GET  /profile     - Fetch user profile         │     │
│  │  • POST /profile     - Update age & bio sex       │     │
│  │                                                     │     │
│  │  Parental Profile:                                 │     │
│  │  • GET  /parental-profile  - Get child info       │     │
│  │  • POST /parental-profile  - Update child info    │     │
│  │                                                     │     │
│  │  Chat History:                                     │     │
│  │  • GET  /chat-history      - Get conversations    │     │
│  │  • POST /chat-history      - Save conversation    │     │
│  │                                                     │     │
│  │  Emergency:                                        │     │
│  │  • GET  /emergency-request - Get all requests     │     │
│  │  • POST /emergency-request - Create request       │     │
│  │  • PUT  /emergency-request - Update status        │     │
│  │                                                     │     │
│  │  ML Prediction:                                    │     │
│  │  • POST /predict           - Skin disease detect. │     │
│  └────────────────────────────────────────────────────┘     │
│                            │                                  │
│                            ▼                                  │
│  ┌────────────────────────────────────────────────────┐     │
│  │         Data Storage (JSON Files in data/)         │     │
│  ├────────────────────────────────────────────────────┤     │
│  │                                                     │     │
│  │  • users.json              - User accounts         │     │
│  │  • user_profiles.json      - Age & biological sex  │     │
│  │  • parental_profiles.json  - Children's data       │     │
│  │  • chat_history.json       - All conversations     │     │
│  │  • emergency_requests.json - Emergency requests    │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌────────────────────────────────────────────────────┐     │
│  │         ML Models (TensorFlow + Keras)             │     │
│  ├────────────────────────────────────────────────────┤     │
│  │                                                     │     │
│  │  • MobileNetV2 - Skin disease classification       │     │
│  │  • ResNet50    - Skin disease classification       │     │
│  │  • Ensemble prediction (both models)               │     │
│  └────────────────────────────────────────────────────┘     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              External Services (Google Gemini AI)            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  • Gemini 2.5 Flash - Conversational AI                     │
│  • Gemini 3 Flash   - Structured health assessments         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagrams

### 1. User Registration Flow
```
┌─────────┐    Register    ┌─────────┐   Validate   ┌──────────┐
│  User   │─────────────→  │ Backend │─────────────→│  Validate│
└─────────┘                 └─────────┘              └──────────┘
                                 │                          │
                                 │                          ▼
                                 │                    ┌──────────┐
                                 │                    │Hash Pass │
                                 │                    └──────────┘
                                 │                          │
                                 ▼                          ▼
                           ┌──────────┐              ┌──────────┐
                           │Save User │◀─────────────│Gen Token │
                           └──────────┘              └──────────┘
                                 │
                                 ▼
                           ┌──────────┐
                           │users.json│
                           └──────────┘
```

### 2. Chat Session Flow
```
┌──────┐   Send Message   ┌─────────┐   Check     ┌──────────┐
│ User │─────────────────→│  App    │  Profile    │Backend   │
└──────┘                   └─────────┘─────────────→└──────────┘
                                 │                       │
                                 │  ◀────────────────────┘
                                 │   Profile Data
                                 ▼
                           ┌──────────┐
                           │ Validate │
                           │Age & Sex │
                           └──────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
               Valid│       Save │       Invalid
                    ▼            ▼            ▼
              ┌─────────┐  ┌─────────┐  ┌─────────┐
              │Send to  │  │Save to  │  │Show     │
              │Gemini AI│  │ Profile │  │Error    │
              └─────────┘  └─────────┘  └─────────┘
                    │            │
                    ▼            ▼
              ┌─────────┐  ┌─────────────┐
              │Response │  │user_profiles│
              │to User  │  │   .json     │
              └─────────┘  └─────────────┘
                    │
                    ▼
              ┌─────────┐
              │Save to  │
              │History  │
              └─────────┘
                    │
                    ▼
              ┌─────────────┐
              │chat_history │
              │   .json     │
              └─────────────┘
```

### 3. Emergency Request Flow
```
┌──────┐  Click Emergency  ┌────────────┐
│ User │──────────────────→│ClinicalTeam│
└──────┘                    └────────────┘
                                   │
                                   ▼
                            ┌────────────┐
                            │Show Form   │
                            └────────────┘
                                   │
                                   ▼ Fill Address & Problem
                            ┌────────────┐
                            │POST Request│
                            └────────────┘
                                   │
                                   ▼
                            ┌────────────┐
                            │Backend Save│
                            └────────────┘
                                   │
                                   ▼
                         ┌──────────────────┐
                         │emergency_requests│
                         │     .json        │
                         └──────────────────┘
                                   │
                                   ▼
                            ┌────────────┐
                            │Show Status:│
                            │  pending   │
                            └────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │                             │
           User Marks Reached            User Cancels
                    │                             │
                    ▼                             ▼
            ┌────────────┐                ┌────────────┐
            │PUT Request │                │PUT Request │
            │status:     │                │status:     │
            │reached     │                │cancelled   │
            └────────────┘                └────────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                            ┌────────────┐
                            │Update JSON │
                            └────────────┘
                                   │
                                   ▼
                            ┌────────────┐
                            │Show Updated│
                            │  Status    │
                            └────────────┘
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────┐
│          Security Layers                    │
├─────────────────────────────────────────────┤
│                                              │
│  Layer 1: Frontend                          │
│  ┌────────────────────────────────────┐    │
│  │ • Token Storage (localStorage)     │    │
│  │ • Client-side validation           │    │
│  │ • HTTPS (production)               │    │
│  └────────────────────────────────────┘    │
│                                              │
│  Layer 2: Transport                         │
│  ┌────────────────────────────────────┐    │
│  │ • JWT/Token in Authorization header│    │
│  │ • CORS configuration               │    │
│  │ • Content-Type validation          │    │
│  └────────────────────────────────────┘    │
│                                              │
│  Layer 3: Backend                           │
│  ┌────────────────────────────────────┐    │
│  │ • Token verification               │    │
│  │ • Password hashing (SHA-256)       │    │
│  │ • Input validation                 │    │
│  │ • User ID isolation                │    │
│  └────────────────────────────────────┘    │
│                                              │
│  Layer 4: Data                              │
│  ┌────────────────────────────────────┐    │
│  │ • Hashed passwords only            │    │
│  │ • User-specific data access        │    │
│  │ • No plain text credentials        │    │
│  └────────────────────────────────────┘    │
│                                              │
└─────────────────────────────────────────────┘
```

## 📁 File Organization

```
Team 1 ChatBot/
│
├── Frontend (React)
│   ├── App.tsx                    # Main app with all integrations
│   ├── components/
│   │   ├── AuthPanel.tsx          # Login/Register
│   │   ├── SafetyGuidelines.tsx   # Safety info
│   │   ├── ClinicalTeam.tsx       # Emergency requests
│   │   ├── ChatHistory.tsx        # View history
│   │   ├── SkinAnalysisView.tsx   # Skin disease detection UI
│   │   ├── SummaryCard.tsx        # Health assessment card
│   │   └── Icons.tsx              # Icon components
│   │
│   ├── services/
│   │   ├── geminiService.ts       # Google Gemini AI integration
│   │   ├── predictService.ts      # ML prediction calls
│   │   └── apiService.ts          # Backend API wrapper
│   │
│   └── types.ts                   # TypeScript interfaces
│
├── Backend (Python Flask)
│   ├── app.py                     # Main Flask application
│   │                                • All API endpoints
│   │                                • ML model loading
│   │                                • Data management
│   │
│   ├── models/                    # TensorFlow models
│   │   ├── mobilenet_model.weights.h5
│   │   ├── resnet_model.weights.h5
│   │   └── custom_cnn_skin_model.keras
│   │
│   └── data/                      # JSON storage
│       ├── users.json             # User accounts
│       ├── user_profiles.json     # User profiles
│       ├── parental_profiles.json # Children profiles
│       ├── chat_history.json      # Conversations
│       └── emergency_requests.json# Emergency data
│
└── Documentation
    ├── FEATURES.md                # Detailed features
    ├── SETUP.md                   # Quick setup guide
    ├── IMPLEMENTATION_SUMMARY.md  # Complete overview
    └── ARCHITECTURE.md            # This file
```

## 🔄 State Management

```
App Component State:
│
├── Authentication
│   ├── isAuthenticated: boolean
│   ├── token: string | null
│   ├── user: User | null
│   └── showAuthPanel: boolean
│
├── Chat
│   ├── messages: Message[]
│   ├── inputText: string
│   ├── isTyping: boolean
│   ├── isRecording: boolean
│   └── selectedImage: ImageState | null
│
├── Profile
│   ├── userProfile: UserProfile | null
│   ├── parentalProfile: ParentalProfile | null
│   └── profileLoaded: boolean
│
├── Modes
│   ├── isLanding: boolean
│   ├── isSkinMode: boolean
│   └── isParentalMode: boolean
│
└── UI Modals
    ├── showSafetyGuidelines: boolean
    ├── showClinicalTeam: boolean
    └── showChatHistory: boolean
```

## 🎯 Feature Integration Map

```
┌────────────────────────────────────────────────┐
│              Landing Page                      │
│  ┌──────────────────────────────────────────┐ │
│  │ Navigation:                              │ │
│  │ • Safety Guidelines → SafetyGuidelines   │ │
│  │ • Skin Check → SkinAnalysisView          │ │
│  │ • Clinical Team → ClinicalTeam           │ │
│  │ • User Profile → Display                 │ │
│  │ • Logout → handleLogout()                │ │
│  │                                          │ │
│  │ Main Actions:                            │ │
│  │ • Begin Assessment → Normal Chat         │ │
│  │ • Parental Chat → Parental Mode          │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │                           │
        ▼                           ▼
┌──────────────┐          ┌──────────────┐
│  Chat Mode   │          │  Skin Mode   │
├──────────────┤          ├──────────────┤
│ • Messages   │          │ • Upload     │
│ • Profile    │          │ • Predict    │
│ • History    │          │ • Results    │
│ • Parental   │          │              │
└──────────────┘          └──────────────┘
```

## 🌐 API Request/Response Flow

### Example: Emergency Request

**Request:**
```http
POST http://localhost:5000/emergency-request
Headers:
  Authorization: Bearer <token>
  Content-Type: application/json
Body:
  {
    "address": "123 Main St, City",
    "problem": "Severe chest pain"
  }
```

**Response:**
```json
{
  "success": true,
  "request": {
    "id": "uuid-123",
    "user_id": "user-uuid",
    "address": "123 Main St, City",
    "problem": "Severe chest pain",
    "status": "pending",
    "created_at": "2026-02-18T10:30:00",
    "updated_at": "2026-02-18T10:30:00"
  }
}
```

## 💾 Data Models

### Users Collection
```json
{
  "email@example.com": {
    "id": "uuid",
    "username": "username",
    "password": "hashed_password",
    "token": "auth_token",
    "created_at": "ISO-8601"
  }
}
```

### User Profiles Collection
```json
{
  "user-id": {
    "age": "25",
    "biological_sex": "Male",
    "updated_at": "ISO-8601"
  }
}
```

### Parental Profiles Collection
```json
{
  "user-id": {
    "child_age": "10",
    "child_biological_sex": "Female",
    "child_relation": "daughter",
    "updated_at": "ISO-8601"
  }
}
```

### Chat History Collection
```json
{
  "user-id": [
    {
      "id": "chat-id",
      "message": [...messages],
      "chat_type": "normal|parental",
      "timestamp": "ISO-8601"
    }
  ]
}
```

### Emergency Requests Collection
```json
{
  "request-id": {
    "id": "uuid",
    "user_id": "user-uuid",
    "address": "string",
    "problem": "string",
    "status": "pending|en_route|reached|cancelled",
    "created_at": "ISO-8601",
    "updated_at": "ISO-8601"
  }
}
```

## 🚀 Deployment Architecture (Future)

```
┌─────────────────────────────────────────────┐
│         Production Deployment               │
├─────────────────────────────────────────────┤
│                                              │
│  Frontend:                                  │
│  ┌────────────────────────────────────┐    │
│  │ • Vercel / Netlify / AWS S3        │    │
│  │ • React build (npm run build)      │    │
│  │ • CDN for static assets            │    │
│  └────────────────────────────────────┘    │
│                                              │
│  Backend:                                   │
│  ┌────────────────────────────────────┐    │
│  │ • AWS EC2 / Heroku / DigitalOcean  │    │
│  │ • Gunicorn WSGI server             │    │
│  │ • Nginx reverse proxy              │    │
│  └────────────────────────────────────┘    │
│                                              │
│  Database:                                  │
│  ┌────────────────────────────────────┐    │
│  │ • PostgreSQL (replace JSON files)  │    │
│  │ • MongoDB (NoSQL alternative)      │    │
│  │ • AWS RDS / MongoDB Atlas          │    │
│  └────────────────────────────────────┘    │
│                                              │
│  ML Models:                                 │
│  ┌────────────────────────────────────┐    │
│  │ • S3 bucket for model storage      │    │
│  │ • TensorFlow Serving (optional)    │    │
│  └────────────────────────────────────┘    │
│                                              │
└─────────────────────────────────────────────┘
```

## 📈 Performance Considerations

1. **Frontend**
   - Lazy loading for modals
   - Image compression before upload
   - Debounced search/filter
   - Virtual scrolling for large chat history

2. **Backend**
   - Caching for frequent requests
   - Connection pooling for database
   - Async operations where possible
   - Rate limiting for API endpoints

3. **Data**
   - Index on user_id for faster lookups
   - Pagination for chat history
   - Compression for stored images
   - Archive old emergency requests

---

**Note**: This architecture is designed for development. For production, replace JSON files with a proper database (PostgreSQL/MongoDB) and implement additional security measures (bcrypt for passwords, rate limiting, HTTPS only, etc.).
