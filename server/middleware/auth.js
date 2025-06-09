const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to authenticate user with JWT
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: true, message: 'Authentication required. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found.' });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: true, message: 'Token expired' });
    }
    
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: true, message: 'Not authorized, token failed' });
  }
};

module.exports = { authenticate };
