const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Diagnosis = require('../models/Diagnosis');
const aiService = require('../services/aiService');

/**
 * @route   POST /api/diagnose
 * @desc    Submit symptoms and get AI diagnosis
 * @access  Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { symptoms, age, gender, history, additionalInfo } = req.body;
    const userId = req.user._id;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({ error: true, message: 'Symptoms are required' });
    }

    // Prepare user data for the AI
    const userData = {
      age: age || req.user.age,
      gender: gender || req.user.gender,
      medicalHistory: history || req.user.medicalHistory || [],
      symptoms,
      additionalInfo: additionalInfo || ''
    };

    // Step 1: Get disease prediction from AI
    const diseaseResults = await aiService.predictDisease(userData);

    // Create initial diagnosis record
    const diagnosis = new Diagnosis({
      userId,
      symptoms,
      userInput: {
        age: userData.age,
        gender: userData.gender,
        history: userData.medicalHistory,
        additionalInfo: userData.additionalInfo
      },
      results: diseaseResults
    });

    await diagnosis.save();

    // Step 2: Get diet plan based on diagnosis
    const dietPlan = await aiService.generateDietPlan({
      userInput: diagnosis.userInput,
      results: diagnosis.results
    });

    // Step 3: Get detailed next steps
    const detailedSteps = await aiService.generateNextSteps({
      userInput: diagnosis.userInput,
      results: diagnosis.results,
      symptoms: diagnosis.symptoms
    });

    // Update diagnosis with diet plan and detailed steps
    diagnosis.dietPlan = dietPlan;
    diagnosis.detailedSteps = detailedSteps;
    
    await diagnosis.save();

    res.json({
      success: true,
      diagnosis: {
        _id: diagnosis._id,
        results: diagnosis.results,
        dietPlan: diagnosis.dietPlan,
        detailedSteps: diagnosis.detailedSteps
      }
    });
  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error processing diagnosis',
      details: error.message
    });
  }
});

/**
 * @route   GET /api/diagnose/:id
 * @desc    Get a specific diagnosis
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    
    if (!diagnosis) {
      return res.status(404).json({ error: true, message: 'Diagnosis not found' });
    }
    
    // Check if diagnosis belongs to the requesting user
    if (diagnosis.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: true, message: 'Not authorized to access this diagnosis' });
    }
    
    res.json(diagnosis);
  } catch (error) {
    console.error('Get diagnosis error:', error);
    res.status(500).json({ error: true, message: 'Server error fetching diagnosis' });
  }
});

/**
 * @route   GET /api/diagnose
 * @desc    Get all diagnoses for a user
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(diagnoses);
  } catch (error) {
    console.error('Get diagnoses error:', error);
    res.status(500).json({ error: true, message: 'Server error fetching diagnoses history' });
  }
});

/**
 * @route   DELETE /api/diagnose/:id
 * @desc    Delete a diagnosis
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const diagnosis = await Diagnosis.findById(req.params.id);
    
    if (!diagnosis) {
      return res.status(404).json({ error: true, message: 'Diagnosis not found' });
    }
    
    // Check if diagnosis belongs to the requesting user
    if (diagnosis.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: true, message: 'Not authorized to delete this diagnosis' });
    }
    
    await diagnosis.deleteOne();
    
    res.json({ success: true, message: 'Diagnosis deleted successfully' });
  } catch (error) {
    console.error('Delete diagnosis error:', error);
    res.status(500).json({ error: true, message: 'Server error deleting diagnosis' });
  }
});

/**
 * @route   POST /api/diagnose/ayurvedic-guidance
 * @desc    Get personalized Ayurvedic lifestyle recommendations
 * @access  Private
 */
router.post('/ayurvedic-guidance', authenticate, async (req, res) => {
  try {
    const { healthConcerns, lifestyle, season } = req.body;
    
    // Prepare user data for Ayurvedic analysis
    const userData = {
      age: req.user.age,
      gender: req.user.gender,
      healthConcerns: healthConcerns || 'General wellness',
      lifestyle: lifestyle || 'Modern lifestyle',
      season: season || 'Current season'
    };

    // Get Ayurvedic lifestyle recommendations
    const ayurvedicGuidance = await aiService.generateAyurvedicGuidance(userData);

    res.json({
      success: true,
      guidance: ayurvedicGuidance,
      userProfile: {
        age: userData.age,
        gender: userData.gender
      }
    });
  } catch (error) {
    console.error('Ayurvedic guidance error:', error);
    res.status(500).json({ error: true, message: 'Server error generating Ayurvedic guidance' });
  }
});

/**
 * @route   GET /api/diagnose/traditional-remedies/:category
 * @desc    Get traditional Indian remedies for specific symptom category
 * @access  Public
 */
router.get('/traditional-remedies/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!category) {
      return res.status(400).json({ 
        success: false, 
        error: true, 
        message: 'Category parameter is required' 
      });
    }
    
    const remedies = aiService.getTraditionalIndianRemedies(category);
    
    if (!remedies) {
      return res.status(404).json({ 
        success: false, 
        error: true, 
        message: 'No remedies found for this category' 
      });
    }
    
    res.json({
      success: true,
      remedies,
      disclaimer: "These are traditional home remedies for informational purposes. Consult healthcare providers for serious conditions."
    });
  } catch (error) {
    console.error('Traditional remedies error:', error);
    res.status(500).json({ 
      success: false, 
      error: true, 
      message: 'Server error fetching traditional remedies' 
    });
  }
});

module.exports = router;
