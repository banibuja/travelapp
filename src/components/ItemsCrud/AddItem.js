import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const addItem = async () => {
    try {
      await axios.post('http://localhost:5000/items', { name, description }, { withCredentials: true });
      navigate('/items');
    } catch (error) {
      console.error('Error adding item:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shto Item</h1>
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Emri"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border border-gray-300 p-2 w-full mb-4"
        placeholder="Përshkrimi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addItem}>Shto</button>
    </div>
  );
};

export default AddItem;
