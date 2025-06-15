import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Brain, 
  FileBarChart, 
  Utensils, 
  Stethoscope,
  Shield,
  Activity,
  Clock,
  ArrowRight,
  AlertCircle,
  Leaf,
  Heart,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-emerald-50/20 to-teal-50/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 rounded-full text-emerald-800 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
                AI-Powered Healthcare Assistant
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-8">
                Your Health,
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent"> Simplified</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl">
                Get instant AI-powered health insights, personalized recommendations, and clear guidance for your wellness journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to={user ? "/diagnose" : "/register"}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  {user ? "Start Diagnosis" : "Get Started Free"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={user ? "/dashboard" : "/login"}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-emerald-200 text-emerald-700 font-semibold rounded-2xl shadow-md hover:shadow-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  {user ? "View Dashboard" : "Sign In"}
                </Link>
              </div>
            </div>            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-emerald-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-2xl mr-4">
                      <Stethoscope className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">Live Health Analysis</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                      <span className="font-medium text-slate-700">Fever, Headache, Fatigue</span>
                    </div>
                    <div className="flex items-center p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                      <span className="font-medium text-slate-700">Possible: Viral Infection (87% match)</span>
                    </div>
                    <div className="flex items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-medium text-slate-700">Severity: Mild to Moderate</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-emerald-100">
                    <span className="text-sm font-medium text-slate-500">Sample Assessment</span>
                    <Link 
                      to={user ? "/diagnose" : "/register"} 
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200"
                    >
                      Try Now
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">10K+</div>
              <div className="text-slate-600 font-medium">Users Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">95%</div>
              <div className="text-slate-600 font-medium">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-slate-600 font-medium">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Conditions</div>
            </div>
          </div>
        </div>
      </section>      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 rounded-full text-emerald-800 text-sm font-medium mb-6">
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Comprehensive Health 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Intelligence</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our advanced AI analyzes your symptoms to provide personalized health insights, recommendations, and guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  AI Symptom Analysis
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Advanced machine learning algorithms analyze your symptoms to identify potential conditions with high accuracy.
                </p>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-6 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileBarChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  Severity Assessment
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Understand the potential seriousness of your condition and receive appropriate next steps and recommendations.
                </p>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-6 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  Personalized Nutrition
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Receive customized diet plans and nutrition recommendations tailored to support your recovery and wellness.
                </p>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-6 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>

            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  Medical Guidance
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Get clear recommendations on when to see a healthcare provider and what tests might be necessary.
                </p>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-6 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Wellness Features Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full text-amber-800 text-sm font-medium mb-6">
              🕉️ Traditional Indian Wellness
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              आयुर्वेदिक स्वास्थ्य
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> Traditional Healing</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Combine modern AI diagnosis with thousands of years of Indian traditional medicine and Ayurvedic wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Ayurvedic Guidance */}
            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                  Ayurvedic Guidance
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Get personalized dosha analysis and lifestyle recommendations based on ancient Ayurvedic principles for holistic wellness.
                </p>
                <div className="text-emerald-600 font-medium text-sm flex items-center">
                  <span>Discover Your Constitution</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Traditional Remedies */}
            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-amber-100 hover:border-amber-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                  घरेलू उपचार
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Access time-tested Indian home remedies using common household ingredients like turmeric, ginger, and holy basil.
                </p>
                <div className="text-amber-600 font-medium text-sm flex items-center">
                  <span>Explore Traditional Remedies</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Indian Diet Plans */}
            <div className="group bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-blue-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  Indian Diet Plans
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Receive culturally relevant meal plans featuring daliya khichdi, traditional Indian foods, and seasonal recommendations.
                </p>
                <div className="text-blue-600 font-medium text-sm flex items-center">
                  <span>Get Personalized Plans</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Indian Context Features */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border border-emerald-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                Designed for Indian Healthcare Context
              </h3>
              <p className="text-emerald-700 max-w-2xl mx-auto">
                Our AI understands the unique health challenges, climate conditions, and cultural practices specific to India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-emerald-800 mb-2">Monsoon Health</h4>
                <p className="text-sm text-emerald-700">
                  Seasonal guidance for India's unique climate patterns
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-amber-800 mb-2">Local Diseases</h4>
                <p className="text-sm text-amber-700">
                  Detection of dengue, malaria, typhoid, and regional conditions
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800 mb-2">Indian Ingredients</h4>
                <p className="text-sm text-blue-700">
                  Remedies using turmeric, neem, tulsi, and common spices
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-800 mb-2">Affordable Care</h4>
                <p className="text-sm text-purple-700">
                  Cost-effective recommendations for Indian healthcare system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 rounded-full text-emerald-800 text-sm font-medium mb-6">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get Started in 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> 3 Easy Steps</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience comprehensive health insights through our streamlined, user-friendly process
            </p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-20 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-300 rounded-full"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              <div className="relative group">
                <div className="bg-white rounded-3xl shadow-xl p-10 border border-emerald-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="mb-8 flex justify-center">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100">
                      <Activity className="h-12 w-12 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center group-hover:text-emerald-700 transition-colors">
                    Input Symptoms
                  </h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    Share your symptoms, medical history, and relevant details through our intuitive interface designed for accuracy.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white rounded-3xl shadow-xl p-10 border border-emerald-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="mb-8 flex justify-center">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100">
                      <Brain className="h-12 w-12 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center group-hover:text-emerald-700 transition-colors">
                    AI Analysis
                  </h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    Our sophisticated AI processes your information using advanced algorithms to provide accurate health insights.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="bg-white rounded-3xl shadow-xl p-10 border border-emerald-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="mb-8 flex justify-center">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100">
                      <FileBarChart className="h-12 w-12 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center group-hover:text-emerald-700 transition-colors">
                    Get Results
                  </h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    Receive comprehensive results including potential conditions, severity assessment, and personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-emerald-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-100/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 rounded-full text-emerald-800 text-sm font-medium mb-6">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Trusted Healthcare 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Innovation</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our platform combines cutting-edge AI technology with healthcare expertise to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-emerald-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-emerald-700 transition-colors">
                24/7 Accessibility
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Access professional-grade health insights anytime, anywhere. Our AI system is always available to provide immediate assistance when you need it most.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-emerald-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-emerald-700 transition-colors">
                Secure & Private
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Your health data is protected with military-grade encryption and privacy protocols. We prioritize your confidentiality above everything else.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-emerald-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6 group-hover:text-emerald-700 transition-colors">
                Comprehensive Care
              </h3>
              <p className="text-slate-600 leading-relaxed">
                From symptom analysis to lifestyle recommendations, we provide holistic health insights tailored to your unique health profile and needs.
              </p>
            </div>
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="py-24 mx-6 relative overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/90 via-teal-500/90 to-emerald-600/90 rounded-3xl backdrop-blur-sm"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-8 py-12 text-center text-white relative z-10">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-10 border border-white/20">
            <div className="w-3 h-3 bg-emerald-300 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium">Join 10,000+ users who trust AyurSathi</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Transform Your Health
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">Journey Today</span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-95">
            Experience the future of healthcare with AI-powered insights, personalized recommendations, and expert guidance at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to={user ? "/diagnose" : "/register"}
              className="group inline-flex items-center justify-center px-10 py-5 bg-white text-emerald-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 text-lg"
            >
              {user ? "Start Your Health Assessment" : "Create Free Account"}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {!user && (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white/80 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/10 hover:border-white transition-all duration-300 text-lg backdrop-blur-sm"
              >
                Sign In
              </Link>
            )}
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold mb-1">10K+</div>
              <div className="text-sm opacity-90">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-90">Accuracy Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm opacity-90">Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-90">Conditions</div>
            </div>
          </div>
        </div>
      </section>      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 mb-20 mt-6">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-2xl">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <div className="ml-6">
              <h4 className="text-xl font-bold text-amber-800 mb-3">Important Medical Disclaimer</h4>
              <p className="text-amber-700 leading-relaxed">
                <strong>AyurSathi</strong> provides educational health information and should not replace professional medical advice, diagnosis, or treatment. 
                Always consult with qualified healthcare providers for medical concerns. This AI tool is designed to supplement, not substitute, 
                professional medical expertise and clinical judgment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
