import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const VehicleNumerology: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('Please login to use this service');
      return;
    }

    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle number');
      return;
    }

    if (vehicleNumber.length > 12) {
      setError('Vehicle number should not exceed 12 characters');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/numerology/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ vehicleNumber }),
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
          Vehicle Number Numerology
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your vehicle number (max 12 characters)
            </label>
            <input
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter vehicle number"
              maxLength={12}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Calculate
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Your Numerology Result
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Vehicle Number:</span> {result.vehicleNumber}
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

export default VehicleNumerology; 