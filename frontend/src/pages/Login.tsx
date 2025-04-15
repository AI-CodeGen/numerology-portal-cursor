import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
    if (value.length < 10) {
      setMobileNumberError('Mobile number must be 10 digits');
    } else {
      setMobileNumberError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 30);
    setPassword(value);
    if (value.length > 30) {
      setPasswordError('Password cannot exceed 30 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
    if (!e.target.value) {
      setDateOfBirthError('Date of birth is required');
    } else {
      setDateOfBirthError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mobileNumber.length !== 10) {
      setMobileNumberError('Mobile number must be 10 digits');
      return;
    }

    if (password.length > 30) {
      setPasswordError('Password cannot exceed 30 characters');
      return;
    }

    if (isRegistering && !dateOfBirth) {
      setDateOfBirthError('Date of birth is required');
      return;
    }

    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      
      // Convert YYYY-MM-DD to DD/MM/YYYY for registration
      let formattedDate = '';
      if (isRegistering && dateOfBirth) {
        const [year, month, day] = dateOfBirth.split('-');
        formattedDate = `${day}/${month}/${year}`;
      }

      const requestBody = isRegistering
        ? { mobileNumber, password, dateOfBirth: formattedDate }
        : { mobileNumber, password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || (isRegistering ? 'Registration failed' : 'Login failed'));
      }

      const data = await response.json();
      
      // Convert DD/MM/YYYY back to YYYY-MM-DD for the frontend
      let formattedDateOfBirth = '';
      if (data.user.dateOfBirth) {
        const [day, month, year] = data.user.dateOfBirth.split('/');
        formattedDateOfBirth = `${year}-${month}-${day}`;
      }

      login({ 
        id: data.user.id, 
        mobileNumber: data.user.mobileNumber,
        dateOfBirth: formattedDateOfBirth,
        placeOfBirth: data.user.placeOfBirth
      });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (!response.ok) {
        throw new Error('Google authentication failed');
      }

      const data = await response.json();
      login({ id: data.userId, googleId: data.googleId });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative isolate">
        {/* Background gradients */}
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

        <div className="w-[440px] h-[504px] flex flex-col p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="mb-4">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {isRegistering ? 'Create your account' : 'Sign in to your account'}
            </h2>
          </div>
          <form className="flex-1 flex flex-col overflow-hidden" onSubmit={handleSubmit}>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  inputMode="numeric"
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    mobileNumberError ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
                {mobileNumberError && (
                  <p className="mt-1 text-sm text-red-500">{mobileNumberError}</p>
                )}
              </div>

              {isRegistering && (
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    required
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      dateOfBirthError ? 'border-red-500' : 'border-gray-300'
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                    value={dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {dateOfBirthError && (
                    <p className="mt-1 text-sm text-red-500">{dateOfBirthError}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  maxLength={30}
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    passwordError ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-2">{error}</div>
            )}

            <div className="space-y-2 mt-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                {isRegistering ? 'Register' : 'Sign in'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
                  onClick={() => setIsRegistering(!isRegistering)}
                >
                  {isRegistering
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Register"}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-2 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google authentication failed')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 