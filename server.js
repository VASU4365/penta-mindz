/**
 * Fake-Free Job & Internship Platform - Backend Server
 * 
 * This is the main server file that:
 * 1. Connects to MongoDB database
 * 2. Sets up Express server with middleware
 * 3. Registers API routes
 * 4. Serves static frontend files
 * 
 * To run: node server.js
 */

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const jobRoutes = require('./routes/jobs');

// Initialize Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fake-free-jobs';

// ============================================
// MIDDLEWARE SETUP
// ============================================

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend to communicate with backend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connected to MongoDB successfully');
        console.log(`📊 Database: ${MONGODB_URI}`);
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('💡 Running in fallback mode without database!');
        console.error('   - Jobs will be stored in memory (lost on restart)');
        console.error('   - To use persistent storage:');
        console.error('     1. Install MongoDB: https://www.mongodb.com/try/download/community');
        console.error('     2. Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas');
    });

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
    console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB error:', error);
});

// ============================================
// API ROUTES
// ============================================

// Job-related routes
app.use('/api/jobs', jobRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// ============================================
// FRONTEND ROUTES
// ============================================

// Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'));
});

app.get('/jobs', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'jobs.html'));
});

app.get('/check-link', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'check-link.html'));
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler - route not found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log('   Fake-Free Job Platform - Server Started');
    console.log('   ========================================');
    console.log(`   🌐 Server: http://localhost:${PORT}`);
    console.log(`   📡 API: http://localhost:${PORT}/api`);
    console.log(`   📊 Health: http://localhost:${PORT}/api/health`);
    console.log('   ========================================\n');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n⚠️  Shutting down gracefully...');
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
});
