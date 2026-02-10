# Technology Stack & Architecture

## Overview
The Fake-Free Job Platform is a full-stack web application built with modern JavaScript technologies for both frontend and backend.

---

## Backend Technologies

### Core Framework
- **Node.js** (v24.13.0) - JavaScript runtime environment
- **Express.js** (v4.21.2) - Web application framework for Node.js
  - Handles routing, middleware, and HTTP requests
  - RESTful API architecture

### Database
- **MongoDB** - NoSQL document database
  - **Mongoose** (v8.9.4) - ODM (Object Data Modeling) library
  - Schema validation and data modeling
  - **Fallback**: In-memory storage when MongoDB unavailable

### Key Backend Libraries
```json
{
  "express": "^4.21.2",        // Web framework
  "mongoose": "^8.9.4",        // MongoDB ODM
  "cors": "^2.8.5",            // Cross-Origin Resource Sharing
  "dotenv": "^16.4.7",         // Environment variables
  "validator": "^13.12.0"      // Email/data validation
}
```

### Backend Architecture Patterns

#### 1. **MVC Pattern (Model-View-Controller)**
```
models/
  └── Job.js              // Data model (Mongoose schema)
routes/
  └── jobs.js             // Controller (API endpoints)
utils/
  └── fraudDetection.js   // Business logic
```

#### 2. **RESTful API Design**
```javascript
// CRUD Operations
POST   /api/jobs          // Create job
GET    /api/jobs          // Read all jobs
GET    /api/jobs/:id      // Read single job
POST   /api/jobs/validate // Validate without saving
POST   /api/links/check   // Check link fraud
```

#### 3. **Middleware Pattern**
```javascript
// Request processing pipeline
app.use(cors());                    // Enable CORS
app.use(express.json());            // Parse JSON bodies
app.use(express.static('public'));  // Serve static files
app.use((req, res, next) => {...}); // Custom logging
```

#### 4. **Async/Await Pattern**
```javascript
// Modern asynchronous programming
async function detectFraud(jobData) {
    const emailAnalysis = await analyzeEmailDomain(email);
    const linkAnalysis = await analyzeLinks(description);
    // ...
}
```

#### 5. **Module Pattern**
```javascript
// Encapsulation and exports
module.exports = {
    detectFraud,
    analyzeEmailDomain,
    analyzeSalary
};
```

---

## Frontend Technologies

### Core Technologies
- **HTML5** - Semantic markup
- **CSS3** - Styling with custom properties (CSS variables)
- **Vanilla JavaScript (ES6+)** - No framework, pure JS

### Frontend Architecture Patterns

#### 1. **Module Pattern**
```javascript
// Encapsulated functionality
const API_URL = 'http://localhost:5000/api';

async function apiRequest(endpoint, method, data) {
    // Centralized API communication
}

// Export to global scope
window.initSubmitPage = initSubmitPage;
window.initJobsPage = initJobsPage;
```

#### 2. **Event-Driven Architecture**
```javascript
// Event listeners for user interactions
form.addEventListener('submit', handleSubmit);
validateBtn.addEventListener('click', handleValidation);
```

#### 3. **Fetch API Pattern**
```javascript
// Modern HTTP requests
async function apiRequest(endpoint, method, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}
```

#### 4. **DOM Manipulation Pattern**
```javascript
// Dynamic content updates
function displayJobs(jobs) {
    jobsGrid.innerHTML = jobs.map(job => createJobCard(job)).join('');
}
```

#### 5. **Progressive Enhancement**
```javascript
// Feature detection and graceful degradation
if (typeof initSubmitPage === 'function') {
    initSubmitPage();
}
```

---

## Design Patterns Used

### 1. **Factory Pattern**
```javascript
// Creating job objects
function createInMemoryJob(jobData) {
    return {
        _id: String(jobIdCounter++),
        ...jobData,
        createdAt: new Date()
    };
}
```

### 2. **Strategy Pattern**
```javascript
// Different fraud detection strategies
function detectFraud(jobData) {
    const emailAnalysis = analyzeEmailDomain(email);
    const salaryAnalysis = analyzeSalary(salary);
    const linkAnalysis = analyzeLinks(description);
    // Combine strategies
}
```

### 3. **Observer Pattern**
```javascript
// MongoDB connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
```

### 4. **Singleton Pattern**
```javascript
// Single database connection
mongoose.connect(MONGODB_URI);
```

