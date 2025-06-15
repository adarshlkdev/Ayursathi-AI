// filepath: client/src/components/MedicalHistoryInput.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input, Button, FormLabel } from './ui';

// Common medical conditions for quick selection
const commonConditions = [
  'Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Obesity', 
  'Thyroid Disorder', 'Arthritis', 'Depression', 'Anxiety', 'Allergies'
];

const MedicalHistoryInput = ({ conditions, setConditions }) => {
  const [conditionInput, setConditionInput] = useState('');

  const addCondition = () => {
    if (conditionInput.trim() !== '' && !conditions.includes(conditionInput.trim())) {
      setConditions([...conditions, conditionInput.trim()]);
      setConditionInput('');
    }
  };

  const removeCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const selectCommonCondition = (condition) => {
    if (!conditions.includes(condition)) {
      setConditions([...conditions, condition]);
    }
  };

  return (
    <div>
      <FormLabel>
        Medical History
      </FormLabel>
      
      <div className="flex space-x-2 mb-3">
        <Input
          type="text"
          placeholder="e.g., Diabetes, Hypertension"
          value={conditionInput}
          onChange={(e) => setConditionInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCondition();
            }
          }}
        />
        <Button 
          type="button" 
          onClick={addCondition}
          className="whitespace-nowrap"
        >
          Add
        </Button>
      </div>
      
      {/* Common conditions quick selection */}
      <div className="mt-2">
        <p className="text-sm text-gray-600 mb-2">Common conditions:</p>
        <div className="flex flex-wrap gap-2">
          {commonConditions.map((condition) => (
            <button
              key={condition}
              type="button"
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                conditions.includes(condition)
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => selectCommonCondition(condition)}
            >
              {condition}
            </button>
          ))}
        </div>
      </div>
      
      {/* Conditions list */}
      {conditions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Your medical history:</p>
          <div className="flex flex-wrap gap-2">
            {conditions.map((condition, index) => (
              <div
                key={index}
                className="bg-teal-100 pl-3 pr-2 py-1 rounded-full flex items-center"
              >
                <span className="text-sm text-teal-800">{condition}</span>
                <button
                  type="button"
                  className="ml-1 text-teal-600 hover:text-teal-800 p-1"
                  onClick={() => removeCondition(index)}
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

export default MedicalHistoryInput;
