# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

## Setup (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB
Edit `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/fake-free-jobs
PORT=5000
```

### 3. Start Server
```bash
node server.js
```

## Access Application
Open browser: **http://localhost:5000**

## Test Fraud Detection

### ✅ Verified Job Example
- Email: `hr@microsoft.com`
- Salary: `25000`
- Description: Professional internship description

**Result:** Low fraud score (green badge)

### ⚠️ Scam Job Example
- Email: `scammer@gmail.com`
- Salary: `150000`
- Description: "Pay registration fee to apply"

**Result:** High fraud score (red badge)

## Troubleshooting

**MongoDB Error?**
- Start MongoDB service
- Check connection string in `.env`

**Port 5000 in use?**
- Change PORT in `.env` to 3000

**Jobs not loading?**
- Verify server is running
- Check browser console for errors

## Project Structure
```
fraud-link/
├── models/         # Database schemas
├── routes/         # API endpoints
├── utils/          # Fraud detection
├── public/         # Frontend files
├── server.js       # Main server
└── .env            # Configuration
```

## Key Features
- 🔍 Email domain verification
- 💰 Salary validation
- 🤖 Keyword detection
- 📊 Real-time fraud scoring
- 🎨 Modern responsive UI

## Documentation
- [README.md](README.md) - Full setup guide
- [API_DOCS.md](API_DOCS.md) - API reference
- [walkthrough.md](walkthrough.md) - Project overview

---
**Ready to protect students from job scams! 🛡️**
