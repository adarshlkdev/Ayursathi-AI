const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Generative AI API with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Creates a disease prediction prompt for the AI model
 * @param {Object} userData - User symptom data
 * @returns {Object} Prompt object
 */
const createDiseasePredictionPrompt = (userData) => {
  return {
    role: "system",
    content: `You are a medical AI assistant trained to analyze symptoms and provide possible conditions, severity assessments, and next steps. DO NOT provide definitive diagnoses, but rather possibilities based on the information.

PATIENT INFORMATION:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Medical History: ${userData.medicalHistory.join(', ')}
- Reported Symptoms: ${userData.symptoms.join(', ')}
- Additional Information: ${userData.additionalInfo}

Analyze the above information and respond ONLY in the following JSON format:
{
  "possibleConditions": [
    {
      "condition": "Condition name",
      "probability": 0.XX, // number between 0 and 1
      "severity": "low|moderate|high|severe|emergency",
      "description": "Brief description of the condition"
    }
  ],
  "nextSteps": {
    "recommendedTests": ["Test 1", "Test 2"],
    "doctorVisitRecommended": true|false,
    "urgencyLevel": "routine|soon|urgent|emergency",
    "generalAdvice": "Concise advice on what to do next"
  },
  "disclaimer": "Standard medical disclaimer"
}
`
  };
};

/**
 * Creates a diet plan prompt for the AI model
 * @param {Object} diagnosisData - Previous diagnosis data
 * @returns {Object} Prompt object 
 */
const createDietPlanPrompt = (diagnosisData) => {
  return {
    role: "system",
    content: `You are a nutritional AI assistant trained to provide dietary recommendations based on medical conditions. 

PATIENT INFORMATION:
- Age: ${diagnosisData.userInput.age}
- Gender: ${diagnosisData.userInput.gender}
- Medical History: ${diagnosisData.userInput.history.join(', ')}
- Possible Conditions: ${diagnosisData.results.possibleConditions.map(c => c.condition).join(', ')}

Create a recovery-focused diet plan for someone potentially dealing with the above conditions. Respond ONLY in the following JSON format:
{
  "summary": "Brief summary of dietary approach",
  "recommendations": [
    "General recommendation 1",
    "General recommendation 2"
  ],
  "foods": {
    "recommended": ["Food 1", "Food 2", "Food 3"],
    "moderate": ["Food 1", "Food 2"],
    "avoid": ["Food 1", "Food 2"]
  },
  "mealPlan": {
    "breakfast": ["Option 1", "Option 2"],
    "lunch": ["Option 1", "Option 2"],
    "dinner": ["Option 1", "Option 2"],
    "snacks": ["Option 1", "Option 2"]
  },
  "hydration": "Hydration recommendations",
  "disclaimer": "Standard nutritional disclaimer"
}
`
  };
};

/**
 * Creates a next steps prompt for the AI model
 * @param {Object} diagnosisData - Previous diagnosis data 
 * @returns {Object} Prompt object
 */
const createNextStepsPrompt = (diagnosisData) => {
  return {
    role: "system",
    content: `You are a medical AI assistant trained to recommend next steps based on symptoms and possible conditions.

PATIENT INFORMATION:
- Age: ${diagnosisData.userInput.age}
- Gender: ${diagnosisData.userInput.gender}
- Medical History: ${diagnosisData.userInput.history.join(', ')}
- Reported Symptoms: ${diagnosisData.symptoms.join(', ')}
- Possible Conditions: ${diagnosisData.results.possibleConditions.map(c => c.condition).join(', ')}
- Severity Assessment: ${diagnosisData.results.possibleConditions.map(c => c.severity).join(', ')}

Based on this information, provide detailed next steps recommendations in the following JSON format:
{
  "homeCare": [
    "Specific home care instruction 1",
    "Specific home care instruction 2"
  ],
  "monitoring": {
    "symptoms": ["Symptom to monitor 1", "Symptom to monitor 2"],
    "vitals": ["Vital to monitor 1", "Vital to monitor 2"],
    "warningSignsToWatch": ["Warning sign 1", "Warning sign 2"]
  },
  "medicalConsultation": {
    "recommended": true|false,
    "timeframe": "immediate|24 hours|within a week|routine",
    "specialistType": ["Primary Care", "Specialist type"]
  },
  "medicationConsiderations": "General medication considerations",
  "lifestyleModifications": ["Modification 1", "Modification 2"],
  "whenToSeekEmergencyCare": "Clear instructions on when to seek emergency care",
  "disclaimer": "Standard medical disclaimer"
}
`
  };
};

/**
 * Function to get a response from Gemini API
 * @param {string} prompt The prompt to send to the model
 * @returns {Promise<string>} The model's response
 */
async function getGeminiResponse(prompt) {
  try {
    // For text-only input
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt.content }] }],
    });
    
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from AI service');
  }
}

/**
 * Function to get disease prediction from symptoms
 * @param {Object} userData User and symptom data
 * @returns {Promise<Object>} Structured diagnosis data
 */
async function predictDisease(userData) {
  try {
    const prompt = createDiseasePredictionPrompt(userData);
    const response = await getGeminiResponse(prompt);
    
    // Parse JSON from the response
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}') + 1;
    const jsonString = response.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error predicting disease:', error);
    throw error;
  }
}

/**
 * Function to generate diet plan based on diagnosis
 * @param {Object} diagnosisData Previous diagnosis data
 * @returns {Promise<Object>} Structured diet plan
 */
async function generateDietPlan(diagnosisData) {
  try {
    const prompt = createDietPlanPrompt(diagnosisData);
    const response = await getGeminiResponse(prompt);
    
    // Parse JSON from the response
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}') + 1;
    const jsonString = response.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating diet plan:', error);
    throw error;
  }
}

/**
 * Function to generate detailed next steps
 * @param {Object} diagnosisData Previous diagnosis data
 * @returns {Promise<Object>} Structured next steps
 */
async function generateNextSteps(diagnosisData) {
  try {
    const prompt = createNextStepsPrompt(diagnosisData);
    const response = await getGeminiResponse(prompt);
    
    // Parse JSON from the response
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}') + 1;
    const jsonString = response.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating next steps:', error);
    throw error;
  }
}

module.exports = {
  predictDisease,
  generateDietPlan,
  generateNextSteps
};
