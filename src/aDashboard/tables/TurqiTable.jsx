import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function ManageRoomPricesTable() {
  const [roomPrices, setRoomPrices] = useState([]);
  const [message, setMessage] = useState('');
  const [editingRoomPrice, setEditingRoomPrice] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  // Fetch all room prices
  useEffect(() => {
    const fetchRoomPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/room-price', {
          withCredentials: true,
        });
        setRoomPrices(response.data);
      } catch (error) {
        console.error('Error fetching room prices:', error);
        setMessage('There was an error fetching room prices.');
      }
    };

    fetchRoomPrices();
  }, []);

  // Delete room price
  const deleteRoomPrice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/room-prices-delete/${id}`, {
        withCredentials: true,
      });
      setRoomPrices(roomPrices.filter((price) => price.id !== id));
      setMessage('Room price deleted successfully.');
    } catch (error) {
      setMessage('Error deleting room price.');
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

  // Update room price
  const updateRoomPrice = async (id) => {
    const updatedPrice = {
      ...updatedFields,
    };

    try {
      const response = await axios.put(`http://localhost:5000/api/room-prices-update/${id}`, updatedPrice, {
        withCredentials: true,
      });
      setRoomPrices(
        roomPrices.map((price) => (price.id === id ? response.data : price))
      );
      setEditingRoomPrice(null); // Exit edit mode after successful update
      setMessage('Room price updated successfully.');
    } catch (error) {
      setMessage('Error updating room price.');
    }
  };

  // Enable editing mode
  const startEditing = (price) => {
    setEditingRoomPrice(price.id);
    setUpdatedFields({
      room_type: price.room_type,
      service: price.service,
      price_1: price.price_1,
      price_2: price.price_2,
    });
  };

  // Add new room price
  const addRoomPrice = async () => {
    const newPrice = {
      room_type: updatedFields.room_type,
      service: updatedFields.service,
      price_1: updatedFields.price_1,
      price_2: updatedFields.price_2,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/add-room-price', newPrice, {
        withCredentials: true,
      });
      setRoomPrices([...roomPrices, response.data.roomPrice]);
      setMessage('Room price added successfully.');
      setUpdatedFields({});
    } catch (error) {
      setMessage('Error adding room price.');
    }
  };

  return (
<div className="flex flex-col lg:flex-row">
  {/* Main content area */}
  <div className="flex-grow p-4 w-full lg:w-2/3">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Room Prices</h2>
    {message && (
      <p
        className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
      >
        {message}
      </p>
    )}
    
    {/* Add new room price form */}
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-5 gap-4 sm:w-[50rem]">
      <input
        type="text"
        placeholder="Room Type"
        value={updatedFields.room_type || ''}
        onChange={(e) => handleEditChange(e, 'room_type')}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <input
        type="text"
        placeholder="Service"
        value={updatedFields.service || ''}
        onChange={(e) => handleEditChange(e, 'service')}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <input
        type="number"
        placeholder="Price 1"
        value={updatedFields.price_1 || ''}
        onChange={(e) => handleEditChange(e, 'price_1')}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <input
        type="number"
        placeholder="Price 2"
        value={updatedFields.price_2 || ''}
        onChange={(e) => handleEditChange(e, 'price_2')}
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <button
        onClick={addRoomPrice}
        className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
        >
        Add Room Price
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Room Type</th>
            <th className="py-3 px-6 text-left">Service</th>
            <th className="py-3 px-6 text-left">Price 1</th>
            <th className="py-3 px-6 text-left">Price 2</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {roomPrices.map((price) => (
            <tr key={price.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{price.id}</td>
              <td className="py-3 px-6 text-left">
                {editingRoomPrice === price.id ? (
                  <input
                    type="text"
                    value={updatedFields.room_type}
                    onChange={(e) => handleEditChange(e, 'room_type')}
                    onBlur={() => updateRoomPrice(price.id)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  price.room_type
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingRoomPrice === price.id ? (
                  <input
                    type="text"
                    value={updatedFields.service}
                    onChange={(e) => handleEditChange(e, 'service')}
                    onBlur={() => updateRoomPrice(price.id)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  price.service
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingRoomPrice === price.id ? (
                  <input
                    type="number"
                    value={updatedFields.price_1}
                    onChange={(e) => handleEditChange(e, 'price_1')}
                    onBlur={() => updateRoomPrice(price.id)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  price.price_1
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {editingRoomPrice === price.id ? (
                  <input
                    type="number"
                    value={updatedFields.price_2}
                    onChange={(e) => handleEditChange(e, 'price_2')}
                    onBlur={() => updateRoomPrice(price.id)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  price.price_2
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <Modal onConfirm={() => deleteRoomPrice(price.id)}>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200 w-full sm:w-auto"
                  >
                    Fshi
                  </button>
                </Modal>
                <button
                  onClick={() => startEditing(price)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 ml-2 transition duration-200 w-full sm:w-auto"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  <Menu />
</div>

  );
}

export default ManageRoomPricesTable;