### 5. **Template Pattern**
```javascript
// HTML template generation
function createJobCard(job) {
    return `
        <div class="job-card">
            <h3>${job.companyName}</h3>
            <!-- ... -->
        </div>
    `;
}
```

---

## Key Algorithms & Logic

### 1. **Fraud Detection Algorithm**
**Location**: `utils/fraudDetection.js`

**Components**:
- Email domain verification (DNS lookup)
- Salary range validation
- Keyword pattern matching
- URL analysis and domain verification
- Scoring system (0-100)

**Pattern**: Rule-based scoring with weighted components

```javascript
totalScore = emailScore + salaryScore + linkScore + keywordScore
status = totalScore >= 30 ? 'Potential Scam' : 'Verified Job'
```

### 2. **URL Extraction Algorithm**
```javascript
// Regex pattern matching
const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
const urls = text.match(urlRegex) || [];
```

### 3. **Domain Verification**
```javascript
// DNS resolution using Node.js dns module
async function verifyDomain(domain) {
    try {
        await dns.resolve(domain);
        return true;
    } catch {
        return false;
    }
}
```

---

## Data Flow Architecture

### Job Submission Flow
```
User Form Input
    ↓
Frontend Validation
    ↓
API Request (POST /api/jobs)
    ↓
Backend Validation
    ↓
Fraud Detection Algorithm
    ├── Email Analysis (DNS)
    ├── Salary Analysis
    ├── Link Analysis (DNS)
    └── Keyword Analysis
    ↓
Score Calculation
    ↓
Database Storage (MongoDB or In-Memory)
    ↓
Response to Frontend
    ↓
Display Results
```

### Link Checker Flow
```
User URL Input
    ↓
API Request (POST /api/links/check)
    ↓
URL Extraction
    ↓
Link Analysis
    ├── URL Shortener Check
    ├── IP Address Check
    ├── Suspicious TLD Check
    ├── Domain Verification (DNS)
    └── Phishing Keyword Check
    ↓
Safety Determination
    ↓
Response with Flags
    ↓
Display Results
```

---

## Security Patterns

### 1. **Input Validation**
```javascript
// Server-side validation
if (!companyName || !companyEmail || !salary) {
    return res.status(400).json({ message: 'Required fields missing' });
}
```

### 2. **XSS Prevention**
```javascript
// HTML escaping
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### 3. **CORS Configuration**
```javascript
app.use(cors()); // Enable cross-origin requests
```

### 4. **Environment Variables**
```javascript
// Sensitive data in .env file
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
```

---

## File Structure

```
fraud-link/
├── server.js                 // Express server setup
├── package.json              // Dependencies
├── .env                      // Environment variables
├── models/
│   └── Job.js               // Mongoose schema
├── routes/
│   └── jobs.js              // API endpoints
├── utils/
│   └── fraudDetection.js    // Fraud detection logic
└── public/
    ├── index.html           // Home page
    ├── submit.html          // Job submission
    ├── jobs.html            // Job listings
    ├── check-link.html      // Link checker
    ├── css/
    │   └── style.css        // Styling
    └── js/
        └── app.js           // Frontend logic
```

---

## Performance Optimizations

### 1. **Asynchronous Operations**
- Non-blocking I/O with async/await
- Parallel DNS lookups for multiple URLs

### 2. **Caching Strategy**
- Static file serving with Express
- Browser caching for CSS/JS files

### 3. **Database Indexing**
```javascript
jobSchema.index({ createdAt: -1 }); // Fast sorting
jobSchema.index({ fraudScore: 1 });  // Fast filtering
```

### 4. **In-Memory Fallback**
- Graceful degradation when MongoDB unavailable
- No external dependencies required for development

---

## Development Tools

- **npm** - Package manager
- **nodemon** (optional) - Auto-restart on file changes
- **dotenv** - Environment configuration
- **Git** - Version control

---

## API Communication Protocol

### Request Format
```javascript
{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
}
```

### Response Format
```javascript
{
    success: true/false,
    message: "Description",
    data: { /* payload */ },
    error: "Error message" // if failed
}
```

---

## Summary

**Backend**: Node.js + Express + MongoDB (with Mongoose)
**Frontend**: HTML5 + CSS3 + Vanilla JavaScript
**Patterns**: MVC, RESTful API, Async/Await, Module Pattern
**Key Features**: DNS verification, fraud scoring, in-memory fallback
**Architecture**: Client-server with RESTful API communication
