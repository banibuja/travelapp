import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post('http://localhost:5001/api/registerForm', formData, { withCredentials: true });
      setMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error during registration:', error.response || error.message);
      setMessage('Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'lastName', label: 'Last Name', type: 'text', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'number', label: 'Phone Number', type: 'tel', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { name: 'email', label: 'Email Address', type: 'email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'username', label: 'Username', type: 'text', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12">
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
          className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #1e3a5f, #2d4a6f)' }}
        />
        <div
          className="absolute top-1/4 left-10 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'white' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full opacity-15"
          style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
        />
      </div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-cyan-200 text-sm">Join us and start your adventure</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {fields.slice(0, 2).map((field) => (
                  <div className="mb-4" key={field.name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={field.name}>
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                        </svg>
                      </div>
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300 text-sm"
                        style={{ background: '#f8fafc' }}
                        placeholder={field.label}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              {fields.slice(2).map((field) => (
                <div className="mb-4" key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                      </svg>
                    </div>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                      style={{ background: '#f8fafc' }}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      required
                    />
                  </div>
                </div>
              ))}

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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                    style={{ background: '#f8fafc' }}
                    placeholder="Create a strong password"
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
                    Creating Account...
                  </span>
                ) : 'Create Account'}
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
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-bold hover:underline transition-colors duration-300"
                  style={{ color: '#0ea5e9' }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-8">
          <p className="text-white text-sm opacity-80">
            🌍 Discover amazing destinations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
