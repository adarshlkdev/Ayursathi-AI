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
    content: `You are AyurSathi, a medical AI assistant with expertise in both modern medicine and traditional Indian Ayurveda. You analyze symptoms and provide possible conditions, considering both contemporary medical knowledge and traditional Indian health principles. DO NOT provide definitive diagnoses, but rather possibilities based on the information.

PATIENT INFORMATION:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Medical History: ${userData.medicalHistory.join(', ')}
- Reported Symptoms: ${userData.symptoms.join(', ')}
- Additional Information: ${userData.additionalInfo}

Consider the Indian context including:
- Common diseases prevalent in India (dengue, malaria, typhoid, seasonal infections)
- Monsoon and seasonal health issues
- Indian lifestyle factors (diet, climate, stress)
- Traditional Ayurvedic understanding of doshas and imbalances

Analyze the above information and respond ONLY in the following JSON format:
{
  "possibleConditions": [
    {
      "condition": "Condition name",
      "probability": 0.XX, // number between 0 and 1
      "severity": "low|moderate|high|severe|emergency",
      "description": "Brief description considering both modern and traditional perspectives",
      "ayurvedicPerspective": "Brief Ayurvedic understanding if applicable"
    }
  ],
  "nextSteps": {
    "recommendedTests": ["Test 1", "Test 2"],
    "doctorVisitRecommended": true|false,
    "urgencyLevel": "routine|soon|urgent|emergency",
    "generalAdvice": "Advice considering Indian healthcare context",
    "immediateReliefTips": ["Natural remedy 1", "Traditional practice 2"]
  },
  "disclaimer": "This is for informational purposes only. Always consult with qualified healthcare professionals. Traditional remedies should complement, not replace, modern medical treatment."
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
    content: `You are AyurSathi, a nutritional AI assistant with expertise in Indian cuisine and Ayurvedic nutrition. Create diet plans that incorporate traditional Indian foods, regional specialties, and Ayurvedic principles alongside modern nutritional science.

PATIENT INFORMATION:
- Age: ${diagnosisData.userInput.age}
- Gender: ${diagnosisData.userInput.gender}
- Medical History: ${diagnosisData.userInput.history.join(', ')}
- Possible Conditions: ${diagnosisData.results.possibleConditions.map(c => c.condition).join(', ')}

Focus on Indian dietary preferences and include:
- Traditional Indian foods and cooking methods
- Regional specialties (North Indian, South Indian, etc.)
- Ayurvedic food principles (hot/cold foods, digestive fire - Agni)
- Seasonal eating according to Indian climate
- Easily available ingredients in Indian markets
- Home remedies and traditional preparations

