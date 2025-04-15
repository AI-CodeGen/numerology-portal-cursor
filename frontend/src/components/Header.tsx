import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
              Numerology Portal
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`${
                  location.pathname === '/'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-rose-500`}
              >
                Mobile Number
              </Link>
              <Link
                to="/name"
                className={`${
                  location.pathname === '/name'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-500`}
              >
                Name
              </Link>
              <Link
                to="/vehicle"
                className={`${
                  location.pathname === '/vehicle'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-green-500`}
              >
                Vehicle Number
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 