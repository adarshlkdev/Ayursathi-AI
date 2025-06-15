// Medications page component
import React, { useEffect, useState } from 'react';
import { useMedication } from '../context/MedicationContext';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Button, 
  Alert, 
  Input,
  FormGroup,
  FormLabel,
  Textarea,
  Select
} from '../components/ui';
import { 
  Plus, PencilLine, Trash, Clock, AlertCircle, Pill, 
  Calendar, Save, X, Sparkles, Activity, Heart 
} from 'lucide-react';

const Medications = () => {
  const { 
    medications,
    loading, 
    error, 
    getMedications, 
    addMedication, 
    updateMedication, 
    deleteMedication,
    clearError
  } = useMedication();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [editingMedication, setEditingMedication] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    timeOfDay: [],
    instructions: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  useEffect(() => {
    getMedications();
  }, [getMedications]);
  
  useEffect(() => {
    if (editingMedication) {
      setFormData({
        name: editingMedication.name,
        dosage: editingMedication.dosage,
        frequency: editingMedication.frequency,
        timeOfDay: editingMedication.timeOfDay,
        instructions: editingMedication.instructions || '',
        startDate: new Date(editingMedication.startDate).toISOString().split('T')[0],
        endDate: editingMedication.endDate 
          ? new Date(editingMedication.endDate).toISOString().split('T')[0] 
          : ''
      });
    }
  }, [editingMedication]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeOfDayChange = (time) => {
    const updatedTimes = formData.timeOfDay.includes(time)
      ? formData.timeOfDay.filter(t => t !== time)
      : [...formData.timeOfDay, time];
    
    setFormData({ ...formData, timeOfDay: updatedTimes });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dosage: '',
      frequency: 'daily',
      timeOfDay: [],
      instructions: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
    setEditingMedication(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage || formData.timeOfDay.length === 0) {
      alert('Please fill out all required fields');
      return;
    }

    try {
      if (editingMedication) {
        await updateMedication(editingMedication._id, formData);
      } else {
        await addMedication(formData);
      }
      resetForm();
    } catch (err) {
      console.error('Error submitting medication:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      setShowConfirmDelete(null);
    } catch (err) {
      console.error('Error deleting medication:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTimeOfDayLabel = (timeOfDay) => {
    if (!timeOfDay || timeOfDay.length === 0) return 'Not specified';
    
    return timeOfDay.map(time => {
      const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
      return capitalize(time);
    }).join(', ');
  };

  const getFrequencyLabel = (frequency) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'twice_daily': return 'Twice Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      case 'as_needed': return 'As Needed';
      default: return frequency;
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
                    <Pill className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold">Medication Tracker</h1>
                    <p className="text-emerald-100 mt-1">Manage your medications and stay on top of your health routine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>        </div>

        {error && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-red-200 p-6 mb-8 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-xl mr-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Medication Form */}
        {showAddForm && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mb-8 shadow-xl">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 border-b border-emerald-200">
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-3 text-emerald-600" />
                <div>
                  <h2 className="font-bold text-lg text-emerald-800">
                    {editingMedication ? 'Update Medication' : 'Add New Medication'}
                  </h2>
                  <p className="text-sm text-emerald-600">Fill in the medication details</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-emerald-600" />
                        Medication Name *
                      </div>
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium placeholder-slate-500"
                      name="name"
                      placeholder="e.g., Aspirin, Vitamin D"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-emerald-600" />
                        Dosage *
                      </div>
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium placeholder-slate-500"
                      name="dosage"
                      placeholder="e.g., 10mg, 500mg, 2 tablets"
                      value={formData.dosage}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                        Frequency *
                      </div>
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                    >
                      <option value="daily">Daily</option>
                      <option value="twice_daily">Twice Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="as_needed">As Needed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                        Time of Day *
                      </div>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['morning', 'afternoon', 'evening', 'night'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`px-4 py-2 rounded-xl border transition-all font-medium ${
                            formData.timeOfDay.includes(time)
                              ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                              : 'bg-white/80 text-slate-700 border-emerald-200 hover:bg-emerald-50'
                          }`}
                          onClick={() => handleTimeOfDayChange(time)}
                        >
                          {time.charAt(0).toUpperCase() + time.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                        Start Date
                      </div>
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                        End Date (Optional)
                      </div>
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-slate-700 font-semibold mb-3">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-emerald-600" />
                        Special Instructions (Optional)
                      </div>
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-emerald-200 rounded-xl bg-white/80 backdrop-blur-sm text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium placeholder-slate-500"
                      name="instructions"
                      placeholder="e.g., Take with food, avoid alcohol"
                      value={formData.instructions}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                    disabled={loading}
                  >
                    <div className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      {editingMedication ? 'Update' : 'Add'} Medication
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Medications List */}
        {loading && !medications.length ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-16 text-center shadow-lg">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 mx-auto"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading Medications</h3>
            <p className="text-slate-600">Please wait while we fetch your medication list...</p>
          </div>
        ) : medications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medications.map(medication => (
              <div 
                key={medication._id} 
                className={`bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${!medication.active ? 'opacity-70' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                        <Pill className="h-5 w-5 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">{medication.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        onClick={() => {
                          setEditingMedication(medication);
                          setShowAddForm(true);
                        }}
                        title="Edit medication"
                      >
                        <PencilLine size={16} />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        onClick={() => setShowConfirmDelete(medication._id)}
                        title="Delete medication"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-emerald-500" />
                      <span className="font-medium text-slate-700 w-20">Dosage:</span>
                      <span className="text-slate-600">{medication.dosage}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                      <span className="font-medium text-slate-700 w-20">Frequency:</span>
                      <span className="text-slate-600">{getFrequencyLabel(medication.frequency)}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                      <span className="font-medium text-slate-700 w-20">Time:</span>
                      <div className="flex flex-wrap gap-1">
                        {medication.timeOfDay.map((time, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            {time.charAt(0).toUpperCase() + time.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                      <span className="font-medium text-slate-700 w-20">Started:</span>
                      <span className="text-slate-600">{formatDate(medication.startDate)}</span>
                    </div>
                    
                    {medication.endDate && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="font-medium text-slate-700 w-20">Until:</span>
                        <span className="text-slate-600">{formatDate(medication.endDate)}</span>
                      </div>
                    )}
                    
                    {medication.instructions && (
                      <div className="mt-4 pt-4 border-t border-emerald-100">
                        <div className="flex items-start">
                          <Heart className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                          <div>
                            <span className="font-medium text-slate-700 block mb-1">Instructions:</span>
                            <span className="text-sm text-slate-600 leading-relaxed">{medication.instructions}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Delete Modal */}
                  {showConfirmDelete === medication._id && (
                    <div className="mt-6 p-4 border border-red-200 rounded-xl bg-red-50/80 backdrop-blur-sm">
                      <div className="flex items-center mb-3">
                        <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                        <p className="text-sm font-medium text-red-800">
                          Delete this medication?
                        </p>
                      </div>
                      <p className="text-xs text-red-700 mb-4">This action cannot be undone.</p>
                      <div className="flex justify-end space-x-3">
                        <button
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                          onClick={() => setShowConfirmDelete(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
                          onClick={() => handleDelete(medication._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 p-16 text-center shadow-lg">
            <div className="p-4 bg-slate-100 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Pill className="h-10 w-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">No Medications Added</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Track your medications here to help manage your health routine and stay on top of your medication schedule.
            </p>
            <button
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Medication
            </button>
          </div>
        )}      <div className="mt-8">
        <Alert variant="info" icon={<AlertCircle className="h-5 w-5" />}>
          <span className="font-medium">Important:</span> Always follow your healthcare provider's instructions 
          regarding medication dosage and frequency. This tracker is for personal reference only.
        </Alert>
      </div>
      </div>
    </div>
  );
};

export default Medications;
