# 🧪 Testing Guide - Fraud Detection Examples

## Test the Application Interactively

### Server is Running
Your server is already running at: **http://localhost:5000**

---

## 📝 Test Case 1: VERIFIED INTERNSHIP (Low Fraud Score)

### Navigate to: http://localhost:5000/submit

**Fill in the form with:**

**Company Name:** `Microsoft`

**Company Email:** `hr@microsoft.com`

**Salary/Stipend:** `25000`

**Job Description:**
```
We are looking for a Software Engineering Intern to join our team for Summer 2026. 

Responsibilities:
- Develop and test new features for our cloud platform
- Collaborate with senior engineers on code reviews
- Participate in agile development processes
- Write clean, maintainable code

Requirements:
- Currently pursuing Computer Science degree
- Knowledge of JavaScript, Python, or C#
- Strong problem-solving skills
- Good communication abilities

Benefits:
- Competitive stipend of ₹25,000/month
- Mentorship from experienced engineers
- Certificate upon completion
- Potential for full-time offer
```

**Expected Result:**
- ✅ Fraud Score: **0-15** (Very Low)
- ✅ Status: **"Verified Job"** (Green Badge)
- ✅ No warning flags
- ✅ Safe to apply!

**Why it's verified:**
- Company email domain (microsoft.com) ✓
- Realistic salary ✓
- Professional description ✓
- No scam keywords ✓

---

## 🚨 Test Case 2: FAKE/SCAM JOB (High Fraud Score)

### Navigate to: http://localhost:5000/submit

**Fill in the form with:**

**Company Name:** `Quick Money Solutions`

**Company Email:** `hiring@gmail.com`

**Salary/Stipend:** `150000`

**Job Description:**
```
URGENT HIRING! IMMEDIATE START!

Earn ₹1,50,000 per month working from home! No experience needed!

PAY REGISTRATION FEE of ₹500 to get started. This is a LIMITED TIME OFFER!

Send money via wire transfer to secure your position. ACT NOW before slots fill up!

GUARANTEED INCOME! Easy work! Click here to claim your spot!
```

**Expected Result:**
- ⚠️ Fraud Score: **75-85** (Very High)
- ⚠️ Status: **"Potential Scam"** (Red Badge)
- ⚠️ Multiple warning flags:
  - "Free email provider detected (gmail.com)"
  - "Unrealistically high salary (₹150,000)"
  - "Suspicious keywords detected: 'registration fee', 'guaranteed income', 'act now', 'limited time offer'"
  - "Excessive capitalization detected"

**Why it's flagged as scam:**
- Free email (gmail.com): +35 points
- Unrealistic salary: +25 points
- Scam keywords: +15-30 points
- Excessive caps: +15 points
- **Total: ~80 points** → SCAM!

---

## 💼 Test Case 3: MODERATE RISK INTERNSHIP

### Navigate to: http://localhost:5000/submit

**Fill in the form with:**

**Company Name:** `TechStart Solutions`

**Company Email:** `recruiter@yahoo.com`

**Salary/Stipend:** `15000`

**Job Description:**
```
Looking for a motivated intern to join our startup. You'll work on web development projects and learn new technologies. This is a great opportunity for students.
```

**Expected Result:**
- ⚠️ Fraud Score: **35-45** (Medium)
- ⚠️ Status: **"Potential Scam"** (Red Badge)
- ⚠️ Warning: "Free email provider detected (yahoo.com)"

**Why it's flagged:**
- Free email (yahoo.com): +35 points
- Short description: +10 points
- **Total: ~45 points** → Borderline scam

**Note:** Even though the description seems okay, using a free email is a major red flag!

---

## 🎯 Test Case 4: LEGITIMATE STARTUP INTERNSHIP

### Navigate to: http://localhost:5000/submit

**Fill in the form with:**

**Company Name:** `Zomato`

**Company Email:** `careers@zomato.com`

**Salary/Stipend:** `20000`

**Job Description:**
```
Zomato is hiring Product Management Interns for our Bangalore office.

Role Overview:
As a Product Management Intern, you will work closely with our product team to understand user needs, analyze data, and contribute to product strategy.

What you'll do:
- Conduct user research and gather feedback
- Analyze product metrics and user behavior
- Assist in creating product roadmaps
- Collaborate with engineering and design teams
- Present findings to stakeholders

What we're looking for:
- Currently pursuing MBA or related degree
- Strong analytical and communication skills
- Passion for technology and food industry
- Ability to work in a fast-paced environment

What we offer:
- Stipend: ₹20,000/month
- Hands-on experience with real products
- Mentorship from senior PMs
- Flexible work hours
- Free meals at office
```

**Expected Result:**
- ✅ Fraud Score: **0-10** (Very Low)
- ✅ Status: **"Verified Job"** (Green Badge)
- ✅ No warnings
- ✅ Highly trustworthy!

---

## 📊 After Submitting Jobs

### View All Jobs: http://localhost:5000/jobs

**You can:**
1. See all submitted jobs with fraud scores
2. Filter by "Verified Only" or "Scams Only"
3. Compare fraud scores side-by-side
4. Read detailed warning flags for each job

---

## 🔍 Understanding the Fraud Detection

### Scoring Breakdown:

| Component | Max Points | What it checks |
|-----------|-----------|----------------|
| Email Domain | 40 | Free providers (Gmail, Yahoo) vs company domains |
| Salary | 25 | Unrealistic amounts (too high or too low) |
| Keywords | 40 | Scam phrases like "registration fee", "guaranteed income" |
| Description | 25 | Length, capitalization, professionalism |

### Classification:
- **0-29 points** = ✅ Verified Job (Green)
- **30-100 points** = ⚠️ Potential Scam (Red)

---

## 🎮 Interactive Testing Steps

1. **Open** http://localhost:5000 in your browser
2. **Click** "Submit Job" in the navigation
3. **Try Test Case 1** (Microsoft - Verified)
   - Fill the form
   - Click "🔍 Validate Job Posting"
   - See the low fraud score
   - Click "✅ Submit Job Posting"
4. **Try Test Case 2** (Scam Job)
   - Fill the form with scam details
   - Click "🔍 Validate Job Posting"
   - See the high fraud score and red warnings
   - Submit it anyway to compare
5. **Click** "View Jobs" in navigation
6. **See** both jobs side-by-side with their fraud scores
7. **Use filters** to show only verified or scam jobs

---

## 💡 Tips for Testing

- The **real-time validation** shows fraud score BEFORE submitting
- **Green badges** = Safe to apply
- **Red badges** = Stay away!
- **Warning flags** explain exactly why a job is suspicious
- All jobs are saved in MongoDB for comparison

---

**Happy Testing! 🛡️**

Try submitting various combinations to see how the fraud detection responds!
