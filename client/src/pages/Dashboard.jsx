import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDiagnosis } from '../context/DiagnosisContext';
import { Activity, Calendar, FileText, AlertTriangle, User, TrendingUp, Heart, Clock, ChevronRight, Stethoscope, Leaf, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter, CardStatItem, LinkButton, Alert } from '../components/ui';
import HealthMetricsChart from '../components/HealthMetricsChart';
import MedicationReminders from '../components/MedicationReminders';

const Dashboard = () => {
  const { user } = useAuth();
  const { diagnosisHistory, fetchDiagnosisHistory, loading } = useDiagnosis();
  useEffect(() => {
    fetchDiagnosisHistory();
  }, [fetchDiagnosisHistory]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Find most recent diagnosis
  const latestDiagnosis = diagnosisHistory?.[0];
  // Get severity counts for visualization
  const severityCounts = diagnosisHistory?.reduce((acc, diagnosis) => {
    if (diagnosis.results && diagnosis.results.possibleConditions) {
      diagnosis.results.possibleConditions.forEach(condition => {
        if (condition && condition.severity) {
          acc[condition.severity] = (acc[condition.severity] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Welcome back, {user?.name || 'Patient'}
            </h1>
            <p className="text-xl text-slate-600 mt-2 font-medium">
              Track your health journey with confidence
            </p>
            <div className="flex items-center mt-3 text-emerald-600">
              <Heart className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Your wellness companion</span>
            </div>
          </div>
          <div className="flex flex-col max-md:flex-row gap-3">
            <Link
              to="/diagnose"
              className="group relative px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <div className="flex items-center justify-center">
                <Stethoscope className="h-5 w-5 mr-2" />
                New Diagnosis
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/history"
              className="px-6 max-md:px-4 py-4 max-md:py-2 bg-white/70 backdrop-blur-sm text-emerald-600 rounded-2xl font-semibold border border-emerald-200 hover:bg-white hover:shadow-lg transition-all duration-300 md:hidden"
            >
              View History
            </Link>
          </div>
        </div>        {/* Health Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Diagnoses */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {loading ? (
                    <div className="animate-pulse bg-slate-200 h-6 w-12 rounded"></div>
                  ) : (
                    diagnosisHistory?.length || 0
                  )}
                </p>
                <p className="text-slate-600 font-medium">Total Diagnoses</p>
              </div>
              <div className="text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Last Check */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
                    <Calendar className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {loading ? (
                    <div className="animate-pulse bg-slate-200 h-6 w-20 rounded"></div>
                  ) : (
                    latestDiagnosis 
                      ? formatDate(latestDiagnosis.createdAt) 
                      : 'No checks'
                  )}
                </p>
                <p className="text-slate-600 font-medium">Last Check</p>
              </div>
              <div className="text-teal-500 opacity-20 group-hover:opacity-100 transition-opacity">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* High Priority Issues */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3 bg-gradient-to-br from-amber-100 to-red-100 rounded-xl">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {loading ? (
                    <div className="animate-pulse bg-slate-200 h-6 w-8 rounded"></div>
                  ) : (
                    (severityCounts?.high || 0) + (severityCounts?.severe || 0) + (severityCounts?.emergency || 0)
                  )}
                </p>
                <p className="text-slate-600 font-medium">Priority Issues</p>
              </div>
              <div className="text-amber-500 opacity-20 group-hover:opacity-100 transition-opacity">
                <AlertTriangle className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Health Score */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                    <Heart className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  {loading ? (
                    <div className="animate-pulse bg-slate-200 h-6 w-12 rounded"></div>
                  ) : (
                    diagnosisHistory?.length > 0 ? "Good" : "N/A"
                  )}
                </p>
                <p className="text-slate-600 font-medium">Health Status</p>
              </div>
              <div className="text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>        </div>

        {/* Indian Wellness Features */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl mr-3">
              <Leaf className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">आयुर्वेदिक कल्याण</h2>
              <p className="text-slate-600">Traditional Indian Wellness & Remedies</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ayurvedic Guidance Card */}
            <Link
              to="/ayurvedic-guidance"
              className="group relative bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full -translate-y-6 translate-x-6"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ayurvedic Guidance</h3>
                <p className="text-slate-600 text-sm mb-3">
                  Get personalized dosha analysis and lifestyle recommendations based on ancient wisdom
                </p>
                <div className="flex items-center text-emerald-600 font-medium text-sm">
                  <span>Explore Ayurveda</span>
                  <Sparkles className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Traditional Remedies Card */}
            <Link
              to="/traditional-remedies"
              className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full -translate-y-6 translate-x-6"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">घरेलू उपचार</h3>
                <p className="text-slate-600 text-sm mb-3">
                  Traditional Indian home remedies for common health issues with natural ingredients
                </p>
                <div className="flex items-center text-amber-600 font-medium text-sm">
                  <span>Browse Remedies</span>
                  <Sparkles className="h-4 w-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Seasonal Health Card */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full -translate-y-6 translate-x-6"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-blue-600 font-medium text-xs bg-blue-100 px-2 py-1 rounded-full">
                    Summer Tips
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Seasonal Wellness</h3>
                <p className="text-slate-600 text-sm mb-3">
                  Stay healthy with season-specific tips for Indian climate and weather patterns
                </p>
                <div className="text-blue-600 font-medium text-sm">
                  Current: गर्मी का मौसम
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Diagnoses */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/80 transition-all duration-300">
              <div className="px-6 py-5 border-b border-emerald-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Recent Diagnoses</h3>
                    <p className="text-slate-600 mt-1">Your latest health assessments</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200"></div>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent absolute top-0 left-0"></div>
                  </div>
                </div>
              ) : diagnosisHistory?.length ? (
                <div className="divide-y divide-emerald-50">
                  {diagnosisHistory.slice(0, 5).map((diagnosis, index) => (
                    <Link
                      key={diagnosis._id}
                      to={`/results/${diagnosis._id}`}
                      className="group px-6 py-5 flex items-center hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 mr-4 group-hover:scale-110 transition-transform">
                        <FileText className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                          {diagnosis.symptoms && diagnosis.symptoms.length > 0
                            ? `${diagnosis.symptoms.slice(0, 3).join(', ')}${diagnosis.symptoms.length > 3 ? ` +${diagnosis.symptoms.length - 3} more` : ''}`
                            : 'Health Assessment'
                          }
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {formatDate(diagnosis.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
                        <span className="text-sm font-medium mr-2">View Details</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Stethoscope className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-slate-600 mb-6 text-lg">No diagnosis history yet</p>
                  <Link
                    to="/diagnose"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Start First Diagnosis
                  </Link>
                </div>
              )}
              
              {diagnosisHistory?.length > 5 && (
                <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-100">
                  <Link
                    to="/history"
                    className="flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    <span>View all diagnoses</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>          {/* User Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/80 transition-all duration-300">
              <div className="px-6 py-5 border-b border-emerald-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Your Profile</h3>
                    <p className="text-slate-600 mt-1">Personal information</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                    <User className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">{user?.name || 'User'}</h4>
                  <p className="text-slate-500 text-sm mt-1">AyurSathi Patient</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Age</span>
                    <span className="font-semibold text-slate-800">{user?.age || 'Not set'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Gender</span>
                    <span className="font-semibold text-slate-800">
                      {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not set'}
                    </span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-slate-600 text-sm block mb-3">Medical History</span>
                    {user?.medicalHistory?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.medicalHistory.slice(0, 3).map((condition, index) => (
                          <span key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
                            {condition}
                          </span>
                        ))}
                        {user.medicalHistory.length > 3 && (
                          <span className="text-slate-500 text-xs">+{user.medicalHistory.length - 3} more</span>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm">No conditions recorded</p>
                    )}
                  </div>
                </div>
                
                <Link
                  to="/profile"
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105"
                >
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>        {/* Enhanced Components Section */}
        <div className="space-y-8">
          {/* Medication Reminders */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/80 transition-all duration-300">
            <MedicationReminders />
          </div>
          
          {/* Health Metrics Chart */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:bg-white/80 transition-all duration-300">
            <HealthMetricsChart diagnosisHistory={diagnosisHistory} />
          </div>
        </div>
        
        {/* Health Insight Alert */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl mr-4">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 mb-2">Health Insight</h4>
                <p className="text-emerald-700 leading-relaxed">
                  Regular health check-ups are important for maintaining wellness. Remember that this AI assessment 
                  is a helpful tool but not a replacement for professional medical consultation. Always consult 
                  with healthcare professionals for serious concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
