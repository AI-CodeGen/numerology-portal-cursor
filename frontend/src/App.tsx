import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import MobileNumerology from './pages/MobileNumerology';
import NameNumerology from './pages/NameNumerology';
import VehicleNumerology from './pages/VehicleNumerology';
import Login from './pages/Login';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="relative isolate">
              {/* Dot pattern background */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute h-full w-full"
                  style={{
                    backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    opacity: 0.4,
                  }}
                />
              </div>
              
              {/* Primary gradient blob */}
              <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff3388] via-[#ff5c9e] via-[#9b6fff] to-[#4d8fff] opacity-[0.35] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-[0.2]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                  }}
                />
              </div>

              {/* Secondary gradient blob */}
              <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff3388] via-[#ff47b5] via-[#8a4fff] to-[#4d8fff] opacity-[0.35] sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] dark:opacity-[0.2]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                  }}
                />
              </div>

              {/* Light noise texture */}
              <div 
                className="absolute inset-0 -z-10 h-full w-full opacity-[0.03] dark:opacity-[0.02]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '200px 200px',
                }}
              />

              <Header />
              <main className="relative mx-auto max-w-7xl min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                  <Routes>
                    <Route path="/" element={<MobileNumerology />} />
                    <Route path="/name" element={<NameNumerology />} />
                    <Route path="/vehicle" element={<VehicleNumerology />} />
                    <Route path="/login" element={<Login />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 