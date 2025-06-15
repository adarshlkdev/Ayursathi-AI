import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  axios.defaults.baseURL = API_URL;
  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Check if token is expired
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            // Token expired, log out the user
            logout();
            return;
          }
          
          // Token valid, fetch user data
          const response = await axios.get('/auth/me');
          setUser(response.data.user);
        } catch (err) {
          console.error('Error initializing auth', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const register = async (userData) => {
    setError(null);
    try {
      const response = await axios.post('/auth/register', userData);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const response = await axios.post('/auth/login', credentials);
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    setError(null);
    try {
      const response = await axios.put('/user/profile', profileData);
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    }
  };

  const updateMedicalHistory = async (history) => {
    setError(null);
    try {
      const response = await axios.put('/user/medical-history', { medicalHistory: history });
      setUser(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Medical history update failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        updateMedicalHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
