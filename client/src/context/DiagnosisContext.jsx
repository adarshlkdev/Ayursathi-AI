import { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';

const DiagnosisContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Initial state
const initialState = {
  loading: false,
  currentDiagnosis: null,
  diagnosisHistory: [],
  error: null
};

// Reducer function
const diagnosisReducer = (state, action) => {
  switch (action.type) {
    case 'DIAGNOSIS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DIAGNOSIS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        currentDiagnosis: action.payload,
        diagnosisHistory: [action.payload, ...state.diagnosisHistory]
      };
    case 'DIAGNOSIS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_HISTORY_SUCCESS':
      return { ...state, diagnosisHistory: action.payload, loading: false };
    case 'FETCH_DIAGNOSIS_SUCCESS':
      return { ...state, currentDiagnosis: action.payload, loading: false };
    case 'CLEAR_CURRENT_DIAGNOSIS':
      return { ...state, currentDiagnosis: null };
    case 'REMOVE_DIAGNOSIS':
      return { 
        ...state, 
        diagnosisHistory: state.diagnosisHistory.filter(
          diagnosis => diagnosis._id !== action.payload
        ),
        currentDiagnosis: state.currentDiagnosis?._id === action.payload 
          ? null 
          : state.currentDiagnosis
      };
    case 'RESET_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const DiagnosisProvider = ({ children }) => {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);
  // Submit symptoms for diagnosis
  const submitDiagnosis = useCallback(async (diagnosisData) => {
    dispatch({ type: 'DIAGNOSIS_REQUEST' });
    try {
      const response = await axios.post(`${API_URL}/diagnose`, diagnosisData);
      dispatch({ 
        type: 'DIAGNOSIS_SUCCESS', 
        payload: response.data.diagnosis 
      });
      return response.data.diagnosis;
    } catch (error) {
      dispatch({ 
        type: 'DIAGNOSIS_FAIL', 
        payload: error.response?.data?.message || 'Failed to process diagnosis'
      });
      throw error;
    }
  }, []);
  // Get user's diagnosis history
  const fetchDiagnosisHistory = useCallback(async () => {
    dispatch({ type: 'DIAGNOSIS_REQUEST' });
    try {
      const response = await axios.get(`${API_URL}/diagnose`);
      dispatch({ 
        type: 'FETCH_HISTORY_SUCCESS', 
        payload: response.data 
      });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: 'DIAGNOSIS_FAIL', 
        payload: error.response?.data?.message || 'Failed to fetch diagnosis history'
      });
      throw error;
    }
  }, []);
  // Get specific diagnosis
  const fetchDiagnosis = useCallback(async (diagnosisId) => {
    dispatch({ type: 'DIAGNOSIS_REQUEST' });
    try {
      const response = await axios.get(`${API_URL}/diagnose/${diagnosisId}`);
      dispatch({ 
        type: 'FETCH_DIAGNOSIS_SUCCESS', 
        payload: response.data 
      });
      return response.data;
    } catch (error) {
      dispatch({ 
        type: 'DIAGNOSIS_FAIL', 
        payload: error.response?.data?.message || 'Failed to fetch diagnosis'
      });
      throw error;
    }
  }, []);
  // Delete a diagnosis
  const deleteDiagnosis = useCallback(async (diagnosisId) => {
    try {
      await axios.delete(`${API_URL}/diagnose/${diagnosisId}`);
      dispatch({ type: 'REMOVE_DIAGNOSIS', payload: diagnosisId });
    } catch (error) {
      dispatch({ 
        type: 'DIAGNOSIS_FAIL', 
        payload: error.response?.data?.message || 'Failed to delete diagnosis'
      });
      throw error;
    }
  }, []);
  // Clear the current diagnosis (used when creating a new one)
  const clearCurrentDiagnosis = useCallback(() => {
    dispatch({ type: 'CLEAR_CURRENT_DIAGNOSIS' });
  }, []);

  // Reset error state
  const resetError = useCallback(() => {
    dispatch({ type: 'RESET_ERROR' });
  }, []);

  return (
    <DiagnosisContext.Provider
      value={{
        ...state,
        submitDiagnosis,
        fetchDiagnosisHistory,
        fetchDiagnosis,
        deleteDiagnosis,
        clearCurrentDiagnosis,
        resetError
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => {
  return useContext(DiagnosisContext);
};
