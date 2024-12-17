import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';

function ManageShtetet() {
  const [shtetet, setShtetet] = useState([]);
  const [message, setMessage] = useState('');
  const [editingShtetin, setEditingShtetin] = useState(null); 
  const [updatedFields, setUpdatedFields] = useState({}); 

  // Fetch all Shtetet
  useEffect(() => {
    const fetchShtetet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shtetet', {
          withCredentials: true,
        });
        setShtetet(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së Shtetet:', error);
      }
    };
    fetchShtetet();
  }, []);

  // Delete Shtetet
  const deleteShtetet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/shtetin-delete/${id}`, {
        withCredentials: true,
      });
      setShtetet(shtetet.filter((shteti) => shteti.id !== id));
      setMessage('Shteti u fshi me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë fshirjes së Shtetet.');
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

  // Update Shteti
  const updateShtetin = async (id) => {
    const updatedShteti = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/shtetin-update/${id}`, updatedShteti, {
        withCredentials: true,
      });
      setShtetet(shtetet.map((shteti) => (shteti.id === id ? response.data : shteti)));
      setEditingShtetin(null); 
      setMessage('Shteti u përditësua me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë përditësimit të Shtetet.');
    }
  };

  // Enable editing mode
  const startEditing = (shteti) => {
    setEditingShtetin(shteti);
    setUpdatedFields({
      emri: shteti.emri
    });
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4 overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menaxho Shtetet</h2>
        {message && (
          <p className={`mb-4 ${message.includes('sukses') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Emri</th>
              <th className="py-3 px-6 text-center">Opsione</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {shtetet.map((shteti) => (
              <tr key={shteti.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  {editingShtetin === shteti.id ? (
                    <input
                      type="text"
                      value={updatedFields.emri}
                      onChange={(e) => handleEditChange(e, 'emri')}
                      className="border w-32 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateShtetin(shteti.id)} // Save on blur
                    />
                  ) : (
                    shteti.emri
                  )}
                </td>
                
               


                <td className="py-3 px-6 text-center">
                <Modal onConfirm={ () => deleteShtetet(shteti.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
                </Modal>
                  <button
                    onClick={() => startEditing(shteti.id)}
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

export default ManageShtetet;
