// ProtectedRoute.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState('');
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
        setRole(response.data.user.role)
        if (response.status === 200){
            setIsAuthenticated(true)
          if(response.data.user.role !== 'admin') {
            navigate('/'); 
           }
        }else {throw Error}
      } catch (error) {
        setIsAuthenticated(false); 
      }
    };

    checkLoginStatus();
  

    if (!isAuthenticated || role === 'user') {
        return navigate('/'); 
    }

    return children;
};

export default ProtectedRoute;
