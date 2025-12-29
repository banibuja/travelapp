import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

// Set axios defaults
axios.defaults.withCredentials = true;

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user role first
        const userResponse = await axios.get('http://localhost:5001/user');
        console.log('User response:', userResponse.data);

        if (userResponse.data && userResponse.data.user) {
          setRole(userResponse.data.user.role);

          // Now fetch users
          const usersResponse = await axios.get('http://localhost:5001/api/users-get');
          console.log('Users response:', usersResponse.data);
          setUsers(usersResponse.data || []);
        }
      } catch (error) {
        console.error('Error details:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
          setMessage('Session expired. Please login again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/users/${id}`, { withCredentials: true });
      setUsers(users.filter((user) => user.id !== id));
      setMessage('User deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting user.');
    }
  };

  const handleEditChange = (e, field) => {
    setUpdatedFields({ ...updatedFields, [field]: e.target.value });
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/users/${id}`, updatedFields, { withCredentials: true });
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setEditingUser(null);
      setMessage('User updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating user.');
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setUpdatedFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  };

  const filteredUsers = users.filter(user =>
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (userRole) => {
    const styles = {
      owner: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
      admin: { bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-500' },
      user: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
    };
    const style = styles[userRole] || styles.user;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
        <span className={`w-2 h-2 rounded-full ${style.dot} mr-2`}></span>
        {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Manage Users</h2>
                  <p className="text-cyan-200 text-sm">{users.length} users registered</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 text-white placeholder-white/60"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  />
                  <svg className="w-5 h-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => navigate('/dashboard/AddUser')}
                  className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add User</span>
                </button>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success')
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
              {message}
            </div>
          )}

          {/* Table */}
          <div className="p-8">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    {role === 'owner' && (
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                    )}
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{
                              background: `linear-gradient(135deg, ${['#f97316', '#0ea5e9', '#10b981', '#8b5cf6', '#ec4899'][index % 5]
                                }, ${['#fb923c', '#38bdf8', '#34d399', '#a78bfa', '#f472b6'][index % 5]
                                })`
                            }}
                          >
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                          </div>
                          <div>
                            {editingUser === user.id ? (
                              <div className="flex space-x-2">
                                <input
                                  type="text"
                                  value={updatedFields.firstName}
                                  onChange={(e) => handleEditChange(e, 'firstName')}
                                  className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-24 focus:border-cyan-500 focus:outline-none"
                                />
                                <input
                                  type="text"
                                  value={updatedFields.lastName}
                                  onChange={(e) => handleEditChange(e, 'lastName')}
                                  className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-24 focus:border-cyan-500 focus:outline-none"
                                />
                              </div>
                            ) : (
                              <>
                                <div className="font-semibold text-gray-800">{user.firstName} {user.lastName}</div>
                                <div className="text-xs text-gray-400">ID: {user.id}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {editingUser === user.id ? (
                          <input
                            type="email"
                            value={updatedFields.email}
                            onChange={(e) => handleEditChange(e, 'email')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-48 focus:border-cyan-500 focus:outline-none"
                          />
                        ) : (
                          <span className="text-gray-600">{user.email}</span>
                        )}
                      </td>
                      {role === 'owner' && (
                        <td className="px-6 py-4">
                          {editingUser === user.id ? (
                            <select
                              value={updatedFields.role}
                              onChange={(e) => handleEditChange(e, 'role')}
                              className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none"
                            >
                              <option value="owner">Owner</option>
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>
                          ) : (
                            getRoleBadge(user.role)
                          )}
                        </td>
                      )}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {editingUser === user.id ? (
                            <>
                              <button
                                onClick={() => updateUser(user.id)}
                                className="p-2 rounded-lg text-white hover:scale-110 transition-transform"
                                style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setEditingUser(null)}
                                className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:scale-110 transition-transform"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditing(user)}
                                className="p-2 rounded-lg text-white hover:scale-110 transition-transform"
                                style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <Modal onConfirm={() => deleteUser(user.id)}>
                                <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform"
                                  style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </Modal>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-400 text-lg">No users found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
