import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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

export default ItemList;
