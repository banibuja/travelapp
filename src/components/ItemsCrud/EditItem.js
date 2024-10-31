import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/items/${id}`, { withCredentials: true });
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching item:', error.response || error.message);
    }
  };

  const updateItem = async () => {
    try {
      await axios.put(`http://localhost:5000/items/${id}`, { name, description }, { withCredentials: true });
      navigate('/items');
    } catch (error) {
      console.error('Error updating item:', error.response || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redakto Item</h1>
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
      <button className="bg-blue-500 text-white px-4 py-2" onClick={updateItem}>Përditëso</button>
    </div>
  );
};

export default EditItem;
