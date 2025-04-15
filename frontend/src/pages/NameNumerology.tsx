import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const NameNumerology: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('Please login to use this service');
      return;
    }

    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (name.length > 50) {
      setError('Name should not exceed 50 characters');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/numerology/name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to calculate numerology');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to calculate numerology. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Name Numerology
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your name (max 50 characters)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your name"
              maxLength={50}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Your Numerology Result
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Name:</span> {result.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Destiny Number:</span> {result.destinyNumber}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Interpretation:</span> {result.interpretation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameNumerology; 