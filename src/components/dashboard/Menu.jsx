import React, {useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Menu() {
  const navigate = useNavigate();
  const [isTablesOpen, setIsTablesOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const tablesRef = useRef(null);
  const usersRef = useRef(null);

  
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

  const handleClickOutside = (event) => {
    if (
      tablesRef.current &&
      !tablesRef.current.contains(event.target)
    ) {
      setIsTablesOpen(false);
    }
    if (
      usersRef.current &&
      !usersRef.current.contains(event.target)
    ) {
      setIsUsersOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-64 bg-white shadow-lg p-4 h-screen flex flex-col">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu</h2>
  <div className="flex flex-col flex-grow">
    <div className="relative inline-block text-left " ref={tablesRef}>
      <button
        onClick={() => setIsTablesOpen(!isTablesOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Tables
      </button>
      {isTablesOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <li>
            <Link
              to="/dashboard/managehometable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage Home Table
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/turqitable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Turqi Table
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/dubaitable"
              className="block px-4 py-2 text-blue-500 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Dubai Table
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="relative inline-block text-left py-4" ref={usersRef}>
      <button
        onClick={() => setIsUsersOpen(!isUsersOpen)}
        className="block text-blue-500 hover:text-blue-700 font-medium"
      >
        Users
      </button>
      {isUsersOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
          <li>
            <Link
              to="/dashboard/AddUser"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Add User
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/ManageUser"
              className="block px-4 py-2 text-blue-700 font-bold hover:text-blue-700 hover:bg-gray-100"
            >
              Manage User
            </Link>
          </li>
        </ul>
      )}
    </div>
    <div className="mt-auto" id="bottom">
      <button
        onClick={handleLogout}
        className="block py-6 text-red-500 hover:text-red-700 font-medium w-full text-left"
      >
        Logout
      </button>
      <Link
        to="/"
        className="block text-blue-700 font-bold hover:text-blue-700 font-medium w-full text-left"
      >
        Go To Home
      </Link>
    </div>
  </div>
</div>

  );
}

export default Menu;
