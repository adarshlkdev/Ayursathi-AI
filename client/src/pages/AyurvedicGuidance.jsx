import { useState } from 'react';
import { Card, CardHeader, CardContent, Button, Alert } from '../components/ui';
import { Leaf, Sun, Snowflake, Cloud, Heart, Brain, Users } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const AyurvedicGuidance = () => {
  const [loading, setLoading] = useState(false);
  const [guidance, setGuidance] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    healthConcerns: '',
    lifestyle: 'modern',
    season: 'current'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/diagnose/ayurvedic-guidance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setGuidance(data.guidance);
      } else {
        setError(data.message || 'Failed to get Ayurvedic guidance');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDoshaIcon = (dosha) => {
    switch (dosha?.toLowerCase()) {
      case 'vata': return <Brain className="h-6 w-6 text-purple-500" />;
      case 'pitta': return <Sun className="h-6 w-6 text-orange-500" />;
      case 'kapha': return <Snowflake className="h-6 w-6 text-blue-500" />;
      default: return <Leaf className="h-6 w-6 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-emerald-600 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              आयुर्वेदिक मार्गदर्शन
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Personalized Ayurvedic Lifestyle Guidance
          </p>
          <p className="text-sm text-amber-600 mt-2">
            Ancient wisdom for modern wellness | प्राचीन ज्ञान, आधुनिक कल्याण
          </p>
        </div>

        {/* Input Form */}
        {!guidance && (
          <Card className="mb-8 border-amber-200">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-amber-500 text-white">
              <h2 className="text-xl font-semibold">Tell Us About Your Health Goals</h2>
              <p className="text-emerald-100">अपने स्वास्थ्य लक्ष्यों के बारे में बताएं</p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Health Concerns (वर्तमान स्वास्थ्य चिंताएं)
                  </label>
                  <textarea
                    value={formData.healthConcerns}
                    onChange={(e) => setFormData({ ...formData, healthConcerns: e.target.value })}
                    placeholder="e.g., stress, digestion issues, sleep problems, general wellness..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lifestyle (जीवनशैली)
                  </label>
                  <select
                    value={formData.lifestyle}
                    onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="modern">Modern Urban Lifestyle</option>
                    <option value="traditional">Traditional Lifestyle</option>
                    <option value="mixed">Mixed Lifestyle</option>
                    <option value="active">Very Active</option>
                    <option value="sedentary">Mostly Sedentary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Season Focus (मौसमी सलाह)
                  </label>
                  <select
                    value={formData.season}
                    onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="current">Current Season</option>
                    <option value="summer">Summer (गर्मी)</option>
                    <option value="monsoon">Monsoon (बारिश)</option>
                    <option value="winter">Winter (सर्दी)</option>
                  </select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600"
                >
                  {loading ? 'Getting Guidance...' : 'Get Ayurvedic Guidance'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Guidance Results */}
        {guidance && (
          <div className="space-y-6">
            {/* Dosha Analysis */}
            {guidance.doshaAnalysis && (
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-orange-500 text-white">
                  <div className="flex items-center">
                    {getDoshaIcon(guidance.doshaAnalysis.dominantDosha)}
                    <div className="ml-3">
                      <h2 className="text-xl font-semibold">Dosha Analysis | दोष विश्लेषण</h2>
                      <p className="text-purple-100">Your Constitutional Type</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Dominant Dosha</h3>
                      <p className="text-lg font-medium text-purple-600">
                        {guidance.doshaAnalysis.dominantDosha}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Imbalance Signs</h3>
                      <p className="text-gray-600 text-sm">
                        {guidance.doshaAnalysis.imbalanceIndications}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Balancing Approach</h3>
                      <p className="text-gray-600 text-sm">
                        {guidance.doshaAnalysis.balancingApproach}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily Routine */}
            {guidance.dinacharya && (
              <Card className="border-emerald-200">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <h2 className="text-xl font-semibold">Daily Routine | दिनचर्या</h2>
                  <p className="text-emerald-100">Dinacharya for Optimal Health</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                        Morning Routine
                      </h3>
                      <ul className="space-y-2">
                        {guidance.dinacharya.morningRoutine?.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Cloud className="h-5 w-5 text-blue-500 mr-2" />
                        Evening Routine
                      </h3>
                      <ul className="space-y-2">
                        {guidance.dinacharya.eveningRoutine?.map((item, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Yoga & Exercise */}
            {guidance.yogaAndExercise && (
              <Card className="border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <h2 className="text-xl font-semibold">Yoga & Exercise | योग और व्यायाम</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Recommended Practices</h3>
                      <ul className="space-y-2">
                        {guidance.yogaAndExercise.recommendedAsanas?.map((asana, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <Heart className="h-4 w-4 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                            {asana}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Exercise Guidelines</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Intensity:</strong> {guidance.yogaAndExercise.exerciseIntensity}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Best Time:</strong> {guidance.yogaAndExercise.bestTimeToExercise}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Traditional Wisdom */}
            {guidance.traditionalWisdom && (
              <Card className="border-amber-200">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <h2 className="text-xl font-semibold">Traditional Wisdom | पारंपरिक ज्ञान</h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {guidance.traditionalWisdom.ancientSayings && (
                      <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                        <p className="text-amber-800 italic">
                          "{guidance.traditionalWisdom.ancientSayings}"
                        </p>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Natural Healing</h3>
                        <p className="text-sm text-gray-600">
                          {guidance.traditionalWisdom.naturalHealing}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Community Wellness</h3>
                        <p className="text-sm text-gray-600">
                          {guidance.traditionalWisdom.communityWellness}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Disclaimer */}
            <Alert className="bg-yellow-50 border-yellow-200">
              <div className="text-yellow-800">
                <strong>Disclaimer:</strong> {guidance.disclaimer}
              </div>
            </Alert>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => setGuidance(null)}
                variant="outline"
                className="flex-1"
              >
                Get New Guidance
              </Button>
              <Button
                onClick={() => window.print()}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                Save Guidance
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AyurvedicGuidance;
