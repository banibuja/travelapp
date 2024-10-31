import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';


function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
            setUser(response.data.user);
          } catch (error) {
            console.log('Error fetching user:', error);
          }
        };
        fetchUser();
      }, []);
    
      const handleLogout = async () => {
        try {
          await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
          setUser(null);
          window.location.href = '/login'; // Use window.location.href for navigation after logout
        } catch (error) {
          console.error('Logout error:', error.response || error.message);
        }
      };

  return (
    <header className="flex items-center justify-between px-10 py-5 bg-gradient-to-r from-red-500 to-indigo-600 shadow-xl rounded-b-lg text-white">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="https://shpejtimi-images-development-eu-central-1.s3.eu-central-1.amazonaws.com/ffb07819-7b4f-4090-9e37-3a0f9a1cace2"
          alt="TravelApp Logo"
          className="h-16 transform hover:scale-110 transition-transform duration-300 rounded-full shadow-lg"
        />
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`lg:flex lg:space-x-8 text-lg font-semibold ${
          menuOpen ? 'flex' : 'hidden'
        } flex-col lg:flex-row space-y-4 lg:space-y-0 absolute lg:relative top-full left-0 w-full lg:w-auto `}
      >
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          Ballina
        </a>
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          Rreth Ne
        </a>
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          Galeria
        </a>
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          Oferta Hoteli
        </a>
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          Destinacionet
        </a>
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          Turet
        </a>
        <a href="#" className="hover:text-red-500 transition-colors duration-200">
          GPS
        </a>
      </nav>

      {/* Social Media and Login */}
      <div className="hidden lg:flex items-center space-x-6">
      {user ? (
              <>
                <span className="text-white mr-4">Mirë se erdhe, {user.role === 'admin' ? 'Admin' : 'User'} {user.username}!</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">Çkyçu</button>
              </>
            ) : (
              <>
<a
          href="/login"
          className="bg-gradient-to-r from-red-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-red-500 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Login
        </a>
                        {/* <Link to="/register" className="text-white mr-4">Register</Link> */}
              </>
            )}
        {/* <a
          href="/login"
          className="bg-gradient-to-r from-red-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-red-500 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Login
        </a> */}
      </div>
    </header>
  )
}

export default Header
