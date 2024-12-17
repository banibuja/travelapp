import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check login status when component mounts
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
                setRole(response.data.user.role);

                if (response.status === 200) {
                    setIsAuthenticated(true);
                    if (response.data.user.role !== 'admin' && response.data.user.role !== 'owner') {
                        navigate('/'); 
                    }
                } else {
                    throw new Error('Invalid response');
                }
            } catch (error) {
                setIsAuthenticated(false); // Set authentication status to false if there's an error
                navigate('/'); // Redirect in case of error (e.g., user not logged in)
            }
        };

        checkLoginStatus();
    }, [navigate]); // The effect should only re-run if `navigate` changes

    // Don't render children until the authentication status is resolved
    if (isAuthenticated === undefined) {
        return <div>Loading...</div>; // Optionally show a loading indicator
    }

    // If not authenticated or if role is 'user', redirect
    if (!isAuthenticated || role === 'user') {
        return null; // Optionally show a loading indicator or nothing while redirecting
    }

    return children; // Render children (protected route) if authenticated and role is 'admin'
};

export default ProtectedRoute;
