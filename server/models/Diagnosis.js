const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symptoms: [String],
  userInput: {
    age: Number,
    gender: String,
    history: [String],
    additionalInfo: String,
  },
  results: {
    possibleConditions: [{
      condition: String,
      probability: Number,
      severity: { type: String, enum: ['low', 'moderate', 'high', 'severe', 'emergency'] },
      description: String
    }],
    nextSteps: {
      recommendedTests: [String],
      doctorVisitRecommended: Boolean,
      urgencyLevel: { type: String, enum: ['routine', 'soon', 'urgent', 'emergency'] },
      generalAdvice: String
    },
    disclaimer: String
  },
  dietPlan: {
    summary: String,
    recommendations: [String],
    foods: {
      recommended: [String],
      moderate: [String],
      avoid: [String]
    },
    mealPlan: {
      breakfast: [String],
      lunch: [String],
      dinner: [String],
      snacks: [String]
    },
    hydration: String,
    disclaimer: String
  },
  detailedSteps: {
    homeCare: [String],
    monitoring: {
      symptoms: [String],
      vitals: [String],
      warningSignsToWatch: [String]
    },
    medicalConsultation: {
      recommended: Boolean,
      timeframe: String,
      specialistType: [String]
    },
    medicationConsiderations: String,
    lifestyleModifications: [String],
    whenToSeekEmergencyCare: String,
    disclaimer: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
