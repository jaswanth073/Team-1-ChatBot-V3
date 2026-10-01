# 🚀 Quick Setup Guide - HealthAssist AI

## Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

## Installation Steps

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install flask flask-cors tensorflow pillow numpy

# Start the backend server
python app.py
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# From the project root directory
# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port shown in your terminal)

## First Run

1. Open your browser and navigate to the frontend URL
2. You'll see the authentication panel
3. Click "Sign up" to create a new account
4. Enter your email, username, and password
5. Click "Sign Up"
6. You're logged in! 🎉

## Testing the Features

### 1. Normal Chat
- Click "Begin Assessment"
- Answer age and biological sex questions
- Chat with the AI about health concerns

### 2. Parental Chat
- Click "Parental Chat" on the home page
- Answer questions about your child
- Get pediatric-focused guidance

### 3. Skin Analysis
- Click "Skin Check" button
- Upload an image of a skin condition
- Get AI-powered analysis

### 4. Safety Guidelines
- Click "Safety Guidelines" in the navigation
- Review important safety information

### 5. Clinical Team & Emergency
- Click "Clinical Team" button
- Submit an emergency request
- Track ambulance status

### 6. Chat History
- Start a chat session
- Click "📝 History" to view past conversations

## Data Storage

All data is stored in `backend/data/` directory:
- `users.json` - User accounts
- `user_profiles.json` - User profiles
- `parental_profiles.json` - Children profiles
- `chat_history.json` - Chat history
- `emergency_requests.json` - Emergency requests

## Troubleshooting

### Backend not connecting?
- Ensure Python backend is running on port 5000
- Check console for errors
- Verify all dependencies are installed

### Authentication not working?
- Clear browser localStorage
- Check backend console for errors
- Ensure `backend/data/` directory exists

### Models not loading?
- Ensure model files exist in `backend/models/`
- Check TensorFlow installation
- Review backend console for model loading errors

## Environment Variables

Create a `.env` file in the project root:
```
API_KEY=your-google-gemini-api-key
```

## Support

For detailed feature documentation, see [FEATURES.md](FEATURES.md)

---

**Note**: This is a development setup. For production deployment, additional security measures and configuration are required.
