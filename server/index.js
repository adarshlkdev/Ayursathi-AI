const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected successfully');
}
).catch(err => {
    console.error('MongoDB connection error:', err);
    });

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Routes (will be imported later)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/diagnose', require('./routes/diagnosis'));
app.use('/api/user', require('./routes/user'));
app.use('/api/medications', require('./routes/medication'));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: true, 
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message 
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});