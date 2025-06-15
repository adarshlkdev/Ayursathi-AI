// filepath: client/src/components/SymptomsInput.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input, Button, FormLabel } from './ui';

// Common symptoms for quick selection
const commonSymptoms = [
  'Fever', 'Cough', 'Headache', 'Sore Throat', 'Fatigue',
  'Shortness of Breath', 'Body Aches', 'Dizziness', 'Nausea',
  'Diarrhea', 'Chest Pain', 'Abdominal Pain', 'Back Pain'
];

const SymptomsInput = ({ symptoms, setSymptoms }) => {
  const [symptomInput, setSymptomInput] = useState('');

  const addSymptom = () => {
    if (symptomInput.trim() !== '' && !symptoms.includes(symptomInput.trim())) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput('');
    }
  };

  const removeSymptom = (index) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const selectCommonSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  return (
    <div>
      <FormLabel required>
        What symptoms are you experiencing?
      </FormLabel>
      
      <div className="flex space-x-2 mb-3">
        <Input
          type="text"
          placeholder="Enter symptom"
          value={symptomInput}
          onChange={(e) => setSymptomInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSymptom();
            }
          }}
        />
        <Button 
          type="button" 
          onClick={addSymptom}
          className="whitespace-nowrap"
        >
          Add
        </Button>
      </div>
      
      {/* Common symptoms quick selection */}
      <div className="mt-2">
        <p className="text-sm text-gray-600 mb-2">Common symptoms:</p>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((symptom) => (
            <button
              key={symptom}
              type="button"
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                symptoms.includes(symptom)
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => selectCommonSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>
      
      {/* Symptoms list */}
      {symptoms.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Your symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className="bg-teal-100 pl-3 pr-2 py-1 rounded-full flex items-center"
              >
                <span className="text-sm text-teal-800">{symptom}</span>
                <button
                  type="button"
                  className="ml-1 text-teal-600 hover:text-teal-800 p-1"
                  onClick={() => removeSymptom(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomsInput;
