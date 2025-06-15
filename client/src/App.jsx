import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DiagnosisProvider } from './context/DiagnosisContext'
import { MedicationProvider } from './context/MedicationContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DiagnoseForm from './pages/DiagnoseForm'
import DiagnosisResults from './pages/DiagnosisResults'
import History from './pages/History'
import Profile from './pages/Profile'
import Medications from './pages/Medications'
import AyurvedicGuidance from './pages/AyurvedicGuidance'
import TraditionalRemedies from './pages/TraditionalRemedies'

function App() {
  return (
    <Router>
      <AuthProvider>
        <DiagnosisProvider>
          <MedicationProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route path="dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="diagnose" element={
                  <ProtectedRoute>
                    <DiagnoseForm />
                  </ProtectedRoute>
                } />
                
                <Route path="results/:id" element={
                  <ProtectedRoute>
                    <DiagnosisResults />
                  </ProtectedRoute>
                } />
                
                <Route path="history" element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                } />
                
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                <Route path="medications" element={
                  <ProtectedRoute>
                    <Medications />
                  </ProtectedRoute>
                } />
                
                <Route path="ayurvedic-guidance" element={
                  <ProtectedRoute>
                    <AyurvedicGuidance />
                  </ProtectedRoute>
                } />
                
                <Route path="traditional-remedies" element={
                  <TraditionalRemedies />
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </MedicationProvider>
        </DiagnosisProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
