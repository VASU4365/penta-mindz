# 📡 API Documentation

Complete API reference for the Fake-Free Job & Internship Platform.

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Health Check

Check if the server is running and database is connected.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-10T00:41:32.000Z",
  "database": "Connected"
}
```

---

### 2. Submit Job Posting

Submit a new job posting with fraud detection analysis.

**Endpoint:** `POST /api/jobs`

**Request Body:**
```json
{
  "companyName": "Microsoft",
  "companyEmail": "hr@microsoft.com",
  "salary": 25000,
  "jobDescription": "We are looking for a software engineering intern to join our team. Responsibilities include developing features, writing tests, and collaborating with senior engineers."
}
```

**Validation Rules:**
- `companyName`: Required, 2-100 characters
- `companyEmail`: Required, valid email format
- `salary`: Required, number >= 0
- `jobDescription`: Required, 20-2000 characters

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Job posting submitted successfully",
  "job": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "companyName": "Microsoft",
    "companyEmail": "hr@microsoft.com",
    "salary": 25000,
    "jobDescription": "We are looking for...",
    "fraudScore": 15,
    "status": "Verified Job",
    "fraudDetails": {
      "emailDomainScore": 0,
      "salaryScore": 0,
      "keywordScore": 0,
      "descriptionScore": 0,
      "flags": []
    },
    "createdAt": "2026-02-10T00:41:32.000Z",
    "updatedAt": "2026-02-10T00:41:32.000Z"
  },
  "fraudAnalysis": {
    "score": 15,
    "status": "Verified Job",
    "details": { ... }
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Company name is required",
    "Job description must be at least 20 characters"
  ]
}
```

---

### 3. Real-Time Validation

Validate a job posting without saving to database (for real-time feedback).

**Endpoint:** `POST /api/jobs/validate`

**Request Body:**
```json
{
  "companyName": "Fake Company",
  "companyEmail": "scammer@gmail.com",
  "salary": 150000,
  "jobDescription": "Pay registration fee of ₹500 to apply for this amazing opportunity!"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Validation complete",
  "analysis": {
    "fraudScore": 75,
    "status": "Potential Scam",
    "fraudDetails": {
      "emailDomainScore": 35,
      "salaryScore": 25,
      "keywordScore": 15,
      "descriptionScore": 0,
      "flags": [
        "Free email provider detected (gmail.com). Legitimate companies use company domains.",
        "Unrealistically high salary (₹150,000). Most internships pay ₹5,000-₹50,000/month.",
        "Suspicious keywords detected: \"registration fee\""
      ]
    }
  }
}
```

---

### 4. Get All Jobs

Retrieve all job postings sorted by newest first.

**Endpoint:** `GET /api/jobs`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "jobs": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "companyName": "Microsoft",
      "companyEmail": "hr@microsoft.com",
      "salary": 25000,
      "jobDescription": "We are looking for...",
      "fraudScore": 15,
      "status": "Verified Job",
      "fraudDetails": { ... },
      "createdAt": "2026-02-10T00:41:32.000Z",
      "updatedAt": "2026-02-10T00:41:32.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "companyName": "Fake Company",
      "companyEmail": "scammer@gmail.com",
      "salary": 150000,
      "jobDescription": "Pay registration fee...",
      "fraudScore": 75,
      "status": "Potential Scam",
      "fraudDetails": { ... },
      "createdAt": "2026-02-10T00:40:15.000Z",
      "updatedAt": "2026-02-10T00:40:15.000Z"
    }
  ]
}
```

---

### 5. Get Single Job

Retrieve a specific job by ID.

**Endpoint:** `GET /api/jobs/:id`

**Example:** `GET /api/jobs/65a1b2c3d4e5f6g7h8i9j0k1`

**Success Response (200 OK):**
```json
{
  "success": true,
  "job": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "companyName": "Microsoft",
    "companyEmail": "hr@microsoft.com",
    "salary": 25000,
    "jobDescription": "We are looking for...",
    "fraudScore": 15,
    "status": "Verified Job",
    "fraudDetails": { ... },
    "createdAt": "2026-02-10T00:41:32.000Z",
    "updatedAt": "2026-02-10T00:41:32.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Job not found"
}
```

**Error Response (400 Bad Request - Invalid ID):**
```json
{
  "success": false,
  "message": "Invalid job ID format"
}
```

---

## Fraud Score Interpretation

### Score Ranges

| Score Range | Status | Badge Color | Meaning |
|------------|--------|-------------|---------|
| 0-19 | Verified Job | 🟢 Green | Very safe, no major red flags |
| 20-29 | Verified Job | 🟡 Yellow-Green | Generally safe, minor concerns |
| 30-49 | Potential Scam | 🟠 Orange | Suspicious, proceed with caution |
| 50-100 | Potential Scam | 🔴 Red | High risk, likely a scam |

### Fraud Details Breakdown

Each job includes a `fraudDetails` object with:

```json
{
  "emailDomainScore": 0-40,    // Email domain analysis
  "salaryScore": 0-25,          // Salary validation
  "keywordScore": 0-40,         // Scam keyword detection
  "descriptionScore": 0-25,     // Description quality
  "flags": [                    // Array of warning messages
    "Warning message 1",
    "Warning message 2"
  ]
}
```

### Common Fraud Flags

**Email-related:**
- "Free email provider detected (gmail.com). Legitimate companies use company domains."
- "Invalid email format"

**Salary-related:**
- "Unrealistically high salary (₹150,000). Most internships pay ₹5,000-₹50,000/month."
- "Zero salary/stipend. Verify if this is an unpaid internship."
- "Very low salary. Ensure this is legitimate."

**Keyword-related:**
- "Suspicious keywords detected: \"registration fee\", \"pay to apply\""

**Description-related:**
- "Very short job description. Legitimate jobs provide detailed information."
- "Excessive capitalization detected (common in scam posts)."

---

## Error Codes

| Status Code | Meaning |
|------------|---------|
| 200 | Success (GET requests) |
| 201 | Created (POST requests) |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production use, consider adding rate limiting middleware.

---

## CORS

CORS is enabled for all origins. In production, restrict to specific domains:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## Testing with cURL

### Submit a Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Microsoft",
    "companyEmail": "hr@microsoft.com",
    "salary": 25000,
    "jobDescription": "Looking for a software engineering intern..."
  }'
```

### Get All Jobs
```bash
curl http://localhost:5000/api/jobs
```

### Validate Job
```bash
curl -X POST http://localhost:5000/api/jobs/validate \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "companyEmail": "test@gmail.com",
    "salary": 50000,
    "jobDescription": "This is a test job description with enough characters."
  }'
```

---

## Testing with Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:5000/api`
3. For POST requests, set `Content-Type: application/json` in headers
4. Add request body in JSON format

---

## Notes for Developers

- All timestamps are in ISO 8601 format (UTC)
- MongoDB ObjectIds are 24-character hex strings
- All responses include a `success` boolean field
- Error messages are always in the `message` field
- Validation errors include an `errors` array with specific messages
