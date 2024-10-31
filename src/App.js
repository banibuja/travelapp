import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import ItemList from './components/ItemsCrud/ItemList';
import AddItem from './components/ItemsCrud/AddItem';
import EditItem from './components/ItemsCrud/EditItem';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Header from './components/Header';

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
      window.location.href = '/login'; // Use window.location.href for navigation after logout
    } catch (error) {
      console.error('Logout error:', error.response || error.message);
    }
  };

  return (
    <Router>
      <div className="bg-gradient-to-r from-red-500 to-indigo-600 min-h-screen">
        {/* <nav className="bg-blue-500 p-4 flex justify-between items-center">
          <div>
            <Link to="/" className="text-white mr-4">Home</Link>
            <Link to="/items" className="text-white mr-4">Lista e Itemeve</Link>
            <Link to="/add" className="text-white mr-4">Shto Item</Link>
          </div>
          <div>
            {user ? (
              <>
                <span className="text-white mr-4">Mirë se erdhe, {user.role === 'admin' ? 'Admin' : 'User'} {user.username}!</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2">Çkyçu</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white mr-4">Login</Link>
                <Link to="/register" className="text-white mr-4">Register</Link>
              </>
            )}
          </div>
        </nav> */}
        <div className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/edit/:id" element={<EditItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
