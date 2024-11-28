import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Header from './components/Header';
import { AddItem, EditItem, ItemList } from './components/ItemsCrud/ItemCrud'; // Import CRUD components
import Dashboard from './components/dashboard/Dashboard';
import Turqi from './components/Turqi';
import Bullgari from './components/Bullgari';

const App = () => {
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
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error.response || error.message);
    }
  };

  return (
    <Router>
          <div className='overflow-hidden'>
            <Link to="/" className="text-white mr-4">Home</Link>
      

    
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turqi" element={<Turqi />} />
            <Route path="/bullgari" element={<Bullgari />} />


            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
