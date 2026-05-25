import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Intropage from './pages/Intropage'
import Features from './pages/Features'
import Docs from './pages/Docs'
import About from './pages/About'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intropage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}
