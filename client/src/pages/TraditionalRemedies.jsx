import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Button, Alert } from '../components/ui';
import { Leaf, Thermometer, Wind, Heart, Brain, Droplets, Bone, User, Activity } from 'lucide-react';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const TraditionalRemedies = () => {
  const [selectedCategory, setSelectedCategory] = useState('fever');
  const [remedies, setRemedies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const categories = [
    { 
      id: 'fever', 
      name: 'Fever', 
      hindiName: 'बुखार', 
      icon: <Thermometer className="h-6 w-6" />,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    { 
      id: 'cold', 
      name: 'Cold & Cough', 
      hindiName: 'सर्दी-जुकाम', 
      icon: <Wind className="h-6 w-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    { 
      id: 'digestive', 
      name: 'Digestive Issues', 
      hindiName: 'पाचन समस्याएं', 
      icon: <Heart className="h-6 w-6" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    { 
      id: 'stress', 
      name: 'Stress & Anxiety', 
      hindiName: 'तनाव और चिंता', 
      icon: <Brain className="h-6 w-6" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    { 
      id: 'respiratory', 
      name: 'Respiratory Issues', 
      hindiName: 'श्वसन संबंधी', 
      icon: <Wind className="h-6 w-6" />,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200'
    },
    { 
      id: 'skin', 
      name: 'Skin Problems', 
      hindiName: 'त्वचा संबंधी', 
      icon: <Droplets className="h-6 w-6" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    { 
      id: 'musculoskeletal', 
      name: 'Joint & Muscle', 
      hindiName: 'जोड़ों और मांसपेशी', 
      icon: <Bone className="h-6 w-6" />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    { 
      id: 'headache', 
      name: 'Headache', 
      hindiName: 'सिरदर्द', 
      icon: <Brain className="h-6 w-6" />,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    { 
      id: 'womens_health', 
      name: "Women's Health", 
      hindiName: 'महिलाओं का स्वास्थ्य', 
      icon: <User className="h-6 w-6" />,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'    }
  ]; 
  
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const fetchRemedies = async (category) => {
    setLoading(true);
    setError('');
    setRemedies(null); // Clear previous remedies

    try {
      const response = await fetch(`${API_URL}/diagnose/traditional-remedies/${category}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success && data.remedies) {
        setRemedies(data.remedies);
      } else {
        setError(data.message || 'Failed to fetch remedies');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Use simplified fallback data when API fails
      const fallbackData = getFallbackRemedies(category);
      if (fallbackData) {
        setRemedies(fallbackData);
        setError('Using offline data - API connection issue');
      } else {
        setError(`Network error: ${err.message}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback remedy data
  const getFallbackRemedies = (category) => {
    const fallbackData = {
      fever: {
        name: "बुखार के लिए घरेलू उपचार (Fever Home Remedies)",
        remedies: [
          "Tulsi and ginger kadha - Boil 10-15 tulsi leaves with ginger and black pepper",
          "Turmeric milk with a pinch of black pepper before bedtime",
          "Cool forehead compress with wet cloth",
          "Drink plenty of coconut water and ORS"
        ],
        spices: ["Tulsi", "Ginger", "Black pepper", "Turmeric"],
        avoidance: ["Heavy meals", "Cold drinks", "Oily foods"]
      },
      cold: {
        name: "सर्दी-जुकाम के उपचार (Cold and Cough Remedies)",
        remedies: [
          "Steam inhalation with ajwain or mint leaves",
          "Honey with ginger juice and tulsi",
          "Warm salt water gargling",
          "Jeera-dhania-saunf tea"
        ],
        spices: ["Ajwain", "Honey", "Ginger", "Tulsi"],
        avoidance: ["Cold foods", "Dairy", "Fried items"]
      },
      digestive: {
        name: "पाचन संबंधी समस्याओं का इलाज (Digestive Issues Treatment)",
        remedies: [
          "Jeera water on empty stomach",
          "Hing with warm water for gas relief",
          "Buttermilk with roasted cumin powder",
          "Light khichdi with ghee and hing"
        ],
        spices: ["Jeera", "Hing", "Ajwain", "Dhania"],
        avoidance: ["Heavy meals", "Spicy food", "Cold drinks"]
      },
      stress: {
        name: "तनाव और चिंता का इलाज (Stress and Anxiety Relief)",
        remedies: [
          "Ashwagandha powder with warm milk",
          "Brahmi tea or powder",
          "Pranayama and meditation",
          "Chamomile tea with honey"
        ],
        spices: ["Ashwagandha", "Brahmi", "Jatamansi"],
        avoidance: ["Caffeine", "Heavy meals", "Late nights"]
      },
      respiratory: {
        name: "श्वसन संबंधी समस्याओं का इलाज (Respiratory Issues Treatment)",
        remedies: [
          "Steam inhalation with eucalyptus or mint",
          "Honey with black pepper for cough",
          "Turmeric milk with ghee for chest congestion",
          "Ginger-tulsi-honey syrup"
        ],
        spices: ["Honey", "Black pepper", "Turmeric", "Ginger"],
        avoidance: ["Cold beverages", "Smoking", "Dusty environments"]
      },
      skin: {
        name: "त्वचा संबंधी समस्याओं का इलाज (Skin Issues Treatment)",
        remedies: [
          "Neem paste for infections and acne",
          "Turmeric with rose water for glowing skin",
          "Aloe vera gel for burns and rashes",
          "Sandalwood powder with milk for cooling"
        ],
        spices: ["Neem", "Turmeric", "Sandalwood", "Aloe vera"],
        avoidance: ["Harsh chemicals", "Excessive sun exposure", "Spicy foods"]
      },
      musculoskeletal: {
        name: "मांसपेशियों और हड्डियों की समस्याओं का इलाज (Muscle and Bone Issues Treatment)",
        remedies: [
          "Warm sesame oil massage for joint pain",
          "Turmeric milk for inflammation",
          "Ginger tea for muscle soreness",
          "Hot water compress for stiffness"
        ],
        spices: ["Sesame oil", "Turmeric", "Ginger", "Fenugreek"],
        avoidance: ["Cold weather exposure", "Prolonged sitting", "Heavy lifting"]
      },
      headache: {
        name: "सिरदर्द का इलाज (Headache Treatment)",
        remedies: [
          "Peppermint oil on temples",
          "Ginger tea with honey",
          "Cold compress on forehead",
          "Cinnamon paste on forehead"
        ],
        spices: ["Peppermint", "Ginger", "Cinnamon", "Clove"],
        avoidance: ["Bright lights", "Loud noises", "Stress"]
      },
      womens_health: {
        name: "महिलाओं के स्वास्थ्य संबंधी समस्याओं का इलाज (Women's Health Issues Treatment)",
        remedies: [
          "Fenugreek seeds for menstrual irregularities",
          "Sesame seeds for hormone balance",
          "Shatavari powder with milk",
          "Warm compress for menstrual cramps"
        ],
        spices: ["Fenugreek", "Sesame seeds", "Shatavari", "Ajwain"],
        avoidance: ["Cold foods during periods", "Excessive physical exertion", "Stress"]
      }
    };
    
    return fallbackData[category];
  };  useEffect(() => {
    fetchRemedies(selectedCategory);
  }, [selectedCategory]);

  // Additional useEffect to monitor selectedCategory changes
  useEffect(() => {
  }, [selectedCategory]);

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-emerald-600 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              पारंपरिक घरेलू उपचार
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Traditional Indian Home Remedies
          </p>          <p className="text-sm text-emerald-600 mt-2">
            Time-tested natural healing wisdom | समय की कसौटी पर खरे प्राकृतिक उपचार
          </p>
        </div>        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCategory === category.id 
                  ? `${category.bgColor} ${category.borderColor} border-2 shadow-lg` 
                  : 'border border-gray-200 hover:border-emerald-300'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCategoryChange(category.id);
              }}
            >
              <CardContent className="p-4 text-center">
                <div className={`flex justify-center mb-2 ${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {category.hindiName}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading remedies...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Remedies Content */}
        {remedies && !loading && (
          <div className="space-y-6">
            {/* Title Card */}
            <Card className={`${currentCategory?.borderColor} border-2`}>
              <CardHeader className={`${currentCategory?.bgColor} ${currentCategory?.borderColor} border-b`}>
                <div className="flex items-center">
                  <div className={currentCategory?.color}>
                    {currentCategory?.icon}
                  </div>
                  <div className="ml-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {remedies.name}
                    </h2>
                    <p className="text-gray-600">
                      {currentCategory?.name} - Natural Healing Solutions
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Home Remedies */}
            <Card className="border-emerald-200">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                <h3 className="text-xl font-semibold">घरेलू उपचार | Home Remedies</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {remedies.remedies?.map((remedy, index) => (
                    <div key={index} className="flex items-start p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{remedy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Healing Spices */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <h3 className="text-lg font-semibold">उपयोगी मसाले | Healing Spices</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {remedies.spices?.map((spice, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 border border-amber-300"
                      >
                        {spice}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                  <h3 className="text-lg font-semibold">परहेज़ | What to Avoid</h3>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {remedies.avoidance?.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preparation Tips */}
            <Card className="border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <h3 className="text-lg font-semibold">तैयारी की विधि | Preparation Tips</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                      Best Time to Take
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Morning: On empty stomach for better absorption</li>
                      <li>• Evening: Before meals for digestive remedies</li>
                      <li>• Night: Before bed for calming effects</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Heart className="h-5 w-5 text-red-500 mr-2" />
                      General Guidelines
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Use fresh ingredients when possible</li>
                      <li>• Start with small quantities</li>
                      <li>• Maintain consistency for best results</li>
                      <li>• Consult doctor for serious conditions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Advice */}
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <h3 className="text-lg font-semibold">मौसमी सलाह | Seasonal Advice</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Summer (गर्मी)</h4>
                    <p className="text-sm text-yellow-700">
                      Focus on cooling remedies. Increase fluid intake.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Monsoon (बारिश)</h4>
                    <p className="text-sm text-green-700">
                      Boost immunity. Use warming spices.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Winter (सर्दी)</h4>
                    <p className="text-sm text-blue-700">
                      Warm preparations. Include healthy fats.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Alert className="bg-yellow-50 border-yellow-200">
              <div className="text-yellow-800">
                <strong>Important:</strong> These are traditional home remedies for informational purposes. 
                For serious health conditions, always consult with qualified healthcare providers. 
                Traditional remedies should complement, not replace, professional medical treatment.
              </div>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraditionalRemedies;