Create a recovery-focused diet plan. Respond ONLY in the following JSON format:
{
  "summary": "Brief summary incorporating Ayurvedic and modern nutritional principles",
  "ayurvedicApproach": "Dosha balancing recommendations and traditional wisdom",
  "recommendations": [
    "Include traditional Indian foods like daliya khichdi for easy digestion",
    "Follow Ayurvedic principles specific to condition",
    "Consider seasonal Indian fruits and vegetables"
  ],
  "foods": {
    "recommended": [
      "Daliya khichdi with vegetables",
      "Turmeric milk (haldi doodh)",
      "Fresh coconut water",
      "Moong dal soup",
      "Jeera water",
      "Traditional Indian foods relevant to condition"
    ],
    "moderate": ["Moderately consume these Indian foods"],
    "avoid": ["Avoid these during recovery - consider Indian dietary habits"]
  },
  "mealPlan": {
    "breakfast": [
      "Daliya porridge with jaggery and dry fruits",
      "Poha with vegetables and curry leaves",
      "Oats upma with Indian spices"
    ],
    "lunch": [
      "Khichdi with dal and vegetables",
      "Brown rice with sambhar and rasam",
      "Roti with seasonal sabzi and dal"
    ],
    "dinner": [
      "Light khichdi with ghee",
      "Vegetable soup with Indian herbs",
      "Moong dal with steamed rice"
    ],
    "snacks": [
      "Herbal tea with ginger and tulsi",
      "Roasted makhana (fox nuts)",
      "Fresh seasonal fruits"
    ]
  },
  "traditionalRemedies": {
    "herbalTeas": ["Ginger-tulsi tea", "Ajwain water", "Fennel tea"],
    "spicesForHealing": ["Turmeric", "Ginger", "Cumin", "Coriander"],
    "homePreparations": ["Kadha recipes", "Traditional broths"]
  },
  "hydration": "Drink warm water, herbal teas, coconut water, and traditional drinks like nimbu paani",
  "seasonalAdvice": "Adjust diet according to Indian seasons - include cooling foods in summer, warming foods in winter",
  "disclaimer": "This combines traditional Ayurvedic wisdom with modern nutrition. Consult healthcare providers for serious conditions."
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
    content: `You are AyurSathi, a medical AI assistant with expertise in both modern healthcare and traditional Indian healing practices. Provide culturally relevant next steps that consider the Indian healthcare context, traditional remedies, and lifestyle factors.

PATIENT INFORMATION:
- Age: ${diagnosisData.userInput.age}
- Gender: ${diagnosisData.userInput.gender}
- Medical History: ${diagnosisData.userInput.history.join(', ')}
- Reported Symptoms: ${diagnosisData.symptoms.join(', ')}
- Possible Conditions: ${diagnosisData.results.possibleConditions.map(c => c.condition).join(', ')}
- Severity Assessment: ${diagnosisData.results.possibleConditions.map(c => c.severity).join(', ')}

Consider Indian context including:
- Healthcare accessibility in India
- Traditional Ayurvedic practices
- Common home remedies used in Indian households
- Seasonal health considerations
- Family and community support systems
- Cost-effective treatment options

Provide detailed next steps recommendations in the following JSON format:
{
  "homeCare": [
    "Rest in a well-ventilated room with proper air circulation",
    "Apply traditional remedies like turmeric paste for wounds",
    "Practice pranayama (breathing exercises) for stress relief",
    "Use steam inhalation with ajwain or mint leaves"
  ],
  "traditionalRemedies": {
    "ayurvedicPractices": ["Oil pulling with sesame oil", "Abhyanga (self-massage)", "Yoga asanas suitable for condition"],
    "herbalSupplements": ["Ashwagandha for stress", "Triphala for digestion", "Giloy for immunity"],
    "homePreparations": ["Kadha with tulsi, ginger, and black pepper", "Turmeric milk before bed", "Jeera-dhania water"]
  },
  "monitoring": {
    "symptoms": ["Track fever patterns", "Monitor appetite and digestion", "Note energy levels"],
    "vitals": ["Check body temperature twice daily", "Monitor pulse if applicable"],
    "warningSignsToWatch": ["Persistent high fever", "Difficulty breathing", "Severe dehydration", "Unusual fatigue"]
  },
  "medicalConsultation": {
    "recommended": true|false,
    "timeframe": "immediate|24 hours|within a week|routine",
    "specialistType": ["MBBS Doctor", "Ayurvedic Practitioner", "Specific specialist if needed"],
    "costsConsiderations": "Consider government hospitals for affordable care, AYUSH practitioners for traditional treatment"
  },
  "medicationConsiderations": "Follow prescribed allopathic medicines alongside traditional remedies with doctor approval",
  "lifestyleModifications": [
    "Follow daily routine (Dinacharya) as per Ayurveda",
    "Include meditation and yoga in daily routine",
    "Maintain proper sleep schedule (early to bed, early to rise)",
    "Stay hydrated with warm water and herbal teas"
  ],
  "seasonalAdvice": "Adjust lifestyle according to current season - include cooling practices in summer, warming practices in winter",
  "familySupport": "Involve family in care routine, prepare traditional healing foods at home",
  "preventiveMeasures": [
    "Boost immunity with traditional ingredients like ginger, tulsi, and neem",
    "Practice good hygiene especially during monsoon season",
    "Include immunity-boosting spices in daily cooking"
  ],
  "whenToSeekEmergencyCare": "Visit nearest hospital immediately if experiencing severe symptoms like high fever (>103°F), difficulty breathing, chest pain, or loss of consciousness",
  "disclaimer": "This combines modern medical advice with traditional Indian healing practices. Always prioritize urgent medical care when needed. Traditional remedies should complement, not replace, necessary medical treatment."
}
`
  };
};

/**
 * Creates an Ayurvedic lifestyle recommendations prompt
 * @param {Object} userData - User data for personalized recommendations
 * @returns {Object} Prompt object for Ayurvedic guidance
 */
