📧 AI Mail Spam Detection

An AI-powered Mail Spam Detection web application built using React + FastAPI + Machine Learning + MongoDB.
This project detects whether an email/message is Spam or Not Spam using Natural Language Processing (NLP) and Machine Learning algorithms.

🚀 Features
🔍 AI-powered spam detection
📧 Real-time email/message analysis
🤖 Machine Learning model integration
⚡ FastAPI backend
🎨 Modern React frontend
🗄 MongoDB database integration
🔐 User authentication with JWT
📊 Spam prediction history
📱 Responsive modern UI
🛠 Tech Stack
Frontend
React (Vite)
Axios
React Router DOM
Backend
FastAPI
Python
Uvicorn
Machine Learning
Scikit-learn
NLP (CountVectorizer)
Multinomial Naive Bayes
Database
MongoDB
PyMongo
📂 Project Structure
mail-spam-detection/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── database/
│   ├── dataset/
│   ├── main.py
│   ├── .env
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
⚙️ Backend Setup
1. Navigate to backend
cd backend
2. Create virtual environment
python -m venv venv
3. Activate virtual environment
Windows
venv\Scripts\activate
4. Install dependencies
pip install -r requirements.txt

OR

pip install fastapi uvicorn pymongo python-dotenv scikit-learn pandas bcrypt python-jose[cryptography] passlib[email]
5. Run backend server
python -m uvicorn main:app --reload
⚙️ Frontend Setup
1. Navigate to frontend
cd frontend
2. Install dependencies
npm install
3. Run frontend
npm run dev
🔑 Environment Variables

Create .env inside backend:

MONGO_URI=mongodb://localhost:27017

DB_NAME=spam_ai

COLLECTION_NAME=messages
🤖 Machine Learning Model

The application uses:

CountVectorizer for text vectorization
Multinomial Naive Bayes for spam classification

Dataset contains:

Spam emails/messages
Non-spam (ham) messages
📡 API Endpoints
Spam Detection
POST /api/spam/predict
Request
{
  "text": "Win free iphone now"
}
Response
{
  "success": true,
  "spam": true,
  "prediction": "spam",
  "message": "Spam email detected."
}
🔐 Authentication APIs
Register
POST /api/auth/register
Login
POST /api/auth/login
🎨 UI Features
Modern SaaS landing page
AI-inspired design
Glassmorphism effects
Gradient buttons
Interactive dashboard
Responsive layout
📊 Future Improvements
Deep Learning spam model
Email attachment scanning
Real-time analytics dashboard
AI confidence score
Admin dashboard
Dark mode
Cloud deployment
Email integration
🌐 Future Deployment
Frontend
Vercel
Backend
Render / Railway
Database
MongoDB Atlas
👨‍💻 Author

Developed by Rajesh N

⭐ Project Goal

This project aims to demonstrate:

AI & ML integration
Full-stack development
NLP implementation
Modern web application architecture
Real-world spam detection system
