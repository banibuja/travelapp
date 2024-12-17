import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function ManageAirports() {
  const [airports, setAirports] = useState([]);
  const [message, setMessage] = useState('');
  const [editingAirport, setEditingAirport] = useState(null); 
  const [updatedFields, setUpdatedFields] = useState({}); 

  // Fetch all Airports
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/airports', {
          withCredentials: true,
        });
        setAirports(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së përdoruesve:', error);
      }
    };
    fetchAirports();
  }, []);

  // Delete Airport
  const deleteAirport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/airports-delete/${id}`, {
        withCredentials: true,
      });
      setAirports(airports.filter((Airport) => Airport.id !== id));
      setMessage('Airports u fshi me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë fshirjes së Airports.');
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

  // Update Airports
  const updateAirport = async (id) => {
    const updatedAirport = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/airports-update/${id}`, updatedAirport, {
        withCredentials: true,
      });
      setAirports(airports.map((airport) => (airport.id === id ? response.data : airport)));
      setEditingAirport(null); 
      setMessage('Airport u përditësua me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë përditësimit të Airports.');
    }
  };

  // Enable editing mode
  const startEditing = (airport) => {
    setEditingAirport(airport);
    setUpdatedFields({
      emri: airport.emri,
      akronimi: airport.akronimi,
      shtetiId: airport.shtetiId,
    });
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4 overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menaxho Airports</h2>
        {message && (
          <p className={`mb-4 ${message.includes('sukses') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">titulli</th>
              <th className="py-3 px-6 text-left">akronimi</th>
              <th className="py-3 px-6 text-left">shtetiId</th>
              <th className="py-3 px-6 text-center">Opsione</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {airports.map((airport) => (
              <tr key={airport.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  {editingAirport === airport.id ? (
                    <input
                      type="text"
                      value={updatedFields.emri}
                      onChange={(e) => handleEditChange(e, 'emri')}
                      className="border w-32 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAirport(airport.id)} // Save on blur
                    />
                  ) : (
                    airport.emri
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAirport === airport.id ? (
                    <input
                      type="text"
                      value={updatedFields.akronimi}
                      onChange={(e) => handleEditChange(e, 'akronimi')}
                      className="border w-20 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAirport(airport.id)} // Save on blur
                    />
                  ) : (
                    airport.akronimi
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAirport === airport.id ? (
                    <input
                      type="number"
                      value={updatedFields.shtetiId}
                      onChange={(e) => handleEditChange(e, 'shtetiId')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAirport(airport.id)} // Save on blur
                    />
                  ) : (
                    airport.shtetiId
                  )}
                </td>
                
               


                <td className="py-3 px-6 text-center">
                  <Modal onConfirm={ () => deleteAirport(airport.id)}>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Fshi
                      </button>
                  </Modal>
                  <button
                    onClick={() => startEditing(airport.id)}
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
        <Menu />
    </div>
  );
}

export default ManageAirports;
