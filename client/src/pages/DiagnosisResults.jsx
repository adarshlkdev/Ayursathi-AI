import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../context/DiagnosisContext';
import { 
  AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp, 
  FileText, Activity, Utensils, ArrowRight, Calendar, Clock, 
  Stethoscope, TrendingUp, Heart, ShieldAlert, Sparkles, Leaf, Droplets, Pill,
  Users, Shield, Sun, Snowflake
} from 'lucide-react';
import { Card, CardContent, CardFooter, Button, Alert, TabView, Tab, Badge, LinkButton } from '../components/ui';

const DiagnosisResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentDiagnosis, fetchDiagnosis, loading, error } = useDiagnosis();
    const [expandedCondition, setExpandedCondition] = useState(null);
  useEffect(() => {
    const loadDiagnosis = async () => {
      try {
        await fetchDiagnosis(id);
      } catch (err) {
        console.error('Error fetching diagnosis:', err);
      }
    };

    loadDiagnosis();
    // Using fetchDiagnosis in the dependency array causes an infinite loop
    // because fetchDiagnosis is recreated on each render
  }, [id]);

  const toggleCondition = (index) => {
    if (expandedCondition === index) {
      setExpandedCondition(null);
    } else {
      setExpandedCondition(index);
    }  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading Results</h3>
          <p className="text-slate-600">Please wait while we fetch your diagnosis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
            <div className="p-4 bg-red-100 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Error Loading Results</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <LinkButton 
              to="/diagnose" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Try Again
            </LinkButton>
          </div>
        </div>
      </div>
    );
  }

  if (!currentDiagnosis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-8 text-center">
            <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <FileText className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Diagnosis Not Found</h3>
            <p className="text-slate-600 mb-6">The diagnosis you're looking for may have been removed or doesn't exist.</p>
            <Button 
              onClick={() => navigate('/diagnose')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Start New Diagnosis
            </Button>
          </div>
        </div>
      </div>
    );
  }  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">AI Health Assessment</h1>
                    <p className="text-emerald-100 mt-1">Comprehensive Analysis Results</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 opacity-80" />
                    <span className="opacity-90">
                      {new Date(currentDiagnosis.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 opacity-80" />
                    <span className="opacity-90">
                      {new Date(currentDiagnosis.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <Sparkles className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>{/* Main Content */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          <TabView 
            defaultTab={0} 
            className="bg-transparent"
            tabStyles={{
              container: "px-1 pt-1 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-200",
              tab: "px-6 py-4 font-semibold text-sm hover:bg-white/50 transition-all rounded-t-xl mx-1",
              activeTab: "bg-white text-emerald-600 shadow-sm"
            }}
          >
            <Tab label={
              <div className="flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4" />
                <span>Possible Conditions</span>
              </div>
            }>
              <div className="p-6 md:p-8">
                {currentDiagnosis.results.possibleConditions && currentDiagnosis.results.possibleConditions.length > 0 ? (
                  <div className="space-y-6">
                    {currentDiagnosis.results.possibleConditions.map((condition, index) => (
                      <div 
                        key={index} 
                        className={`border ${expandedCondition === index ? 'border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50' : 'border-slate-200 bg-white/50'} rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-200`}
                      >
                        <div 
                          className="flex items-center justify-between p-6 cursor-pointer"
                          onClick={() => toggleCondition(index)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`rounded-xl p-3 ${
                              (condition.confidence || condition.probability) > 0.7 ? 'bg-green-100' :
                              (condition.confidence || condition.probability) > 0.4 ? 'bg-yellow-100' : 'bg-red-100'
                            }`}>
                              {(condition.confidence || condition.probability) > 0.7 ? (
                                <CheckCircle2 className="text-green-600 h-6 w-6" />
                              ) : (condition.confidence || condition.probability) > 0.4 ? (
                                <AlertCircle className="text-yellow-600 h-6 w-6" />
                              ) : (
                                <XCircle className="text-red-600 h-6 w-6" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-slate-800">{condition.name || condition.condition}</h3>
                              <div className="flex items-center mt-3 space-x-3">
                                <Badge 
                                  variant={
                                    condition.severity === 'low' ? 'success' :
                                    condition.severity === 'moderate' ? 'warning' :
                                    'danger'
                                  }
                                  className="px-4 py-2 font-semibold"
                                >
                                  {condition.severity?.charAt(0).toUpperCase() + condition.severity?.slice(1)} Severity
                                </Badge>
                                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 py-2 border border-emerald-200">
                                  <span className="text-sm font-bold text-emerald-700">
                                    {Math.round((condition.confidence || condition.probability) * 100)}% Match
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {expandedCondition === index ? (
                              <ChevronUp className="h-6 w-6 text-emerald-600" />
                            ) : (
                              <ChevronDown className="h-6 w-6 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {expandedCondition === index && (
                          <div className="border-t border-emerald-200 p-6 bg-gradient-to-r from-emerald-25 to-teal-25">
                            <div className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-emerald-200 mb-4">
                              <p className="text-slate-700 leading-relaxed">{condition.description}</p>
                            </div>
                            
                            {condition.symptoms && (
                              <div className="mb-5 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100">
                                <div className="flex items-center mb-3 text-emerald-800">
                                  <Activity className="h-5 w-5 mr-2 text-emerald-600" />
                                  <h4 className="font-bold text-base">Common Symptoms</h4>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {Array.isArray(condition.symptoms) 
                                    ? condition.symptoms.map((symptom, i) => (
                                      <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-2 rounded-full text-sm font-medium border border-emerald-200">
                                        {symptom}
                                      </span>
                                    ))
                                    : <p className="text-slate-700">{condition.symptoms}</p>
                                  }
                                </div>
                              </div>
                            )}
                            
                            {condition.treatments && (
                              <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-green-200">
                                <div className="flex items-center mb-3 text-green-800">
                                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                                  <h4 className="font-bold text-base">Recommended Treatments</h4>
                                </div>
                                <p className="text-slate-700 leading-relaxed">{condition.treatments}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="p-2 bg-amber-100 rounded-lg mr-3">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-800 mb-2">Medical Disclaimer</h4>
                          <p className="text-amber-700 text-sm leading-relaxed">
                            {currentDiagnosis.results.disclaimer || "This AI analysis is based on the symptoms you provided and should not be considered a medical diagnosis. Please consult with a healthcare professional for proper diagnosis and treatment."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-slate-600" />
                    </div>
                    <p className="text-slate-600 text-lg">No conditions could be determined from your symptoms.</p>
                  </div>
                )}
              </div>
            </Tab>            <Tab label={
              <div className="flex items-center space-x-2">
                <Utensils className="h-4 w-4" />
                <span>Diet Recommendations</span>
              </div>
            }>
              <div className="p-6 md:p-8">
                {currentDiagnosis.dietPlan ? (
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                      <h3 className="text-xl font-bold text-emerald-800 mb-4">Dietary Overview</h3>
                      <p className="text-emerald-700 leading-relaxed">{currentDiagnosis.dietPlan.summary}</p>
                    </div>
                    
                    {currentDiagnosis.dietPlan.recommendations && (
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-emerald-600" />
                          Key Recommendations
                        </h3>
                        <ul className="space-y-3">
                          {currentDiagnosis.dietPlan.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-emerald-100 rounded-full mr-3 mt-1">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              </div>
                              <span className="text-slate-700 leading-relaxed">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Food Categories */}
                    <div className="grid md:grid-cols-3 gap-6">
                      {currentDiagnosis.dietPlan.foods && currentDiagnosis.dietPlan.foods.recommended && (
                        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                              <CheckCircle2 className="text-green-600 h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-green-800">Foods to Include</h3>
                          </div>
                          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <ul className="space-y-2">
                              {currentDiagnosis.dietPlan.foods.recommended.map((food, index) => (
                                <li key={index} className="flex items-center text-green-700">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {currentDiagnosis.dietPlan.foods && currentDiagnosis.dietPlan.foods.moderate && (
                        <div className="bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mr-3">
                              <AlertCircle className="text-yellow-600 h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-yellow-800">Foods in Moderation</h3>
                          </div>
                          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                            <ul className="space-y-2">
                              {currentDiagnosis.dietPlan.foods.moderate.map((food, index) => (
                                <li key={index} className="flex items-center text-yellow-700">
                                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {currentDiagnosis.dietPlan.foods && currentDiagnosis.dietPlan.foods.avoid && (
                        <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mr-3">
                              <XCircle className="text-red-600 h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-red-800">Foods to Avoid</h3>
                          </div>
                          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <ul className="space-y-2">
                              {currentDiagnosis.dietPlan.foods.avoid.map((food, index) => (
                                <li key={index} className="flex items-center text-red-700">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                  {food}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {currentDiagnosis.dietPlan.hydration && (
                      <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-200">
                        <h3 className="font-bold text-cyan-800 mb-3 flex items-center">
                          <Activity className="h-5 w-5 mr-2" />
                          Hydration Guidelines
                        </h3>
                        <p className="text-cyan-700 leading-relaxed">{currentDiagnosis.dietPlan.hydration}</p>
                      </div>                    )}

                    {/* Meal Plan */}
                    {currentDiagnosis.dietPlan.mealPlan && (
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                          Daily Meal Plan
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {currentDiagnosis.dietPlan.mealPlan.breakfast && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                              <h4 className="font-bold text-blue-800 mb-3 pb-2 border-b border-blue-200">Breakfast</h4>
                              <ul className="space-y-2">
                                {currentDiagnosis.dietPlan.mealPlan.breakfast.map((item, index) => (
                                  <li key={index} className="flex items-center text-blue-700">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {currentDiagnosis.dietPlan.mealPlan.lunch && (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                              <h4 className="font-bold text-green-800 mb-3 pb-2 border-b border-green-200">Lunch</h4>
                              <ul className="space-y-2">
                                {currentDiagnosis.dietPlan.mealPlan.lunch.map((item, index) => (
                                  <li key={index} className="flex items-center text-green-700">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {currentDiagnosis.dietPlan.mealPlan.dinner && (
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                              <h4 className="font-bold text-purple-800 mb-3 pb-2 border-b border-purple-200">Dinner</h4>
                              <ul className="space-y-2">
                                {currentDiagnosis.dietPlan.mealPlan.dinner.map((item, index) => (
                                  <li key={index} className="flex items-center text-purple-700">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {currentDiagnosis.dietPlan.mealPlan.snacks && (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                              <h4 className="font-bold text-amber-800 mb-3 pb-2 border-b border-amber-200">Snacks</h4>
                              <ul className="space-y-2">
                                {currentDiagnosis.dietPlan.mealPlan.snacks.map((item, index) => (
                                  <li key={index} className="flex items-center text-amber-700">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentDiagnosis.dietPlan.disclaimer && (
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start">
                          <div className="p-2 bg-amber-100 rounded-lg mr-3">
                            <AlertCircle className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-amber-800 mb-2">Dietary Disclaimer</h4>
                            <p className="text-amber-700 text-sm leading-relaxed">{currentDiagnosis.dietPlan.disclaimer}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Utensils className="h-8 w-8 text-slate-600" />
                    </div>
                    <p className="text-slate-600 text-lg">No diet recommendations available for this diagnosis.</p>
                  </div>
                )}
              </div>
            </Tab>            <Tab label={
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Next Steps</span>
              </div>
            }>              <div className="p-6 md:p-8">
                {currentDiagnosis.detailedSteps ? (
                  <div className="space-y-6">
                    {/* Urgency Level Card */}
                    <div className={`
                      ${currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'immediate' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200' : 
                        currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === '24 hours' ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' :
                        currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'within a week' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' :
                        'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'} 
                      border rounded-2xl p-6 shadow-sm mb-6`}>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-xl 
                          ${currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'immediate' ? 'bg-red-100' : 
                            currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === '24 hours' ? 'bg-orange-100' :
                            currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'within a week' ? 'bg-yellow-100' :
                            'bg-emerald-100'} 
                          flex items-center justify-center mr-4`}>
                          <AlertCircle className={`
                            ${currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'immediate' ? 'text-red-600' : 
                              currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === '24 hours' ? 'text-orange-600' :
                              currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'within a week' ? 'text-yellow-600' :
                              'text-emerald-600'} 
                            h-6 w-6`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-xl mb-2
                            ${currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'immediate' ? 'text-red-800' : 
                              currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === '24 hours' ? 'text-orange-800' :
                              currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'within a week' ? 'text-yellow-800' :
                              'text-emerald-800'}`}>
                            Medical Consultation Required
                          </h3>
                          <p className={`
                            ${currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'immediate' ? 'text-red-700' : 
                              currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === '24 hours' ? 'text-orange-700' :
                              currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'within a week' ? 'text-yellow-700' :
                              'text-emerald-700'} 
                            leading-relaxed`}>
                            {currentDiagnosis.results.nextSteps?.generalAdvice || 
                              `Consult a healthcare provider ${currentDiagnosis.detailedSteps.medicalConsultation?.timeframe || 'as recommended'}.`}
                          </p>
                        </div>
                        <Badge
                          variant={
                            currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === 'immediate' ? 'danger' :
                            currentDiagnosis.detailedSteps.medicalConsultation?.timeframe === '24 hours' ? 'warning' :
                            'success'
                          }
                          className="px-4 py-2 font-bold"
                        >
                          {currentDiagnosis.detailedSteps.medicalConsultation?.timeframe || 'As needed'}
                        </Badge>
                      </div>
                    </div>

                    {/* Specialist Recommendations */}
                    {currentDiagnosis.detailedSteps.medicalConsultation?.specialistType && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
                        <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                          <Stethoscope className="h-5 w-5 mr-2 text-blue-600" />
                          Recommended Healthcare Providers
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {currentDiagnosis.detailedSteps.medicalConsultation.specialistType.map((specialist, index) => (
                            <div key={index} className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                              <div className="flex items-center text-blue-700">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                {specialist}
                              </div>
                            </div>
                          ))}
                        </div>                      </div>
                    )}

                    {/* Cost Considerations */}
                    {currentDiagnosis.detailedSteps.medicalConsultation?.costsConsiderations && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
                        <h3 className="font-bold text-green-800 mb-4 flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-green-600" />
                          Healthcare Cost Considerations
                        </h3>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                          <p className="text-green-700 leading-relaxed">
                            {currentDiagnosis.detailedSteps.medicalConsultation.costsConsiderations}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Recommended Tests */}
                    {currentDiagnosis.results.nextSteps?.recommendedTests && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
                        <h3 className="font-bold text-purple-800 mb-4 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-purple-600" />
                          Recommended Medical Tests
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {currentDiagnosis.results.nextSteps.recommendedTests.map((test, index) => (
                            <div key={index} className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                              <div className="flex items-center text-purple-700">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                {test}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Home Care Instructions */}
                    {currentDiagnosis.detailedSteps.homeCare && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-200">
                        <h3 className="font-bold text-green-800 mb-4 flex items-center">
                          <Heart className="h-5 w-5 mr-2 text-green-600" />
                          Home Care Instructions
                        </h3>
                        <ul className="space-y-3">
                          {currentDiagnosis.detailedSteps.homeCare.map((instruction, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-green-100 rounded-full mr-3 mt-1">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              </div>
                              <span className="text-slate-700 leading-relaxed">{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Monitoring Guidelines */}
                    {currentDiagnosis.detailedSteps.monitoring && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Symptoms to Monitor */}
                        {currentDiagnosis.detailedSteps.monitoring.symptoms && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                            <h3 className="font-bold text-amber-800 mb-4 flex items-center">
                              <Activity className="h-5 w-5 mr-2 text-amber-600" />
                              Monitor Symptoms
                            </h3>
                            <ul className="space-y-2">
                              {currentDiagnosis.detailedSteps.monitoring.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span className="text-amber-700">{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Vital Signs */}
                        {currentDiagnosis.detailedSteps.monitoring.vitals && (
                          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-cyan-200">
                            <h3 className="font-bold text-cyan-800 mb-4 flex items-center">
                              <TrendingUp className="h-5 w-5 mr-2 text-cyan-600" />
                              Track Vitals
                            </h3>
                            <ul className="space-y-2">
                              {currentDiagnosis.detailedSteps.monitoring.vitals.map((vital, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span className="text-cyan-700">{vital}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Warning Signs */}
                    {currentDiagnosis.detailedSteps.monitoring?.warningSignsToWatch && (
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
                        <h3 className="font-bold text-red-800 mb-4 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                          Warning Signs to Watch
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {currentDiagnosis.detailedSteps.monitoring.warningSignsToWatch.map((sign, index) => (
                            <div key={index} className="bg-red-100 p-3 rounded-xl border border-red-200">
                              <div className="flex items-start text-sm">
                                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-red-700">{sign}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lifestyle Modifications */}
                    {currentDiagnosis.detailedSteps.lifestyleModifications && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200">
                        <h3 className="font-bold text-emerald-800 mb-4 flex items-center">
                          <Leaf className="h-5 w-5 mr-2 text-emerald-600" />
                          Lifestyle Recommendations
                        </h3>
                        <ul className="space-y-3">
                          {currentDiagnosis.detailedSteps.lifestyleModifications.map((modification, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-emerald-100 rounded-full mr-3 mt-1">
                                <Sparkles className="h-4 w-4 text-emerald-600" />
                              </div>
                              <span className="text-slate-700 leading-relaxed">{modification}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Medication Considerations */}
                    {currentDiagnosis.detailedSteps.medicationConsiderations && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200">
                        <h3 className="font-bold text-indigo-800 mb-4 flex items-center">
                          <Pill className="h-5 w-5 mr-2 text-indigo-600" />
                          Medication Guidelines
                        </h3>
                        <p className="text-indigo-700 leading-relaxed bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                          {currentDiagnosis.detailedSteps.medicationConsiderations}
                        </p>
                      </div>
                    )}                    {/* Emergency Care Instructions */}
                    {currentDiagnosis.detailedSteps.whenToSeekEmergencyCare && (
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-300">
                        <h3 className="font-bold text-red-800 mb-4 flex items-center">
                          <ShieldAlert className="h-5 w-5 mr-2 text-red-600" />
                          When to Seek Emergency Care
                        </h3>
                        <div className="bg-red-100 p-4 rounded-xl border border-red-200">
                          <p className="text-red-800 font-medium leading-relaxed">
                            {currentDiagnosis.detailedSteps.whenToSeekEmergencyCare}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Seasonal Advice */}
                    {currentDiagnosis.detailedSteps.seasonalAdvice && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200">
                        <h3 className="font-bold text-orange-800 mb-4 flex items-center">
                          <Sun className="h-5 w-5 mr-2 text-orange-600" />
                          Seasonal Health Advice
                        </h3>
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                          <p className="text-orange-700 leading-relaxed">
                            {currentDiagnosis.detailedSteps.seasonalAdvice}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Family Support */}
                    {currentDiagnosis.detailedSteps.familySupport && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
                        <h3 className="font-bold text-pink-800 mb-4 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-pink-600" />
                          Family Support & Care
                        </h3>
                        <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                          <p className="text-pink-700 leading-relaxed">
                            {currentDiagnosis.detailedSteps.familySupport}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Preventive Measures */}
                    {currentDiagnosis.detailedSteps.preventiveMeasures && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-teal-200">
                        <h3 className="font-bold text-teal-800 mb-4 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-teal-600" />
                          Preventive Measures
                        </h3>
                        <ul className="space-y-3">
                          {currentDiagnosis.detailedSteps.preventiveMeasures.map((measure, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-teal-100 rounded-full mr-3 mt-1">
                                <Shield className="h-4 w-4 text-teal-600" />
                              </div>
                              <span className="text-slate-700 leading-relaxed">{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Traditional Remedies in Next Steps */}
                    {currentDiagnosis.detailedSteps.traditionalRemedies && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                        <h3 className="font-bold text-amber-800 mb-4 flex items-center">
                          <Leaf className="h-5 w-5 mr-2 text-amber-600" />
                          Traditional Ayurvedic Remedies
                        </h3>
                        
                        {/* Ayurvedic Practices */}
                        {currentDiagnosis.detailedSteps.traditionalRemedies.ayurvedicPractices && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-amber-700 mb-2">Ayurvedic Practices</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {currentDiagnosis.detailedSteps.traditionalRemedies.ayurvedicPractices.map((practice, index) => (
                                <div key={index} className="bg-amber-100 p-3 rounded-xl border border-amber-200">
                                  <div className="flex items-start text-sm">
                                    <Sparkles className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-amber-700">{practice}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Herbal Supplements */}
                        {currentDiagnosis.detailedSteps.traditionalRemedies.herbalSupplements && (
                          <div className="mb-4">
                            <h4 className="font-semibold text-amber-700 mb-2">Herbal Supplements</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {currentDiagnosis.detailedSteps.traditionalRemedies.herbalSupplements.map((supplement, index) => (
                                <div key={index} className="bg-green-100 p-3 rounded-xl border border-green-200">
                                  <div className="flex items-start text-sm">
                                    <Leaf className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-green-700">{supplement}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Home Preparations */}
                        {currentDiagnosis.detailedSteps.traditionalRemedies.homePreparations && (
                          <div>
                            <h4 className="font-semibold text-amber-700 mb-2">Home Preparations</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {currentDiagnosis.detailedSteps.traditionalRemedies.homePreparations.map((preparation, index) => (
                                <div key={index} className="bg-orange-100 p-3 rounded-xl border border-orange-200">
                                  <div className="flex items-start text-sm">
                                    <Droplets className="h-4 w-4 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
                                    <span className="text-orange-700">{preparation}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="p-2 bg-amber-100 rounded-lg mr-3">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-800 mb-2">Important Disclaimer</h4>
                          <p className="text-amber-700 text-sm leading-relaxed">
                            {currentDiagnosis.detailedSteps.disclaimer || currentDiagnosis.results.disclaimer || 
                            "This assessment is intended for informational purposes only. Always consult with a healthcare professional for proper medical advice tailored to your specific condition."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : currentDiagnosis.results?.nextSteps ? (
                  // Fallback for legacy format
                  <div className="space-y-6">
                    {/* Fallback content for old format */}
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                      <h3 className="text-xl font-bold text-emerald-800 mb-4">General Advice</h3>
                      <p className="text-emerald-700 leading-relaxed">
                        {currentDiagnosis.results.nextSteps.generalAdvice}
                      </p>
                    </div>
                    
                    {currentDiagnosis.results.nextSteps.recommendedTests && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
                        <h3 className="font-bold text-purple-800 mb-4">Recommended Tests</h3>
                        <ul className="space-y-2">
                          {currentDiagnosis.results.nextSteps.recommendedTests.map((test, index) => (
                            <li key={index} className="flex items-center text-purple-700">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                              {test}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-slate-600" />
                    </div>
                    <p className="text-slate-600 text-lg">No specific next steps available for this diagnosis.</p>
                  </div>
                )}</div>
            </Tab>

            {/* Traditional Remedies Tab */}
            <Tab label={
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>घरेलू उपचार</span>
              </div>
            }>
              <div className="p-6 md:p-8">
                {currentDiagnosis.dietPlan?.traditionalRemedies || currentDiagnosis.detailedSteps?.traditionalRemedies ? (
                  <div className="space-y-6">
                    {/* Traditional Remedies Header */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl mr-4">
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-amber-800">Traditional Indian Remedies</h3>
                          <p className="text-amber-700">पारंपरिक भारतीय घरेलू उपचार</p>
                        </div>
                      </div>
                      <p className="text-amber-700 leading-relaxed">
                        Time-tested natural remedies that complement modern treatment for your condition.
                      </p>
                    </div>

                    {/* Herbal Teas */}
                    {(currentDiagnosis.dietPlan?.traditionalRemedies?.herbalTeas || 
                      currentDiagnosis.detailedSteps?.traditionalRemedies?.herbalTeas) && (
                      <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                            <Droplets className="text-green-600 h-6 w-6" />
                          </div>
                          <h3 className="font-bold text-green-800">Herbal Teas & Drinks | हर्बल चाय</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {(currentDiagnosis.dietPlan?.traditionalRemedies?.herbalTeas || 
                            currentDiagnosis.detailedSteps?.traditionalRemedies?.herbalTeas)?.map((tea, index) => (
                            <div key={index} className="bg-green-50 p-4 rounded-xl border border-green-100">
                              <div className="flex items-center text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                {tea}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Healing Spices */}
                    {(currentDiagnosis.dietPlan?.traditionalRemedies?.spicesForHealing || 
                      currentDiagnosis.detailedSteps?.traditionalRemedies?.spicesForHealing) && (
                      <div className="bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mr-3">
                            <Sparkles className="text-yellow-600 h-6 w-6" />
                          </div>
                          <h3 className="font-bold text-yellow-800">Healing Spices | उपचारक मसाले</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {(currentDiagnosis.dietPlan?.traditionalRemedies?.spicesForHealing || 
                            currentDiagnosis.detailedSteps?.traditionalRemedies?.spicesForHealing)?.map((spice, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-300"
                            >
                              {spice}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Home Preparations */}
                    {(currentDiagnosis.dietPlan?.traditionalRemedies?.homePreparations || 
                      currentDiagnosis.detailedSteps?.traditionalRemedies?.homePreparations) && (
                      <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                            <Activity className="text-blue-600 h-6 w-6" />
                          </div>
                          <h3 className="font-bold text-blue-800">Home Preparations | घरेलू तैयारियां</h3>
                        </div>
                        <ul className="space-y-3">
                          {(currentDiagnosis.dietPlan?.traditionalRemedies?.homePreparations || 
                            currentDiagnosis.detailedSteps?.traditionalRemedies?.homePreparations)?.map((prep, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-blue-100 rounded-full mr-3 mt-1">
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="text-slate-700 leading-relaxed">{prep}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Ayurvedic Practices */}
                    {currentDiagnosis.detailedSteps?.traditionalRemedies?.ayurvedicPractices && (
                      <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-3">
                            <Leaf className="text-purple-600 h-6 w-6" />
                          </div>
                          <h3 className="font-bold text-purple-800">Ayurvedic Practices | आयुर्वेदिक अभ्यास</h3>
                        </div>
                        <ul className="space-y-3">
                          {currentDiagnosis.detailedSteps.traditionalRemedies.ayurvedicPractices.map((practice, index) => (
                            <li key={index} className="flex items-start">
                              <div className="p-1 bg-purple-100 rounded-full mr-3 mt-1">
                                <Leaf className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="text-slate-700 leading-relaxed">{practice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Disclaimer */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                      <div className="flex items-start">
                        <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-yellow-800 mb-2">Traditional Remedy Guidelines</h4>
                          <p className="text-yellow-700 text-sm leading-relaxed">
                            These traditional remedies are for informational purposes and should complement, not replace, 
                            professional medical treatment. Always consult your healthcare provider before trying new remedies, 
                            especially if you have allergies or are taking medications.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="p-4 bg-slate-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Traditional Remedies</h3>
                    <p className="text-slate-600">Get personalized traditional remedies based on your symptoms</p>
                    <div className="mt-4">
                      <LinkButton to="/traditional-remedies" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                        Explore Traditional Remedies
                      </LinkButton>
                    </div>
                  </div>
                )}
              </div>
            </Tab>

            {/* Ayurvedic Insights Tab */}
            <Tab label={
              <div className="flex items-center space-x-2">
                <Leaf className="h-4 w-4" />
                <span>Ayurvedic View</span>
              </div>
            }>
              <div className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Ayurvedic Header */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl mr-4">
                        <Leaf className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-emerald-800">Ayurvedic Perspective</h3>
                        <p className="text-emerald-700">आयुर्वेदिक दृष्टिकोण</p>
                      </div>
                    </div>
                    <p className="text-emerald-700 leading-relaxed">
                      Understanding your condition through the lens of traditional Ayurvedic medicine and dosha balance.
                    </p>
                  </div>

                  {/* Dosha Analysis if available */}
                  {currentDiagnosis.results.possibleConditions?.some(c => c.ayurvedicPerspective) && (
                    <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-3">
                          <Sparkles className="text-purple-600 h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-purple-800">Dosha Insights | दोष विश्लेषण</h3>
                      </div>
                      <div className="space-y-4">
                        {currentDiagnosis.results.possibleConditions
                          .filter(c => c.ayurvedicPerspective)
                          .map((condition, index) => (
                          <div key={index} className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                            <h4 className="font-semibold text-purple-800 mb-2">{condition.condition}</h4>
                            <p className="text-purple-700 text-sm leading-relaxed">
                              {condition.ayurvedicPerspective}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Seasonal Advice */}
                  {currentDiagnosis.dietPlan?.seasonalAdvice && (
                    <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
                          <Calendar className="text-blue-600 h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-blue-800">Seasonal Recommendations | मौसमी सलाह</h3>
                      </div>
                      <p className="text-blue-700 leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-100">
                        {currentDiagnosis.dietPlan.seasonalAdvice}
                      </p>
                    </div>
                  )}

                  {/* Ayurvedic Approach from Diet Plan */}
                  {currentDiagnosis.dietPlan?.ayurvedicApproach && (
                    <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                          <Leaf className="text-green-600 h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-green-800">Holistic Approach | समग्र दृष्टिकोण</h3>
                      </div>
                      <p className="text-green-700 leading-relaxed bg-green-50 p-4 rounded-xl border border-green-100">
                        {currentDiagnosis.dietPlan.ayurvedicApproach}
                      </p>
                    </div>
                  )}

                  {/* Quick Access to Features */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                      <div className="flex items-center mb-4">
                        <Leaf className="h-6 w-6 text-amber-600 mr-3" />
                        <h4 className="font-bold text-amber-800">Get Detailed Guidance</h4>
                      </div>
                      <p className="text-amber-700 text-sm mb-4">
                        Discover your unique dosha constitution and get personalized Ayurvedic lifestyle recommendations.
                      </p>
                      <LinkButton 
                        to="/ayurvedic-guidance" 
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      >
                        Explore Ayurvedic Guidance
                      </LinkButton>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <div className="flex items-center mb-4">
                        <Heart className="h-6 w-6 text-green-600 mr-3" />
                        <h4 className="font-bold text-green-800">Traditional Remedies</h4>
                      </div>
                      <p className="text-green-700 text-sm mb-4">
                        Browse comprehensive traditional Indian remedies for various health conditions.
                      </p>
                      <LinkButton 
                        to="/traditional-remedies" 
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50"
                      >
                        Browse All Remedies
                      </LinkButton>
                    </div>
                  </div>

                  {/* Traditional Wisdom Quote */}
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                    <div className="text-center">
                      <div className="text-4xl text-yellow-600 mb-4">🕉️</div>
                      <blockquote className="text-yellow-800 italic text-lg mb-2">
                        "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"
                      </blockquote>
                      <p className="text-yellow-700 text-sm">
                        May all beings be happy, may all beings be free from illness
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </TabView>
        </div>

        {/* Footer */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mt-8 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center w-full">
            <div className="text-slate-600 text-sm mb-3 sm:mb-0 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-slate-400" />
              <span>Assessment completed on {new Date(currentDiagnosis.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}</span>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/diagnose')}
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl font-semibold transition-all"
              >
                New Assessment
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResults;