const createAyurvedicLifestylePrompt = (userData) => {
  return {
    role: "system",
    content: `You are AyurSathi, an Ayurvedic wellness advisor with deep knowledge of traditional Indian health practices, yoga, and holistic lifestyle guidance. Provide personalized recommendations based on Ayurvedic principles.

USER INFORMATION:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Current Health Concerns: ${userData.healthConcerns || 'General wellness'}
- Lifestyle: ${userData.lifestyle || 'Not specified'}
- Season: ${userData.season || 'Current season'}

Provide comprehensive Ayurvedic lifestyle guidance in the following JSON format:
{
  "doshaAnalysis": {
    "dominantDosha": "Vata|Pitta|Kapha",
    "imbalanceIndications": "Signs of dosha imbalance based on symptoms",
    "balancingApproach": "How to balance the predominant dosha"
  },
  "dinacharya": {
    "wakeUpTime": "Ideal wake-up time according to Ayurveda",
    "morningRoutine": [
      "Oil pulling with sesame/coconut oil",
      "Tongue scraping with copper scraper",
      "Warm water with lemon and honey",
      "Pranayama and meditation"
    ],
    "eveningRoutine": [
      "Light dinner before sunset",
      "Abhyanga (self-massage) with warm oil",
      "Herbal tea preparation",
      "Early bedtime routine"
    ]
  },
  "seasonalGuidance": {
    "currentSeasonAdvice": "Specific guidance for current Indian season",
    "dietaryAdjustments": "Seasonal food recommendations",
    "lifestyleChanges": "Activities to align with seasonal energy"
  },
  "yogaAndExercise": {
    "recommendedAsanas": ["Yoga poses suitable for dosha type", "Pranayama techniques"],
    "exerciseIntensity": "Light|Moderate|Vigorous based on constitution",
    "bestTimeToExercise": "Optimal time for physical activity"
  },
  "mindfulnessPractices": {
    "meditation": "Type of meditation suitable for user",
    "stressManagement": "Traditional Indian stress-relief practices",
    "spiritualPractices": "Optional spiritual wellness suggestions"
  },
  "traditionalWisdom": {
    "ancientSayings": "Relevant Sanskrit or traditional sayings about health",
    "naturalHealing": "Traditional Indian healing practices",
    "communityWellness": "Importance of family and community in healing"
  },
  "disclaimer": "This guidance is based on traditional Ayurvedic principles. For serious health conditions, please consult qualified healthcare practitioners."
}
`
  };
};

/**
 * Creates common Indian home remedies recommendations
 * @param {string} symptomCategory - Category of symptoms (fever, cold, digestive, etc.)
 * @returns {Object} Traditional Indian remedies
 */
