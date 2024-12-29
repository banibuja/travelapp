import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';  
import axiosInstance from '../../axiosInstance';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  
  const location = useLocation();  



  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/user', { withCredentials: true });
        if (response.status === 200) {

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
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        { username, password }
      );
      setMessage('Login ishte i suksesshëm.');
      navigate(location.state?.from || '/');  // Redirect to the previous page or home
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Gabim gjatë login.');
    }
  };
  

  return (

    <><div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Hyr në Llogari</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Shkruani username tuaj"
              required />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Shkruani password tuaj"
              required />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Hyr
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        <p className="mt-6 text-center text-gray-600">
          Nuk keni llogari?{' '}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Regjistrohu këtu
          </a>
        </p>
      </div>
    </div></>
  );
};

export default Login;
