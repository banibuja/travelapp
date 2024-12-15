import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'https://backend-c4qy.onrender.com', // Default URL
  withCredentials: true, // Include credentials if using cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
