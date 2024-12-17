import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('localhost:5000/user', { withCredentials: true });
        setRole(response.data.user.role)
        if (response.status === 200 && (response.data.user.role === 'admin' || response.data.user.role === 'owner')) {
            setIsLoggedIn(true);
        }else {throw Error}
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
    <div>
      
    </div>
  )
}

export default Dashboard