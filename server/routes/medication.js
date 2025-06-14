// Medication routes
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const Medication = require('../models/Medication');

/**
 * @route   GET /api/medications
 * @desc    Get all medications for a user
 * @access  Private
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(medications);
  } catch (error) {
    console.error('Error fetching medications:', error);
    res.status(500).json({ error: true, message: 'Server error fetching medications' });
  }
});

/**
 * @route   POST /api/medications
 * @desc    Add a new medication
 * @access  Private
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, dosage, frequency, timeOfDay, startDate, endDate, instructions } = req.body;

    if (!name || !dosage || !frequency || !timeOfDay) {
      return res.status(400).json({ error: true, message: 'Please provide all required fields' });
    }

    const medication = new Medication({
      userId: req.user._id,
      name,
      dosage,
      frequency,
      timeOfDay,
      startDate: startDate || Date.now(),
      endDate: endDate || null,
      instructions: instructions || ''
    });

    await medication.save();
    res.status(201).json({ success: true, medication });
  } catch (error) {
    console.error('Error adding medication:', error);
    res.status(500).json({ error: true, message: 'Server error adding medication' });
  }
});

/**
 * @route   GET /api/medications/:id
 * @desc    Get a specific medication
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ error: true, message: 'Medication not found' });
    }
    
    // Check if medication belongs to user
    if (medication.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: true, message: 'Not authorized' });
    }
    
    res.json(medication);
  } catch (error) {
    console.error('Error fetching medication:', error);
    res.status(500).json({ error: true, message: 'Server error fetching medication' });
  }
});

/**
 * @route   PUT /api/medications/:id
 * @desc    Update a medication
 * @access  Private
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { name, dosage, frequency, timeOfDay, startDate, endDate, instructions, active } = req.body;
    
    // Find the medication
    let medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ error: true, message: 'Medication not found' });
    }
    
    // Check if medication belongs to user
    if (medication.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: true, message: 'Not authorized' });
    }
    
    // Update fields
    medication.name = name || medication.name;
    medication.dosage = dosage || medication.dosage;
    medication.frequency = frequency || medication.frequency;
    medication.timeOfDay = timeOfDay || medication.timeOfDay;
    medication.startDate = startDate || medication.startDate;
    medication.endDate = endDate || medication.endDate;
    medication.instructions = instructions !== undefined ? instructions : medication.instructions;
    medication.active = active !== undefined ? active : medication.active;
    
    await medication.save();
    res.json({ success: true, medication });
  } catch (error) {
    console.error('Error updating medication:', error);
    res.status(500).json({ error: true, message: 'Server error updating medication' });
  }
});

/**
 * @route   DELETE /api/medications/:id
 * @desc    Delete a medication
 * @access  Private
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ error: true, message: 'Medication not found' });
    }
    
    // Check if medication belongs to user
    if (medication.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: true, message: 'Not authorized' });
    }
    
    await medication.deleteOne();
    res.json({ success: true, message: 'Medication removed' });
  } catch (error) {
    console.error('Error deleting medication:', error);
    res.status(500).json({ error: true, message: 'Server error deleting medication' });
  }
});

module.exports = router;
