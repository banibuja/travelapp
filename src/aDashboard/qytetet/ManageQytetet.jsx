import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function ManageQytetet() {
  const [qytetet, setQytetet] = useState([]);
  const [message, setMessage] = useState('');
  const [editingQytetet, setEditingQytetet] = useState(null); 
  const [updatedFields, setUpdatedFields] = useState({}); 

  // Fetch all Qytetet
  useEffect(() => {
    const fetchQytetet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/qytetet', {
          withCredentials: true,
        });
        setQytetet(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së përdoruesve:', error);
      }
    };
    fetchQytetet();
  }, []);

  // Delete Qytetet
  const deleteQytetet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/qytetet-delete/${id}`, {
        withCredentials: true,
      });
      setQytetet(qytetet.filter((Qytetet) => Qytetet.id !== id));
      setMessage('Qytetet u fshi me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë fshirjes së Qytetet.');
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

  // Update Qytetet
  const updateQytetet = async (id) => {
    const updatedQytetet = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/qytetet-update/${id}`, updatedQytetet, {
        withCredentials: true,
      });
      setQytetet(qytetet.map((qyteti) => (qyteti.id === id ? response.data : qyteti)));
      setEditingQytetet(null); 
      setMessage('Qytetet u përditësua me sukses.');
    } catch (error) {
      setMessage('Gabim gjatë përditësimit të Qytetet.');
    }
  };

  // Enable editing mode
  const startEditing = (qyteti) => {
    setEditingQytetet(qyteti);
    setUpdatedFields({
      emri: qyteti.emri,
      shtetiId: qyteti.shtetiId,
    });
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4 overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Menaxho Qytetet</h2>
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
              <th className="py-3 px-6 text-center">Opsione</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {qytetet.map((qyteti) => (
              <tr key={qyteti.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  {editingQytetet === qyteti.id ? (
                    <input
                      type="text"
                      value={updatedFields.emri}
                      onChange={(e) => handleEditChange(e, 'emri')}
                      className="border w-32 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateQytetet(qyteti.id)} // Save on blur
                    />
                  ) : (
                    qyteti.emri
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingQytetet === qyteti.id ? (
                    <input
                      type="number"
                      value={updatedFields.shtetiId}
                      onChange={(e) => handleEditChange(e, 'shtetiId')}
                      className="border w-12 border-gray-300 rounded px-2 py-1"
                      onBlur={() => updateQytetet(qyteti.id)} // Save on blur
                    />
                  ) : (
                    qyteti.shtetiId
                  )}
                </td>
                
               


                <td className="py-3 px-6 text-center">
                  <Modal onConfirm={ () => deleteQytetet(qyteti.id)}>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                      >
                        Fshi
                      </button>
                  </Modal>
                  <button
                    onClick={() => startEditing(qyteti.id)}
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

export default ManageQytetet;
