import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const VehicleNumerology: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.dateOfBirth) {
      setDateOfBirth(user.dateOfBirth);
    }
  }, [user]);

  const formatVehicleNumber = (value: string): string => {
    // Remove all non-alphanumeric characters and convert to uppercase
    let formatted = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Format the number with hyphens
    if (formatted.length > 2) formatted = formatted.slice(0, 2) + '-' + formatted.slice(2);
    if (formatted.length > 5) formatted = formatted.slice(0, 5) + '-' + formatted.slice(5);
    if (formatted.length > 8) formatted = formatted.slice(0, 8) + '-' + formatted.slice(8);
    
    return formatted;
  };

  const isValidVehicleNumber = (value: string): boolean => {
    // Check if the format matches AA-99-AA-9999
    const regex = /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/;
    return regex.test(value);
  };

  const handleVehicleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let formatted = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    
    // Ensure first 2 characters are letters
    if (formatted.length > 0) {
      formatted = formatted.slice(0, 2).replace(/[^A-Z]/g, '') + formatted.slice(2);
    }
    
    // Ensure next 2 characters are numbers
    if (formatted.length > 2) {
      formatted = formatted.slice(0, 2) + formatted.slice(2, 4).replace(/[^0-9]/g, '') + formatted.slice(4);
    }
    
    // Ensure next 2 characters are letters
    if (formatted.length > 4) {
      formatted = formatted.slice(0, 4) + formatted.slice(4, 6).replace(/[^A-Z]/g, '') + formatted.slice(6);
    }
    
    // Ensure last 4 characters are numbers
    if (formatted.length > 6) {
      formatted = formatted.slice(0, 6) + formatted.slice(6).replace(/[^0-9]/g, '');
    }
    
    // Format with hyphens
    if (formatted.length > 2) formatted = formatted.slice(0, 2) + '-' + formatted.slice(2);
    if (formatted.length > 5) formatted = formatted.slice(0, 5) + '-' + formatted.slice(5);
    if (formatted.length > 8) formatted = formatted.slice(0, 8) + '-' + formatted.slice(8);
    
    setVehicleNumber(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('Please login to use this service');
      return;
    }

    if (!isValidVehicleNumber(vehicleNumber)) {
      setError('Please enter a valid vehicle number (format: AA-99-AA-9999)');
      return;
    }

    if (!dateOfBirth) {
      setError('Please enter your date of birth');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/numerology/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ vehicleNumber, dateOfBirth }),
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
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Vehicle Numerology
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
        Discover the hidden meaning behind your vehicle number and how it influences your journey.
      </p>
      
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="vehicleNumber" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Enter your vehicle number (format: AA-99-AA-9999)
              </label>
              <div className="mt-2.5 relative">
                <input
                  type="text"
                  id="vehicleNumber"
                  value={vehicleNumber}
                  onChange={handleVehicleNumberChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  placeholder="Enter vehicle number (e.g., KA-01-AB-1234)"
                  maxLength={13}
                />
                {isValidVehicleNumber(vehicleNumber) && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              {vehicleNumber.length > 0 && !isValidVehicleNumber(vehicleNumber) && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Please enter a valid vehicle number (format: AA-99-AA-9999)
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Date of Birth
              </label>
              <div className="mt-2.5">
                <input
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</div>
          )}

          <div className="mt-8">
            <button
              type="submit"
              className="block w-full rounded-md bg-gradient-to-r from-[#f87eb3] via-[#b490ff] to-[#8bb5ff] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f87eb3] transition-all duration-200"
            >
              Calculate Numerology
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-16 rounded-3xl bg-white/5 p-8 ring-1 ring-gray-900/10 dark:ring-white/10">
            <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
              Your Numerology Result
            </h3>
            <dl className="mt-6 space-y-4">
              <div className="flex flex-col gap-y-3">
                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-300">Vehicle Number</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {result.vehicleNumber}
                </dd>
              </div>
              <div className="flex flex-col gap-y-3">
                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-300">Vehicle Number</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {result.vehicleNumber}
                </dd>
              </div>
              <div className="flex flex-col gap-y-3">
                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-300">Interpretation</dt>
                <dd className="text-base leading-7 text-gray-600 dark:text-gray-300">
                  {result.interpretation}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleNumerology; 