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
      <div className="bg-gradient-to-r from-red-500 to-indigo-600 min-h-screen">
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
          <div>
            <Link to="/" className="text-white mr-4">Home</Link>
            <Link to="/items" className="text-white mr-4">Items</Link>
            <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>

          </div>
    
        </nav>
        <div className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/add" element={<AddItem />} /> 
            <Route path="/edit/:id" element={<EditItem />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> 

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
