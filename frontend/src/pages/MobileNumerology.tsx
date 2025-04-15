import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const MobileNumerology: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileNumber, setMobileNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('Please login to use this service');
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/numerology/mobile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ mobileNumber }),
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
          Mobile Number Numerology
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your 10-digit mobile number
            </label>
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter mobile number"
              maxLength={10}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-rose-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Your Numerology Result
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Mobile Number:</span> {result.mobileNumber}
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

export default MobileNumerology; 