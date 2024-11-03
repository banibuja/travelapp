import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


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

// Komponenti për redaktimin e item-eve
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

// Komponenti për listimin e item-eve
const ItemList = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items', { withCredentials: true });
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error.response || error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`, { withCredentials: true });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.response || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista e Itemeve</h1>
      <Link to="/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Shto Item</Link>
      {items.map((item) => (
        <div key={item.id} className="border-b py-2">
          <p><strong>{item.name}</strong>: {item.description}</p>
          <Link to={`/edit/${item.id}`} className="text-blue-500">Redakto</Link>
          <button onClick={() => deleteItem(item.id)} className="ml-4 bg-red-500 text-white px-2 py-1">Fshi</button>
        </div>
      ))}
    </div>
  );
};

// Eksporto të gjithë komponentët për t'i përdorur në aplikacionin tënd
export { AddItem, EditItem, ItemList };
