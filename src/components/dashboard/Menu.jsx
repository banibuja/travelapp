import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/AddUser"
            className="block text-blue-500 hover:text-blue-700 font-medium"
          >
            Add User
          </Link>
        </li>
        <li>
          <Link
            to="/ManageUser"
            className="block text-blue-500 hover:text-blue-700 font-medium"
          >
            Manage User
          </Link>
        </li>
      
        <li>
          <Link
            to="/managehometable"
            className="block text-blue-500 hover:text-blue-700 font-medium"
          >
            Manage  Home Table
          </Link>
        </li>

     

        <li>
          <Link
            to="/turqitable"
            className="block text-blue-500 hover:text-blue-700 font-medium"
          >
            Turqi Table
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="block text-red-500 hover:text-red-700 font-medium w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
