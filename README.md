# 🛡️ Fake-Free Job & Internship Platform

A full-stack web application that protects students from fake job and internship postings using AI-powered fraud detection. The platform verifies employers, detects scam indicators, and provides real-time validation to help students make informed decisions.

## 🎯 Problem Statement

Students often fall victim to fake job postings that:
- Request registration fees or upfront payments
- Use free email addresses instead of company domains
- Promise unrealistic salaries for entry-level positions
- Collect personal information for malicious purposes

## ✨ Features

### 🔍 AI-Based Fraud Detection
- **Email Domain Verification**: Flags jobs from free email providers (Gmail, Yahoo, etc.)
- **Salary Validation**: Detects unrealistic salary promises
- **Keyword Detection**: Scans for scam indicators like "registration fee", "pay to apply"
- **Fraud Scoring**: Assigns a 0-100 fraud score to every job posting

### 💼 Job Management
- Submit job postings with company details
- Real-time validation before submission
- Browse all jobs with fraud scores visible
- Filter by verified jobs or potential scams

### 🎨 Modern UI/UX
- Clean, student-friendly interface
- Responsive design (mobile, tablet, desktop)
- Color-coded badges (green for verified, red for scams)
- Real-time fraud analysis visualization

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Validator** - Email validation

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern design
- **JavaScript (ES6+)** - Client-side logic
- **Fetch API** - HTTP requests

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Local MongoDB**: [Download here](https://www.mongodb.com/try/download/community)
   - **MongoDB Atlas** (Cloud): [Sign up here](https://www.mongodb.com/cloud/atlas)
3. **npm** (comes with Node.js)

## 🚀 Installation & Setup

### Step 1: Install Dependencies

Open terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- cors
- dotenv
- validator

### Step 2: Configure MongoDB

Open the `.env` file and update the MongoDB connection string:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/fake-free-jobs
PORT=5000
```

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fake-free-jobs
PORT=5000
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### Step 3: Start MongoDB (if using local)

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or manually start with:
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
# Or
brew services start mongodb-community
```

### Step 4: Start the Server

```bash
npm start
```

You should see:
```
🚀 ========================================
   Fake-Free Job Platform - Server Started
   ========================================
   🌐 Server: http://localhost:5000
   📡 API: http://localhost:5000/api
   📊 Health: http://localhost:5000/api/health
   ========================================

✅ Connected to MongoDB successfully
```

### Step 5: Open the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
fraud-link/
├── models/
│   └── Job.js                 # MongoDB schema for job postings
├── routes/
│   └── jobs.js                # API routes for job operations
├── utils/
│   └── fraudDetection.js      # Fraud detection algorithm
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── app.js             # Frontend JavaScript
│   ├── index.html             # Home page
│   ├── submit.html            # Job submission form
│   └── jobs.html              # Job listings page
├── server.js                  # Express server setup
├── package.json               # Project dependencies
├── .env                       # Environment variables
└── README.md                  # This file
```

## 🔌 API Endpoints

See [API_DOCS.md](API_DOCS.md) for detailed API documentation.

**Quick Reference:**
- `POST /api/jobs` - Submit a new job posting
- `GET /api/jobs` - Get all job postings
- `GET /api/jobs/:id` - Get a specific job
- `POST /api/jobs/validate` - Real-time validation (no DB save)
- `GET /api/health` - Server health check

## 🧪 Testing the Application

### Test Case 1: Verified Job (Low Fraud Score)
Submit a job with:
- Company Email: `hr@microsoft.com`
- Salary: `25000`
- Description: Professional description without scam keywords

**Expected Result**: Fraud score < 30, "Verified Job" badge

### Test Case 2: Potential Scam (High Fraud Score)
Submit a job with:
- Company Email: `recruiter@gmail.com`
- Salary: `150000`
- Description: "Pay registration fee of ₹500 to apply"

**Expected Result**: Fraud score >= 30, "Potential Scam" badge with warnings

## 🤖 How Fraud Detection Works

The fraud detection algorithm uses a **rule-based scoring system** (0-100):

### Email Domain Analysis (0-40 points)
- Free email providers (Gmail, Yahoo, etc.): **+35 points**
- Invalid email format: **+40 points**
- Company domain: **0 points** ✅

### Salary Analysis (0-25 points)
- Unrealistically high (>₹100,000/month): **+25 points**
- Zero salary: **+10 points**
- Very low (<₹1,000): **+5 points**

### Keyword Detection (0-40 points)
- Scam keywords detected: **+15 points per keyword** (max 40)
- Examples: "registration fee", "pay to apply", "send money"

### Description Analysis (0-25 points)
- Very short description (<50 chars): **+10 points**
- Excessive capitalization: **+15 points**

### Final Classification
- **Fraud Score < 30**: ✅ Verified Job
- **Fraud Score >= 30**: ⚠️ Potential Scam

## 🎓 For Beginners

### Understanding the Code

1. **Backend (server.js)**: 
   - Sets up the Express server
   - Connects to MongoDB
   - Registers API routes

2. **Models (models/Job.js)**:
   - Defines the structure of job data in MongoDB
   - Includes validation rules

3. **Fraud Detection (utils/fraudDetection.js)**:
   - Contains all the fraud detection logic
   - Well-commented for easy understanding

4. **API Routes (routes/jobs.js)**:
   - Handles HTTP requests (GET, POST)
   - Calls fraud detection and saves to database

5. **Frontend (public/)**:
   - HTML pages for user interface
   - CSS for styling
   - JavaScript for interactivity and API calls

### Common Issues & Solutions

**Issue**: MongoDB connection error
- **Solution**: Make sure MongoDB is running. Check connection string in `.env`

**Issue**: Port 5000 already in use
- **Solution**: Change PORT in `.env` to another number (e.g., 3000)

**Issue**: CORS errors in browser
- **Solution**: Make sure backend server is running on http://localhost:5000

**Issue**: Jobs not displaying
- **Solution**: Check browser console for errors. Verify API is accessible at http://localhost:5000/api/jobs

## 🚀 Future Enhancements

- [ ] Admin panel for manual verification
- [ ] User authentication and profiles
- [ ] Email notifications for new jobs
- [ ] Advanced ML-based fraud detection
- [ ] Company verification via API
- [ ] Job application tracking
- [ ] Reporting system for suspicious jobs

## 📝 License

MIT License - Feel free to use this project for learning and hackathons!

## 👨‍💻 Contributing

This is a beginner-friendly project. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙏 Acknowledgments

Built to help students avoid job scams and find legitimate opportunities safely.

---

**Happy Job Hunting! Stay Safe! 🛡️**
