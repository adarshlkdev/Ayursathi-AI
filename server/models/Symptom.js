const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  associatedConditions: [String],
  bodySystem: { type: String }, // e.g., "respiratory", "digestive", etc.
  commonlyCoOccursWith: [String],
  severity: { type: Number, min: 1, max: 10 },
  description: String
});

module.exports = mongoose.model('Symptom', SymptomSchema);
