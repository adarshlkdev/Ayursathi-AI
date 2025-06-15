import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  AlertCircle, CheckCircle, User, Edit3, Save, Plus, 
  X, Heart, Activity, Sparkles, Shield, Calendar 
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, updateMedicalHistory } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    gender: user?.gender || '',
  });
  
  const [medicalHistory, setMedicalHistory] = useState(user?.medicalHistory || []);
  const [medicalCondition, setMedicalCondition] = useState('');
  
  const [profileUpdateStatus, setProfileUpdateStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  
  const [historyUpdateStatus, setHistoryUpdateStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addMedicalCondition = () => {
    if (medicalCondition.trim() !== '' && !medicalHistory.includes(medicalCondition.trim())) {
      setMedicalHistory([...medicalHistory, medicalCondition.trim()]);
      setMedicalCondition('');
    }
  };

  const removeMedicalCondition = (index) => {
    setMedicalHistory(medicalHistory.filter((_, i) => i !== index));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileUpdateStatus({ loading: true, success: false, error: null });
    
    try {
      await updateProfile(formData);
      setProfileUpdateStatus({ loading: false, success: true, error: null });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setProfileUpdateStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setProfileUpdateStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || 'Failed to update profile' 
      });
    }
  };

  const handleMedicalHistorySubmit = async (e) => {
    e.preventDefault();
    setHistoryUpdateStatus({ loading: true, success: false, error: null });
    
    try {
      await updateMedicalHistory(medicalHistory);
      setHistoryUpdateStatus({ loading: false, success: true, error: null });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setHistoryUpdateStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      setHistoryUpdateStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || 'Failed to update medical history'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">Your Profile</h1>
                    <p className="text-emerald-100 mt-1">Manage your personal information & health data</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center">
                <div className="p-4 bg-white/10 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Personal Information Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 border-b border-emerald-200">
            <div className="flex items-center">
              <Edit3 className="h-5 w-5 mr-3 text-emerald-600" />
              <div>
                <h2 className="font-bold text-lg text-emerald-800">Personal Information</h2>
                <p className="text-sm text-emerald-600">Update your personal details</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {profileUpdateStatus.error && (
              <div className="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Error updating profile</p>
                    <p className="text-sm text-red-700">{profileUpdateStatus.error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {profileUpdateStatus.success && (
              <div className="mb-6 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Success!</p>
                    <p className="text-sm text-emerald-700">Profile updated successfully!</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleProfileSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-semibold mb-3" htmlFor="name">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-emerald-600" />
                      Full Name
                    </div>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium placeholder-slate-500"
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3" htmlFor="age">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                        Age
                      </div>
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium placeholder-slate-500"
                      id="age"
                      type="number"
                      name="age"
                      min="1"
                      max="120"
                      placeholder="30"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3" htmlFor="gender">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-emerald-600" />
                        Gender
                      </div>
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={profileUpdateStatus.loading}
                  >
                    <div className="flex items-center justify-center">
                      <Save className="h-4 w-4 mr-2" />
                      {profileUpdateStatus.loading ? 'Updating...' : 'Update Profile'}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Medical History Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 border-b border-emerald-200">
            <div className="flex items-center">
              <Heart className="h-5 w-5 mr-3 text-emerald-600" />
              <div>
                <h2 className="font-bold text-lg text-emerald-800">Medical History</h2>
                <p className="text-sm text-emerald-600">
                  Keep your medical history up to date for more accurate diagnoses
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {historyUpdateStatus.error && (
              <div className="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Error updating medical history</p>
                    <p className="text-sm text-red-700">{historyUpdateStatus.error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {historyUpdateStatus.success && (
              <div className="mb-6 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Success!</p>
                    <p className="text-sm text-emerald-700">Medical history updated successfully!</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleMedicalHistorySubmit}>
              <div>
                <label className="block text-slate-700 font-semibold mb-3">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-emerald-600" />
                    Medical Conditions
                  </div>
                </label>
                <div className="flex space-x-3 mb-4">
                  <input
                    className="flex-1 px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium placeholder-slate-500"
                    type="text"
                    placeholder="e.g., Diabetes, Hypertension, Allergies"
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addMedicalCondition();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                    onClick={addMedicalCondition}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </div>
                
                {medicalHistory.length > 0 ? (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-3">
                      {medicalHistory.map((condition, index) => (
                        <div
                          key={index}
                          className="bg-emerald-100 border border-emerald-200 px-4 py-2 rounded-xl flex items-center shadow-sm hover:shadow-md transition-all"
                        >
                          <span className="text-sm font-medium text-emerald-800">{condition}</span>
                          <button
                            type="button"
                            className="ml-3 p-1 text-emerald-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            onClick={() => removeMedicalCondition(index)}
                            title="Remove condition"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center mt-4">
                    <Activity className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600 text-sm font-medium mb-1">No medical conditions added</p>
                    <p className="text-slate-500 text-xs">
                      Adding your medical history helps us provide more accurate health assessments.
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={historyUpdateStatus.loading}
                  >
                    <div className="flex items-center justify-center">
                      <Save className="h-4 w-4 mr-2" />
                      {historyUpdateStatus.loading ? 'Updating...' : 'Update Medical History'}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Privacy Notice */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mt-8 shadow-lg">
          <div className="flex items-start">
            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-800 mb-2">Privacy & Security</h4>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Your personal information and medical history are stored securely and used only to
                improve the accuracy of your health assessments. We do not share your data with third parties
                and all information is encrypted according to healthcare privacy standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;