const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hindiName: { type: String }, // Indian language name for cultural relevance
  associatedConditions: [String],
  bodySystem: { type: String }, // e.g., "respiratory", "digestive", etc.
  commonlyCoOccursWith: [String],
  severity: { type: Number, min: 1, max: 10 },
  description: String,
  
  // Indian-specific fields
  ayurvedicView: { type: String }, // Dosha perspective
  homeRemedies: [String], // Traditional Indian remedies
  commonInSeason: [String], // Seasons when this symptom is common
  urgencyLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  lifestyle: [String], // Lifestyle recommendations
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
SymptomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Symptom', SymptomSchema);
