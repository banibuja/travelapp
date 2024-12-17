import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function ManageAranzhmanet() {
  const [aranzhmanet, setAranzhmanet] = useState([]);
  const [airports, setAirports] = useState([]);
  const [message, setMessage] = useState('');
  const [editingAranzhmanet, setEditingAranzhmanet] = useState(null); 
  const [updatedFields, setUpdatedFields] = useState({}); 

  // Fetch all Aranzhmanets
  useEffect(() => {
    const fetchAranzhmanet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/aranzhmanet', {
          withCredentials: true,
        });
        setAranzhmanet(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së përdoruesve:', error);
      }
    };
    fetchAranzhmanet();
  }, []);

  // Delete aranzhman
  const deleteAranzhman = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/Aranzhmani-delete/${id}`, {
        withCredentials: true,
      });
      setAranzhmanet(aranzhmanet.filter((aranzhmani) => aranzhmani.id !== id));
      setMessage('Aranzhmani u fshi me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë fshirjes së aranzhmanit.');
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

  // Update Aranzhmani
  const updateAranzhmani = async (id) => {
    const updatedAranzhmani = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/Aranzhmani-update/${id}`, updatedAranzhmani, {
        withCredentials: true,
      });
      setAranzhmanet(aranzhmanet.map((aranzhman) => (aranzhman.id === id ? response.data : aranzhman)));
      setEditingAranzhmanet(null); 
      setMessage('Aranzhman u përditësua me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë përditësimit të aranzhmanit.');
    }
  };

  // Enable editing mode
  const startEditing = (aranzhman) => {
    setEditingAranzhmanet(aranzhman.id);
    setUpdatedFields({
      titulli: aranzhman.titulli,
      shtetiId: aranzhman.shtetiId,
      cmimi: aranzhman.cmimi,
      nrPersonave: aranzhman.nrPersonave,
      nrNeteve: aranzhman.nrNeteve,
      llojiDhomes: aranzhman.llojiDhomes,
      sherbimi: aranzhman.sherbimi,
      dataNisjes: aranzhman.dataNisjes,
      dataKthimit: aranzhman.dataKthimit,
      airportId: aranzhman.airportId,
      rating: aranzhman.rating,
    });
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4 overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menaxho Aranzhmanet</h2>
        {message && (
          <p className={`mb-4 ${message.includes('sukses') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">titulli</th>
              <th className="py-3 px-6 text-left">shtetiId</th>
              <th className="py-3 px-6 text-left">cmimi</th>
              <th className="py-3 px-6 text-left">nrPersonave</th>
              <th className="py-3 px-6 text-left">nrNeteve</th>
              <th className="py-3 px-6 text-left">llojiDhomes</th>
              <th className="py-3 px-6 text-left">sherbimi</th>
              <th className="py-3 px-6 text-left">dataNisjes</th>
              <th className="py-3 px-6 text-left">dataKthimit</th>
              <th className="py-3 px-6 text-left">airportId</th>
              <th className="py-3 px-6 text-left">rating</th>
              <th className="py-3 px-6 text-center">Opsione</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {aranzhmanet.map((aranzhman) => (
              <tr key={aranzhman.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="text"
                      value={updatedFields.titulli}
                      onChange={(e) => handleEditChange(e, 'titulli')}
                      className="border w-32 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.titulli
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="number"
                      value={updatedFields.shtetiId}
                      onChange={(e) => handleEditChange(e, 'shtetiId')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.shtetiId
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="number"
                      value={updatedFields.cmimi}
                      onChange={(e) => handleEditChange(e, 'cmimi')}
                      className="border w-20 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.cmimi
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="number"
                      value={updatedFields.nrPersonave}
                      onChange={(e) => handleEditChange(e, 'nrPersonave')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.nrPersonave
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="number"
                      value={updatedFields.nrNeteve}
                      onChange={(e) => handleEditChange(e, 'nrNeteve')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.nrNeteve
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="text"
                      value={updatedFields.llojiDhomes}
                      onChange={(e) => handleEditChange(e, 'llojiDhomes')}
                      className="border w-32 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.llojiDhomes
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="text"
                      value={updatedFields.sherbimi}
                      onChange={(e) => handleEditChange(e, 'sherbimi')}
                      className="border w-32 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.sherbimi
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="date"
                      value={updatedFields.dataNisjes}
                      onChange={(e) => handleEditChange(e, 'dataNisjes')}
                      className="border border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.dataNisjes
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="date"
                      value={updatedFields.dataKthimit}
                      onChange={(e) => handleEditChange(e, 'dataKthimit')}
                      className="border border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.dataKthimit
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="number"
                      value={updatedFields.airportId}
                      onChange={(e) => handleEditChange(e, 'airportId')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.airportId
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingAranzhmanet === aranzhman.id ? (
                    <input
                      type="number"
                      value={updatedFields.rating}
                      onChange={(e) => handleEditChange(e, 'rating')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateAranzhmani(aranzhman.id)} // Save on blur
                    />
                  ) : (
                    aranzhman.rating
                  )}
                </td>




                <td className="py-3 px-6 text-center">
                  <Modal onConfirm={ () => deleteAranzhman(aranzhman.id)}>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Fshi
                      </button>
                  </Modal>
                  <button
                    onClick={() => startEditing(aranzhman)}
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

export default ManageAranzhmanet;
