import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { username, password },
        { withCredentials: true }
      );
      console.log('Login response:', response);
      setMessage('Login ishte i suksesshëm.');
      window.location.reload();
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error.response || error.message);
      setMessage('Gabim gjatë login.');
    }
  };

  return (

    // <Header />
    // <Header />

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Hyr</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shkruani username tuaj"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Shkruani password tuaj"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            Hyr
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}

        <p className="mt-6 text-center text-gray-600">
          Nuk keni llogari?{' '}
          <a href="/register" className="text-blue-600 font-semibold hover:underline">
            Regjistrohu këtu
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
