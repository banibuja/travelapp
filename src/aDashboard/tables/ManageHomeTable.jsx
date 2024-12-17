import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function ManageHomeTable() {
  const [homes, setHomes] = useState([]);
  const [message, setMessage] = useState('');
  const [editingHome, setEditingHome] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  // Fetch all homes
  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/travel-plans', {
          withCredentials: true,
        });
        if (Array.isArray(response.data)) {
          setHomes(response.data);
        } else {
          console.error('Expected an array of homes');
        }
      } catch (error) {
        console.error('Error fetching homes:', error);
        setMessage('There was an error fetching homes.');
      }
    };
    
    fetchHomes();
  }, []);

  // Delete home
  const deleteHome = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/travel-plans/${id}`, {
        withCredentials: true,
      });
      setHomes(homes.filter((home) => home.id !== id));
      setMessage('Home deleted successfully.');
    } catch (error) {
      setMessage('Error deleting home.');
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

  // Update home
  const updateHome = async (id) => {
    const updatedHome = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/travel-plans/${id}`, updatedHome, {
        withCredentials: true,
      });
      setHomes(
        homes.map((home) => (home.id === id ? response.data : home))
      );
      setEditingHome(null); // Exit edit mode after successful update
      setMessage('Home updated successfully.');
    } catch (error) {
      setMessage('Error updating home.');
    }
  };

  // Enable editing mode
  const startEditing = (home) => {
    setEditingHome(home.id);
    setUpdatedFields({
      nisja_nga: home.nisja_nga,
      destinimi_hoteli: home.destinimi_hoteli,
      opsionet_neteve: home.opsionet_neteve,
      data: home.data,
      udhetaret: home.udhetaret,
    });
  };

  // Add new home
  const addHome = async () => {
    const newHome = {
      nisja_nga: updatedFields.nisja_nga,
      destinimi_hoteli: updatedFields.destinimi_hoteli,
      opsionet_neteve: updatedFields.opsionet_neteve,
      data: updatedFields.data,
      udhetaret: updatedFields.udhetaret,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/travel-plans', newHome, {
        withCredentials: true,
      });
      setHomes([...homes, response.data.home]);
      setMessage('Home added successfully.');
      window.location.reload(); 


      setUpdatedFields({}); 
    } catch (error) {
      setMessage('Error adding home.');
    }
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Homes</h2>
        {message && (
          <p
            className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}

        {/* Add new home form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nisja Nga"
            value={updatedFields.nisja_nga || ''}
            onChange={(e) => handleEditChange(e, 'nisja_nga')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Destinimi Hoteli"
            value={updatedFields.destinimi_hoteli || ''}
            onChange={(e) => handleEditChange(e, 'destinimi_hoteli')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Opsionet Neteve"
            value={updatedFields.opsionet_neteve || ''}
            onChange={(e) => handleEditChange(e, 'opsionet_neteve')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="date"
            placeholder="Data"
            value={updatedFields.data || ''}
            onChange={(e) => handleEditChange(e, 'data')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Udhetaret"
            value={updatedFields.udhetaret || ''}
            onChange={(e) => handleEditChange(e, 'udhetaret')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={addHome}
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add Home
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nisja Nga</th>
              <th className="py-3 px-6 text-left">Destinimi Hoteli</th>
              <th className="py-3 px-6 text-left">Opsionet Neteve</th>
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-left">Udhetaret</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
  {Array.isArray(homes) && homes.length > 0 ? (
    homes
      .filter((home) => home && home.id) 
      .map((home) => (
        <tr key={home.id} className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left">{home.id}</td>
          <td className="py-3 px-6 text-left">
            {editingHome === home.id ? (
              <input
                type="text"
                value={updatedFields.nisja_nga || ""}
                onChange={(e) => handleEditChange(e, "nisja_nga")}
                onBlur={() => updateHome(home.id)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              home.nisja_nga
            )}
          </td>
          <td className="py-3 px-6 text-left">
            {editingHome === home.id ? (
              <input
                type="text"
                value={updatedFields.destinimi_hoteli || ""}
                onChange={(e) => handleEditChange(e, "destinimi_hoteli")}
                onBlur={() => updateHome(home.id)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              home.destinimi_hoteli
            )}
          </td>
          <td className="py-3 px-6 text-left">
            {editingHome === home.id ? (
              <input
                type="text"
                value={updatedFields.opsionet_neteve || ""}
                onChange={(e) => handleEditChange(e, "opsionet_neteve")}
                onBlur={() => updateHome(home.id)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              home.opsionet_neteve
            )}
          </td>
          <td className="py-3 px-6 text-left">
            {editingHome === home.id ? (
              <input
                type="date"
                value={updatedFields.data || ""}
                onChange={(e) => handleEditChange(e, "data")}
                onBlur={() => updateHome(home.id)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              home.data
            )}
          </td>
          <td className="py-3 px-6 text-left">
            {editingHome === home.id ? (
              <input
                type="text"
                value={updatedFields.udhetaret || ""}
                onChange={(e) => handleEditChange(e, "udhetaret")}
                onBlur={() => updateHome(home.id)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            ) : (
              home.udhetaret
            )}
          </td>
          <td className="py-3 px-6 text-center">
            {editingHome === home.id ? (
              <button
                onClick={() => updateHome(home.id)}
                className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEditing(home)}
                className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
            )}
            <Modal onConfirm={ () => deleteHome(home.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
            </Modal>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-3">
        No data available
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
      {/* Menu */}
      <Menu />
    </div>
  );
}

export default ManageHomeTable;
