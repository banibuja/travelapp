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
    
    <header>

      hh
    </header>
  )
}

export default Header
