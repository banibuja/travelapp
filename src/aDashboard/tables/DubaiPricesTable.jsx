import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function DubaiPricesTable() {
  const [dubaiPrices, setDubaiPrices] = useState([]);
  const [message, setMessage] = useState('');
  const [editingDubaiPrice, setEditingDubaiPrice] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  // Fetch all dubai prices
  useEffect(() => {
    const fetchDubaiPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dubai-price', {
          withCredentials: true,
        });
        setDubaiPrices(response.data);
      } catch (error) {
        console.error('Error fetching dubai prices:', error);
        setMessage('There was an error fetching dubai prices.');
      }
    };

    fetchDubaiPrices();
  }, []);

  // Delete dubai price
  const deleteDubaiPrice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/dubai-prices-delete/${id}`, {
        withCredentials: true,
      });
      setDubaiPrices(dubaiPrices.filter((price) => price.id !== id));
      setMessage('Dubai price deleted successfully.');
    } catch (error) {
      setMessage('Error deleting dubai price.');
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

  // Update dubai price
  const updateDubaiPrice = async (id) => {
    const updatedPrice = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/dubai-prices-update/${id}`, updatedPrice, {
        withCredentials: true,
      });
      setDubaiPrices(
        dubaiPrices.map((price) => (price.id === id ? response.data : price))
      );
      setEditingDubaiPrice(null); // Exit edit mode after successful update
      setMessage('Dubai price updated successfully.');
    } catch (error) {
      setMessage('Error updating dubai price.');
    }
  };

  // Enable editing mode
  const startEditing = (price) => {
    setEditingDubaiPrice(price.id);
    setUpdatedFields({
      nisja: price.nisja,
      tipi_dhomes: price.tipi_dhomes,
      udhetimi: price.udhetimi,
      cmimi: price.cmimi,
      sherbimi: price.sherbimi
    });
  };

  // Add new dubai price
  const addDubaiPrice = async () => {
    const newPrice = {
      nisja: updatedFields.nisja,
      tipi_dhomes: updatedFields.tipi_dhomes,
      udhetimi: updatedFields.udhetimi,
      cmimi: updatedFields.cmimi,
      sherbimi: updatedFields.sherbimi
    };

    try {
      const response = await axios.post('http://localhost:5000/api/add-dubai-price', newPrice, {
        withCredentials: true,
      });
      setDubaiPrices([...dubaiPrices, response.data.dubaiPrice]);
      setMessage('Dubai price added successfully.');
      setUpdatedFields({});
    } catch (error) {
      setMessage('Error adding dubai price.');
    }
  };

  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Dubai Prices</h2>
        {message && (
          <p
            className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}
        
        {/* Add new dubai price form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nisja"
            value={updatedFields.nisja || ''}
            onChange={(e) => handleEditChange(e, 'nisja')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Tipi dhomes"
            value={updatedFields.tipi_dhomes || ''}
            onChange={(e) => handleEditChange(e, 'tipi_dhomes')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Udhetimi"
            value={updatedFields.udhetimi || ''}
            onChange={(e) => handleEditChange(e, 'udhetimi')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="çmimi"
            value={updatedFields.cmimi || ''}
            onChange={(e) => handleEditChange(e, 'cmimi')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Sherbimi"
            value={updatedFields.sherbimi || ''}
            onChange={(e) => handleEditChange(e, 'sherbimi')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={addDubaiPrice}
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add Dubai Price
          </button>
        </div>
        




        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">nisja</th>
              <th className="py-3 px-6 text-left">tipi dhomes</th>
              <th className="py-3 px-6 text-left">udhetimi</th>
              <th className="py-3 px-6 text-left">cmimi</th>
              <th className="py-3 px-6 text-left">sherbimi</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {dubaiPrices.map((price) => (
              <tr key={price.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{price.id}</td>
                <td className="py-3 px-6 text-left">
                  {editingDubaiPrice === price.id ? (
                    <input
                      type="text"
                      value={updatedFields.dubai_type}
                      onChange={(e) => handleEditChange(e, 'nisja')}
                      onBlur={() => updateDubaiPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.nisja
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingDubaiPrice === price.id ? (
                    <input
                      type="text"
                      value={updatedFields.service}
                      onChange={(e) => handleEditChange(e, 'tipi_dhomes')}
                      onBlur={() => updateDubaiPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.tipi_dhomes
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingDubaiPrice === price.id ? (
                    <input
                      type="number"
                      value={updatedFields.price_1}
                      onChange={(e) => handleEditChange(e, 'udhetimi')}
                      onBlur={() => updateDubaiPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.udhetimi
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingDubaiPrice === price.id ? (
                    <input
                      type="number"
                      value={updatedFields.price_2}
                      onChange={(e) => handleEditChange(e, 'cmimi')}
                      onBlur={() => updateDubaiPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.cmimi
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingDubaiPrice === price.id ? (
                    <input
                      type="text"
                      value={updatedFields.price_2}
                      onChange={(e) => handleEditChange(e, 'sherbimi')}
                      onBlur={() => updateDubaiPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.sherbimi
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                <Modal onConfirm={ () => deleteDubaiPrice(price.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
                </Modal>
                  <button
                    onClick={() => startEditing(price)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 ml-2 transition duration-200"
                  >
                    Edit
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

export default DubaiPricesTable;
