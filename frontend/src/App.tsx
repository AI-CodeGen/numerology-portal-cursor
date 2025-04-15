import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import MobileNumerology from './pages/MobileNumerology';
import NameNumerology from './pages/NameNumerology';
import VehicleNumerology from './pages/VehicleNumerology';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-b from-rose-100 to-rose-200 dark:from-gray-800 dark:to-gray-900">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<MobileNumerology />} />
                  <Route path="/name" element={<NameNumerology />} />
                  <Route path="/vehicle" element={<VehicleNumerology />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App; 