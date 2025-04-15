import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { SunIcon, MoonIcon, HomeIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Mobile Numerology' },
    { path: '/name', label: 'Name Numerology' },
    { path: '/vehicle', label: 'Vehicle Numerology' },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link 
            to="/" 
            className="group -m-1.5 p-1.5 transition duration-200"
          >
            <span className="sr-only">Numerology Portal</span>
            <HomeIcon className="h-8 w-8 text-gray-700 transition-colors duration-200 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white" />
          </Link>
        </div>
        
        {/* Mobile menu button and auth */}
        <div className="flex items-center gap-x-4 lg:hidden">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-gray-900"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-gray-900"
            >
              Login
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-gray-800 dark:hover:ring-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base font-medium leading-6 px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900'
                  : 'text-gray-600 hover:bg-gray-900/50 hover:text-white dark:text-gray-400 dark:hover:bg-white/50 dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            onClick={toggleTheme}
            className="group rounded-lg p-2 text-gray-700 ring-1 ring-gray-900/10 transition duration-200 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-gray-800 dark:hover:ring-gray-700"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5 transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-white" />
            ) : (
              <MoonIcon className="h-5 w-5 transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm dark:bg-gray-900/80" 
               onClick={() => setIsMobileMenuOpen(false)} 
               aria-hidden="true" 
          />
          <div className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="-m-1.5 p-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Numerology Portal</span>
                <HomeIcon className="h-8 w-8 text-gray-700 dark:text-gray-300" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-lg p-2.5 text-gray-700 dark:text-gray-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-all duration-200 ${
                        location.pathname === item.path
                          ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                          : 'text-gray-900 hover:bg-gray-900/50 hover:text-white dark:text-gray-400 dark:hover:bg-white/50 dark:hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsMobileMenuOpen(false);
                    }}
                    className="rounded-lg p-2 text-gray-700 ring-1 ring-gray-900/10 dark:text-gray-400 dark:ring-gray-800"
                    aria-label="Toggle theme"
                  >
                    {isDarkMode ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 