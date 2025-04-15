import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { SunIcon, MoonIcon, HomeIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

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
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-400 dark:ring-gray-800 dark:hover:ring-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
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
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 