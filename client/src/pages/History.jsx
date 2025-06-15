import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDiagnosis } from '../context/DiagnosisContext';
import { 
  AlertCircle, Trash2, FileText, Search, Calendar, Clock, 
  TrendingUp, Stethoscope, Activity, Eye, Sparkles 
} from 'lucide-react';

const History = () => {
  const { diagnosisHistory, fetchDiagnosisHistory, deleteDiagnosis, loading, error } = useDiagnosis();
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  useEffect(() => {
    fetchDiagnosisHistory();
  }, [fetchDiagnosisHistory]);

  useEffect(() => {
    if (diagnosisHistory) {
      if (searchTerm.trim() === '') {
        setFilteredHistory(diagnosisHistory);
      } else {
        const lowercasedTerm = searchTerm.toLowerCase();
        setFilteredHistory(
          diagnosisHistory.filter(diagnosis => {
            // Search in symptoms
            const symptomsMatch = diagnosis.symptoms.some(symptom => 
              symptom.toLowerCase().includes(lowercasedTerm)
            );
            
            // Search in conditions
            const conditionsMatch = diagnosis.results.possibleConditions.some(condition => 
              condition.condition.toLowerCase().includes(lowercasedTerm)
            );
            
            // Search in date
            const dateMatch = new Date(diagnosis.createdAt)
              .toLocaleDateString()
              .includes(lowercasedTerm);
              
            return symptomsMatch || conditionsMatch || dateMatch;
          })
        );
      }
    }
  }, [searchTerm, diagnosisHistory]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDeleteClick = (id) => {
    setShowConfirmDelete(id);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteDiagnosis(id);
      setShowConfirmDelete(null);
    } catch (err) {
      console.error('Error deleting diagnosis:', err);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(null);
  };

  // Find primary condition from diagnosis
  const getPrimaryCondition = (diagnosis) => {
    if (!diagnosis.results?.possibleConditions?.length) return 'Unknown';
    
    // Sort by probability and get the highest
    const sorted = [...diagnosis.results.possibleConditions].sort((a, b) => b.probability - a.probability);
    return sorted[0].condition;
  };
  const getSeverityColor = (diagnosis) => {
    if (!diagnosis.results?.possibleConditions?.length) return 'bg-slate-100 text-slate-700 border-slate-200';
    
    // Get highest severity
    const severities = {
      'low': 0,
      'moderate': 1,
      'high': 2,
      'severe': 3,
      'emergency': 4
    };
    
    let highestSeverity = 'low';
    
    diagnosis.results.possibleConditions.forEach(condition => {
      if (severities[condition.severity] > severities[highestSeverity]) {
        highestSeverity = condition.severity;
      }
    });
    
    switch (highestSeverity) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'emergency':
        return 'bg-red-500 text-white border-red-600';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mb-8 shadow-xl">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/20 rounded-xl mr-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">Health History</h1>
                    <p className="text-emerald-100 mt-1">Your Previous Assessments & Results</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="hidden md:flex items-center">
                  <div className="p-4 bg-white/10 rounded-2xl">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <Link
                  to="/diagnose"
                  className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <Stethoscope className="h-4 w-4 mr-2" />
                  New Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mb-8 shadow-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-emerald-500" />
            </div>
            <input
              type="text"
              className="pl-12 pr-4 py-4 border border-emerald-200 rounded-xl w-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm transition-all font-medium placeholder-slate-500"
              placeholder="Search by symptom, condition, or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {error && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-red-200 p-6 mb-8 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-xl mr-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Error Loading History</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>        </div>
      )}

      {loading ? (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-16 text-center shadow-lg">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading History</h3>
          <p className="text-slate-600">Please wait while we retrieve your assessment history...</p>
        </div>
      ) : filteredHistory?.length > 0 ? (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-emerald-200">
              <thead className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date & Time
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Symptoms
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Primary Condition
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Severity
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-slate-200">
                {filteredHistory.map((diagnosis) => (
                  <tr key={diagnosis._id} className="hover:bg-emerald-50/50 transition-all duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                        {formatDate(diagnosis.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      <div className="flex flex-wrap gap-1">
                        {diagnosis.symptoms.slice(0, 3).map((symptom, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {symptom}
                          </span>
                        ))}
                        {diagnosis.symptoms.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            +{diagnosis.symptoms.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">
                      {getPrimaryCondition(diagnosis)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full border ${getSeverityColor(diagnosis)}`}>
                        {diagnosis.results?.possibleConditions?.length > 0 ? 
                          diagnosis.results.possibleConditions[0].severity.charAt(0).toUpperCase() + 
                          diagnosis.results.possibleConditions[0].severity.slice(1) : 
                          'Unknown'
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {showConfirmDelete === diagnosis._id ? (
                        <div className="flex items-center space-x-3 justify-end">
                          <span className="text-xs text-slate-600 font-medium">Confirm deletion?</span>
                          <button
                            onClick={() => confirmDelete(diagnosis._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-all"
                          >
                            Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="inline-flex items-center px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3 justify-end">
                          <Link
                            to={`/results/${diagnosis._id}`}
                            className="inline-flex items-center px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-all"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(diagnosis._id)}
                            className="inline-flex items-center p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete diagnosis"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-16 text-center shadow-lg">
          <div className="p-4 bg-slate-100 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <FileText className="h-10 w-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">
            {searchTerm ? 'No Results Found' : 'No Assessment History'}
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            {searchTerm 
              ? 'No assessments match your search criteria. Try adjusting your search terms.' 
              : 'You haven\'t completed any health assessments yet. Start your first assessment to build your health history.'
            }
          </p>
          {!searchTerm && (
            <Link
              to="/diagnose"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Stethoscope className="h-4 w-4 mr-2" />
              Start First Assessment
            </Link>
          )}
        </div>
      )}      
        {/* Footer Note */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6 mt-8 shadow-lg">
          <div className="flex items-start">
            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
              <AlertCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-800 mb-2">Privacy & Security</h4>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Your assessment history is stored securely and is only accessible to you. You can delete any record at any time. 
                All data is encrypted and protected according to healthcare privacy standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
