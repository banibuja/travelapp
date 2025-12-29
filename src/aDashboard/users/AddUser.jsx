import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu';

function AddUser() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    username: '',
    password: '',
    role: 'user',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5001/api/AddUser', formData, { withCredentials: true });
      setMessage('User created successfully!');
      setTimeout(() => {
        navigate('/dashboard/ManageUser');
      }, 2000);
    } catch (error) {
      setMessage('Error creating user. Please try again.');
      setIsLoading(false);
    }
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', half: true },
    { name: 'lastName', label: 'Last Name', type: 'text', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', half: true },
    { name: 'email', label: 'Email Address', type: 'email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'number', label: 'Phone Number', type: 'tel', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { name: 'username', label: 'Username', type: 'text', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'password', label: 'Password', type: 'password', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New User</h2>
                <p className="text-cyan-200 text-sm">Create a new user account</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((field) => (
                  <div key={field.name} className={field.half ? '' : 'md:col-span-2'}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                        </svg>
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300"
                        style={{ background: '#f8fafc' }}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        required
                      />
                    </div>
                  </div>
                ))}

                {/* Role Select */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    User Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-cyan-500 transition-all duration-300 appearance-none"
                      style={{ background: '#f8fafc' }}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="owner">Owner</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/ManageUser')}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                    boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)'
                  }}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create User
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success')
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
                }`}>
                <div className="flex items-center justify-center space-x-2">
                  {message.includes('success') ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span>{message}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
