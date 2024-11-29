import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-session', { withCredentials: true });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false); 
        navigate('/login'); 
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow p-6">
        <div className="bg-blue-500 p-4 text-white mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
          <p className="text-gray-700">
            Select an option from the menu to manage users or add new ones.
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
}

export default Dashboard;
