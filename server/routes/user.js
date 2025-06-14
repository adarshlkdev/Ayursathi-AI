const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile information
 * @access  Private
 */
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const userId = req.user._id;
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    // Update user profile
    if (name) user.name = name;
    if (age) user.age = age;
    if (gender) user.gender = gender;
    
    await user.save();
    
    // Return updated user object without password
    const updatedUser = await User.findById(userId).select('-password');
    
    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: true, message: 'Server error updating profile' });
  }
});

/**
 * @route   PUT /api/user/medical-history
 * @desc    Update user's medical history
 * @access  Private
 */
router.put('/medical-history', authenticate, async (req, res) => {
  try {
    const { medicalHistory } = req.body;
    const userId = req.user._id;
    
    if (!Array.isArray(medicalHistory)) {
      return res.status(400).json({ 
        error: true, 
        message: 'Medical history must be an array of conditions' 
      });
    }
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    // Update medical history
    user.medicalHistory = medicalHistory;
    
    await user.save();
    
    // Return updated user object without password
    const updatedUser = await User.findById(userId).select('-password');
    
    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Medical history update error:', error);
    res.status(500).json({ error: true, message: 'Server error updating medical history' });
  }
});

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile information
 * @access  Private
 */
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: true, message: 'Server error fetching profile' });
  }
});

module.exports = router;
