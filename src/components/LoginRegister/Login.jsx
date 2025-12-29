import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:5001/user', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        if (response.ok && data.user) {
          navigate('/');
        }
      } catch (error) {
        console.log('User is not logged in');
      }
    };
    checkLoginStatus();
  }, [navigate]);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5001/api/login',
        { username, password }
      );
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate(location.state?.from || '/');
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid username or password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 25%, #22d3ee 50%, #67e8f9 75%, #a5f3fc 100%)',
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #1e3a5f, #2d4a6f)' }}
        />
        <div
          className="absolute top-1/2 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'white' }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header */}
          <div
            className="px-8 py-8 text-center"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-cyan-200 text-sm">Sign in to continue your journey</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    style={{ background: '#f8fafc' }}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    style={{ background: '#f8fafc' }}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                  boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)'
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${message.includes('successful')
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                {message}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="font-bold hover:underline transition-colors duration-300"
                  style={{ color: '#0ea5e9' }}
                >
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-80">
            ✈️ Your adventure awaits
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
