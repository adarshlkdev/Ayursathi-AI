import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDiagnosis } from '../context/DiagnosisContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardContent, CardFooter, Button, Alert, FormLabel, Input, Textarea, Select, FormGroup } from '../components/ui';
import SymptomsInput from '../components/SymptomsInput';
import MedicalHistoryInput from '../components/MedicalHistoryInput';
import { Stethoscope, User, Clock, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

const DiagnoseForm = () => {
  const { user } = useAuth();
  const { submitDiagnosis, loading, error, clearCurrentDiagnosis } = useDiagnosis();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    symptoms: [],
    age: user?.age || '',
    gender: user?.gender || '',
    history: user?.medicalHistory || [],
    additionalInfo: ''
  });
  
  const [symptomInput, setSymptomInput] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  useEffect(() => {
    // Clear any previous diagnosis when form loads
    clearCurrentDiagnosis();
    
    // Pre-fill form with user data
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        age: user.age || '',
        gender: user.gender || '',
        history: user.medicalHistory || []
      }));
    }
  }, [user, clearCurrentDiagnosis]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addSymptom = () => {
    if (symptomInput.trim() !== '' && !formData.symptoms.includes(symptomInput.trim())) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, symptomInput.trim()]
      });
      setSymptomInput('');
    }
  };

  const removeSymptom = (index) => {
    setFormData({
      ...formData,
      symptoms: formData.symptoms.filter((_, i) => i !== index)
    });
  };

  const selectCommonSymptom = (symptom) => {
    if (!formData.symptoms.includes(symptom)) {
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, symptom]
      });
    }
  };

  const addMedicalCondition = () => {
    if (medicalCondition.trim() !== '' && !formData.history.includes(medicalCondition.trim())) {
      setFormData({
        ...formData,
        history: [...formData.history, medicalCondition.trim()]
      });
      setMedicalCondition('');
    }
  };

  const removeMedicalCondition = (index) => {
    setFormData({
      ...formData,
      history: formData.history.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.symptoms.length === 0) {
      alert('Please add at least one symptom');
      return;
    }

    try {
      const diagnosis = await submitDiagnosis(formData);
      navigate(`/results/${diagnosis._id}`);
    } catch (err) {
      console.error('Diagnosis submission error:', err);
      // Error is already handled in the context
    }
  };  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl">
              <Stethoscope className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            AI Health Assessment
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Share your symptoms and health information for an intelligent analysis powered by advanced AI technology
          </p>
          <div className="flex items-center justify-center mt-4 text-emerald-600">
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Powered by AyurSathi AI</span>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/80 transition-all duration-300 shadow-xl">
          {error && (
            <div className="mx-6 mt-6">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800">Error</h4>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-8">
              {/* Symptoms Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-800">Symptoms</h3>
                    <p className="text-emerald-600 text-sm">Describe what you're experiencing</p>
                  </div>
                </div>
                <SymptomsInput 
                  symptoms={formData.symptoms}
                  setSymptoms={(symptoms) => setFormData({...formData, symptoms})}
                />
              </div>
              
              {/* Personal Information */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg mr-3">
                    <User className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-teal-800">Personal Information</h3>
                    <p className="text-teal-600 text-sm">Help us provide better recommendations</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div>
                    <FormLabel htmlFor="age" className="text-slate-700 font-semibold">Age *</FormLabel>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      min="1"
                      max="120"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleChange}
                      className="mt-2 border-2 border-teal-200 focus:border-teal-500 rounded-xl"
                    />
                  </div>
                  
                  {/* Gender */}
                  <div>
                    <FormLabel htmlFor="gender" className="text-slate-700 font-semibold">Gender</FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-2 border-2 border-teal-200 focus:border-teal-500 rounded-xl"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Medical History */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-800">Medical History</h3>
                    <p className="text-emerald-600 text-sm">Previous conditions and diagnoses</p>
                  </div>
                </div>
                <MedicalHistoryInput
                  conditions={formData.history}
                  setConditions={(conditions) => setFormData({...formData, history: conditions})}
                />
              </div>
              
              {/* Additional Information */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Additional Information</h3>
                    <p className="text-slate-600 text-sm">Any other details you'd like to share</p>
                  </div>
                </div>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows="4"
                  placeholder="Include any other relevant information, such as symptom duration, intensity, or specific concerns..."
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="border-2 border-slate-200 focus:border-emerald-500 rounded-xl"
                />
              </div>
              
              {/* Submit Section */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-emerald-100">
                <div className="text-sm text-slate-600 mb-4 sm:mb-0">
                  <span className="text-red-500">*</span> Required fields
                </div>
                <button
                  type="submit"
                  disabled={loading || formData.symptoms.length === 0}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:scale-105 hover:shadow-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="flex items-center">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Analyzing Symptoms...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Analyze Symptoms
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                  {!loading && (
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {/* Disclaimer */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-t border-amber-200 p-6">
            <div className="flex items-start">
              <div className="p-2 bg-amber-100 rounded-lg mr-3 flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-800 mb-2">Important Disclaimer</h4>
                <p className="text-amber-700 text-sm leading-relaxed">
                  This application provides general information and insights based on the symptoms you report.
                  It is not a substitute for professional medical advice, diagnosis, or treatment.
                  Always consult with a qualified healthcare provider for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnoseForm;
