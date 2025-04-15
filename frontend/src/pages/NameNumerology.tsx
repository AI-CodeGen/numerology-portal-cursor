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
      setError('Please enter a valid name');
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
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Name Numerology
      </h2>
      <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
        Discover the hidden meaning behind your name and how it influences your life path.
      </p>
      
      <div className="mt-10">
        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Enter your full name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your name"
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
              className="block w-full rounded-md bg-rose-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
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
                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-300">Name</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {result.name}
                </dd>
              </div>
              <div className="flex flex-col gap-y-3">
                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-300">Life Path Number</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {result.lifePathNumber}
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

export default NameNumerology; 