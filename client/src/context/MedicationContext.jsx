// Context for medication management
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Context
const MedicationContext = createContext();

// Initial State
const initialState = {
  medications: [],
  currentMedication: null,
  loading: false,
  error: null
};

// Action Types
const MEDICATION_REQUEST = 'MEDICATION_REQUEST';
const MEDICATION_SUCCESS = 'MEDICATION_SUCCESS';
const MEDICATION_FAILURE = 'MEDICATION_FAILURE';
const GET_MEDICATIONS_SUCCESS = 'GET_MEDICATIONS_SUCCESS';
const GET_MEDICATION_SUCCESS = 'GET_MEDICATION_SUCCESS';
const ADD_MEDICATION_SUCCESS = 'ADD_MEDICATION_SUCCESS';
const UPDATE_MEDICATION_SUCCESS = 'UPDATE_MEDICATION_SUCCESS';
const DELETE_MEDICATION_SUCCESS = 'DELETE_MEDICATION_SUCCESS';
const CLEAR_MEDICATION_ERROR = 'CLEAR_MEDICATION_ERROR';

// Reducer
const medicationReducer = (state, action) => {
  switch (action.type) {
    case MEDICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case MEDICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_MEDICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        medications: action.payload,
        error: null
      };
    case GET_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentMedication: action.payload,
        error: null
      };
    case ADD_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        medications: [action.payload, ...state.medications],
        currentMedication: action.payload,
        error: null
      };
    case UPDATE_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        medications: state.medications.map(med => 
          med._id === action.payload._id ? action.payload : med
        ),
        currentMedication: action.payload,
        error: null
      };
    case DELETE_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        medications: state.medications.filter(med => med._id !== action.payload),
        currentMedication: state.currentMedication && state.currentMedication._id === action.payload
          ? null
          : state.currentMedication,
        error: null
      };
    case CLEAR_MEDICATION_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Provider Component
export const MedicationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(medicationReducer, initialState);

  // Get all medications
  const getMedications = useCallback(async () => {
    dispatch({ type: MEDICATION_REQUEST });
    try {
      const res = await axios.get(`${API_URL}/medications`);
      dispatch({
        type: GET_MEDICATIONS_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: MEDICATION_FAILURE,
        payload: err.response?.data?.message || 'Failed to fetch medications'
      });
      throw err;
    }
  }, []);

  // Get a specific medication
  const getMedication = useCallback(async (id) => {
    dispatch({ type: MEDICATION_REQUEST });
    try {
      const res = await axios.get(`${API_URL}/medications/${id}`);
      dispatch({
        type: GET_MEDICATION_SUCCESS,
        payload: res.data
      });
      return res.data;
    } catch (err) {
      dispatch({
        type: MEDICATION_FAILURE,
        payload: err.response?.data?.message || 'Failed to fetch medication'
      });
      throw err;
    }
  }, []);

  // Add a new medication
  const addMedication = useCallback(async (medicationData) => {
    dispatch({ type: MEDICATION_REQUEST });
    try {
      const res = await axios.post(`${API_URL}/medications`, medicationData);
      dispatch({
        type: ADD_MEDICATION_SUCCESS,
        payload: res.data.medication
      });
      return res.data.medication;
    } catch (err) {
      dispatch({
        type: MEDICATION_FAILURE,
        payload: err.response?.data?.message || 'Failed to add medication'
      });
      throw err;
    }
  }, []);

  // Update a medication
  const updateMedication = useCallback(async (id, medicationData) => {
    dispatch({ type: MEDICATION_REQUEST });
    try {
      const res = await axios.put(`${API_URL}/medications/${id}`, medicationData);
      dispatch({
        type: UPDATE_MEDICATION_SUCCESS,
        payload: res.data.medication
      });
      return res.data.medication;
    } catch (err) {
      dispatch({
        type: MEDICATION_FAILURE,
        payload: err.response?.data?.message || 'Failed to update medication'
      });
      throw err;
    }
  }, []);

  // Delete a medication
  const deleteMedication = useCallback(async (id) => {
    dispatch({ type: MEDICATION_REQUEST });
    try {
      await axios.delete(`${API_URL}/medications/${id}`);
      dispatch({
        type: DELETE_MEDICATION_SUCCESS,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: MEDICATION_FAILURE,
        payload: err.response?.data?.message || 'Failed to delete medication'
      });
      throw err;
    }
  }, []);

  // Clear errors
  const clearError = useCallback(() => {
    dispatch({ type: CLEAR_MEDICATION_ERROR });
  }, []);

  // Context value
  const value = {
    ...state,
    getMedications,
    getMedication,
    addMedication,
    updateMedication,
    deleteMedication,
    clearError
  };

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  );
};

// Hook for using the medication context
export const useMedication = () => {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error('useMedication must be used within a MedicationProvider');
  }
  return context;
};
