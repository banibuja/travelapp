import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from './Menu';

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUser, setEditingUser] = useState(null); 
  const [updatedFields, setUpdatedFields] = useState({}); 

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users-get', {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së përdoruesve:', error);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user.id !== id));
      setMessage('Përdoruesi u fshi me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë fshirjes së përdoruesit.');
    }
  };

  // Handle input changes for editing
  const handleEditChange = (e, field) => {
    const { value } = e.target;
    setUpdatedFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  // Update user
  const updateUser = async (id) => {
    const updatedUser = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, updatedUser, {
        withCredentials: true,
      });
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
      setEditingUser(null); 
      setMessage('Përdoruesi u përditësua me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë përditësimit të përdoruesit.');
    }
  };

  // Enable editing mode
  const startEditing = (user) => {
    setEditingUser(user.id);
    setUpdatedFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menaxho Përdoruesit</h2>
        {message && (
          <p className={`mb-4 ${message.includes('sukses') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Emri</th>
              <th className="py-3 px-6 text-left">Mbiemri</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Opsione</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{user.id}</td>
                <td className="py-3 px-6 text-left">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={updatedFields.firstName}
                      onChange={(e) => handleEditChange(e, 'firstName')}
                      onBlur={() => updateUser(user.id)} // Save on blur
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    user.firstName
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingUser === user.id ? (
                    <input
                      type="text"
                      value={updatedFields.lastName}
                      onChange={(e) => handleEditChange(e, 'lastName')}
                      onBlur={() => updateUser(user.id)} // Save on blur
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    user.lastName
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingUser === user.id ? (
                    <input
                      type="email"
                      value={updatedFields.email}
                      onChange={(e) => handleEditChange(e, 'email')}
                      onBlur={() => updateUser(user.id)} // Save on blur
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Fshi
                  </button>
                  <button
                    onClick={() => startEditing(user)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 ml-2 transition duration-200"
                  >
                    Përditëso
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Menu on the right */}
      <div className="w-64 bg-white shadow-lg p-4">
        <Menu />
      </div>
    </div>
  );
}

export default ManageUser;