const getTraditionalIndianRemedies = (symptomCategory) => {
  const remedies = {
    fever: {
      name: "बुखार के लिए घरेलू उपचार (Fever Home Remedies)",
      remedies: [
        "Tulsi and ginger kadha - Boil 10-15 tulsi leaves with ginger and black pepper",
        "Turmeric milk with a pinch of black pepper before bedtime",
        "Cool forehead compress with wet cloth",
        "Drink plenty of coconut water and ORS",
        "Giloy juice with honey for immunity boost",
        "Coriander seeds water to reduce body heat"
      ],
      spices: ["Tulsi", "Ginger", "Black pepper", "Turmeric", "Giloy", "Coriander"],
      avoidance: ["Heavy meals", "Cold drinks", "Oily foods", "Dairy products"]
    },
    cold: {
      name: "सर्दी-जुकाम के उपचार (Cold and Cough Remedies)",
      remedies: [
        "Steam inhalation with ajwain or mint leaves",
        "Honey with ginger juice and tulsi",
        "Warm salt water gargling",
        "Jeera-dhania-saunf tea",
        "Mulethi (licorice) tea for throat relief",
        "Clove and cardamom with warm water"
      ],
      spices: ["Ajwain", "Honey", "Ginger", "Tulsi", "Mulethi", "Clove"],
      avoidance: ["Cold foods", "Dairy", "Fried items", "Ice cream"]
    },
    digestive: {
      name: "पाचन संबंधी समस्याओं का इलाज (Digestive Issues Treatment)",
      remedies: [
        "Jeera water on empty stomach",
        "Hing with warm water for gas relief",
        "Buttermilk with roasted cumin powder",
        "Light khichdi with ghee and hing",
        "Fennel seeds after meals",
        "Ginger-lemon tea before meals"
      ],
      spices: ["Jeera", "Hing", "Ajwain", "Dhania", "Saunf", "Ginger"],
      avoidance: ["Heavy meals", "Spicy food", "Cold drinks", "Late night eating"]
    },
    stress: {
      name: "तनाव और चिंता का इलाज (Stress and Anxiety Relief)",
      remedies: [
        "Ashwagandha powder with warm milk",
        "Brahmi tea or powder",
        "Pranayama and meditation",
        "Chamomile tea with honey",
        "Jatamansi powder for better sleep",
        "Oil massage with sesame or coconut oil"
      ],
      spices: ["Ashwagandha", "Brahmi", "Jatamansi", "Shankhpushpi"],
      avoidance: ["Caffeine", "Heavy meals", "Late nights", "Excessive screen time"]
    },
    respiratory: {
      name: "श्वसन संबंधी समस्याओं का इलाज (Respiratory Issues Treatment)",
      remedies: [
        "Steam inhalation with eucalyptus or mint",
        "Honey with black pepper for cough",
        "Turmeric milk with ghee for chest congestion",
        "Ginger-tulsi-honey syrup",
        "Warm mustard oil massage on chest",
        "Breathing exercises (Pranayama)"
      ],
      spices: ["Honey", "Black pepper", "Turmeric", "Ginger", "Tulsi", "Eucalyptus"],
      avoidance: ["Cold beverages", "Smoking", "Dusty environments", "Air pollution exposure"]
    },
    skin: {
      name: "त्वचा संबंधी समस्याओं का इलाज (Skin Issues Treatment)",
      remedies: [
        "Neem paste for infections and acne",
        "Turmeric with rose water for glowing skin",
        "Aloe vera gel for burns and rashes",
        "Sandalwood powder with milk for cooling",
        "Coconut oil for dry skin",
        "Besan (gram flour) face pack for oily skin"
      ],
      spices: ["Neem", "Turmeric", "Sandalwood", "Rose water", "Aloe vera"],
      avoidance: ["Harsh chemicals", "Excessive sun exposure", "Spicy foods", "Processed foods"]
    },
    musculoskeletal: {
      name: "मांसपेशियों और हड्डियों की समस्याओं का इलाज (Muscle and Bone Issues Treatment)",
      remedies: [
        "Warm sesame oil massage for joint pain",
        "Turmeric milk for inflammation",
        "Ginger tea for muscle soreness",
        "Hot water compress for stiffness",
        "Fenugreek seeds soaked overnight for joint health",
        "Yoga and gentle stretching exercises"
      ],
      spices: ["Sesame oil", "Turmeric", "Ginger", "Fenugreek", "Ajwain"],
      avoidance: ["Cold weather exposure", "Prolonged sitting", "Heavy lifting", "Processed foods"]
    },
    headache: {
      name: "सिरदर्द का इलाज (Headache Treatment)",
      remedies: [
        "Peppermint oil on temples",
        "Ginger tea with honey",
        "Cold compress on forehead",
        "Cinnamon paste on forehead",
        "Clove oil for tension headaches",
        "Adequate hydration and rest"
      ],
      spices: ["Peppermint", "Ginger", "Cinnamon", "Clove"],
      avoidance: ["Bright lights", "Loud noises", "Stress", "Dehydration"]
    },
    womens_health: {
      name: "महिलाओं के स्वास्थ्य संबंधी समस्याओं का इलाज (Women's Health Issues Treatment)",
      remedies: [
        "Fenugreek seeds for menstrual irregularities",
        "Sesame seeds for hormone balance",
        "Shatavari powder with milk",
        "Warm compress for menstrual cramps",
        "Carom seeds (ajwain) water for period pain",
        "Iron-rich foods like dates and jaggery"
      ],
      spices: ["Fenugreek", "Sesame seeds", "Shatavari", "Ajwain", "Dates"],
      avoidance: ["Cold foods during periods", "Excessive physical exertion", "Stress", "Junk food"]
    }  };

  return remedies[symptomCategory] || {
    name: "सामान्य घरेलू उपचार (General Home Remedies)",
    remedies: [
      "Drink warm water throughout the day",
      "Include turmeric in daily cooking",
      "Practice deep breathing exercises",
      "Maintain regular sleep schedule",
      "Eat fresh, seasonal fruits and vegetables",
      "Regular physical activity and yoga"
    ],
    spices: ["Turmeric", "Ginger", "Cumin", "Coriander", "Tulsi"],
    avoidance: ["Processed foods", "Late meals", "Stress", "Irregular sleep"]
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

/**
 * Function to generate Ayurvedic lifestyle recommendations
 * @param {Object} userData User data for personalized recommendations
 * @returns {Promise<Object>} Structured Ayurvedic guidance
 */
async function generateAyurvedicGuidance(userData) {
  try {
    const prompt = createAyurvedicLifestylePrompt(userData);
    const response = await getGeminiResponse(prompt);
    
    // Parse JSON from the response
    const jsonStart = response.indexOf('{');
    const jsonEnd = response.lastIndexOf('}') + 1;
    const jsonString = response.substring(jsonStart, jsonEnd);
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating Ayurvedic guidance:', error);
    throw error;
  }
}

module.exports = {
  predictDisease,
  generateDietPlan,
  generateNextSteps,
  generateAyurvedicGuidance,
  getTraditionalIndianRemedies
};
