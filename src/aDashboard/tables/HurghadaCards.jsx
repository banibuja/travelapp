import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';


function ManageCardsHurghada() {
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState('');
  const [newCard, setNewCard] = useState({ title: '', description: '', price: '', image: null });
  const [editingCard, setEditingCard] = useState(null); // For editing an existing card

  // Fetch all cards
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hurghada/cards', { withCredentials: true });
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setMessage('There was an error fetching cards.');
      }
    };

    fetchCards();
  }, []);

  // Add new card
  const addCard = async () => {
    if (!newCard.image) {
      setMessage('Please select an image for the card.');
      return;
    }

    // Convert image file to Base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          'http://localhost:5000/api/hurghada/add-cards',
          { title: newCard.title, description: newCard.description, price: newCard.price, imageBase64: base64String },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );

        setCards([...cards, response.data.card]);
        setMessage('Card added successfully.');
        setNewCard({ title: '', description: '', price:'', image: null });
      } catch (error) {
        console.error('Error adding card:', error);
        setMessage('Error adding card.');
      }
    };

    reader.readAsDataURL(newCard.image);
  };

  // Delete card
  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hurghada/cards-delete/${id}`, { withCredentials: true });
      setCards(cards.filter((card) => card.id !== id));
      setMessage('Card deleted successfully.');
    } catch (error) {
      console.error('Error deleting card:', error);
      setMessage('Error deleting card.');
    }
  };

  // Start editing card
  const startEditingCard = (card) => {
    setEditingCard({
      id: card.id,
      name: card.name || '', 
      location: card.location || '', 
      price: card.price || '',
      image: null, 
    });
  };
  

  // Save edited card
  const saveCard = async () => {
    if (!editingCard) return;
  
    const { name, location, price, image } = editingCard; 
    let imageBase64 = null;
  
    if (image) {
      const reader = new FileReader();
      reader.onload = async () => {
        imageBase64 = reader.result.split(',')[1];
  
        try {
          const response = await axios.put(
            `http://localhost:5000/api/hurghada/cards-update/${editingCard.id}`,
            { name, location, price, imageBase64 }, 
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
          );
  
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === editingCard.id ? response.data.card : card
            )
          );
          setEditingCard(null);
          setMessage('Card updated successfully.');
        } catch (error) {
          console.error('Error updating card:', error);
          setMessage('Error updating card.');
        }
      };
  
      reader.readAsDataURL(image);
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/hurghada/cards-update/${editingCard.id}`,
          { name, location, price }, // Dërgoni të dhënat me emrat e saktë
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
  
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingCard.id ? response.data.card : card
          )
        );
        setEditingCard(null);
        setMessage('Card updated successfully.');
      } catch (error) {
        console.error('Error updating card:', error);
        setMessage('Error updating card.');
      }
    }
  };
  
  
  

  return (
    <div className="flex">
    <div className="flex-grow p-4 overflow-auto max-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Hurghadas Card</h2>
      {message && (
        <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      {/* Add new card form */}
      <div className="mb-4">
  <input
    type="text"
    placeholder="Card Title"
    value={newCard.title}
    onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
    className="border border-gray-300 rounded px-2 py-1 mr-2"
  />
  <input
    type="text"
    placeholder="Card Description"
    value={newCard.description}
    onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
    className="border border-gray-300 rounded px-2 py-1 mr-2"
  />
  <input
    type="text"
    placeholder="Price"
    value={newCard.price}
    onChange={(e) => setNewCard({ ...newCard, price: e.target.value })}
    className="border border-gray-300 rounded px-2 py-1 mr-2"
  />
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setNewCard({ ...newCard, image: e.target.files[0] })}
    className="border border-gray-300 rounded px-2 py-1 mr-2"
  />
  <button
    onClick={addCard}
    className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
  >
    Add Card
  </button>
</div>
      {/* Edit card form */}
     {/* Edit card form */}
     {editingCard && (
  <div className="mb-4">
    <h3 className="text-xl font-bold mb-2">Edit Card</h3>
    <input
      type="text"
      placeholder="Card Name"
      value={editingCard.name || ''} 
      onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
      className="border border-gray-300 rounded px-2 py-1 mr-2"
    />
    <input
      type="text"
      placeholder="Card Location"
      value={editingCard.location || ''} 
      onChange={(e) => setEditingCard({ ...editingCard, location: e.target.value })}
      className="border border-gray-300 rounded px-2 py-1 mr-2"
    />
    <input
      type="text"
      placeholder="Price"
      value={editingCard.price || ''}
      onChange={(e) => setEditingCard({ ...editingCard, price: e.target.value })}
      className="border border-gray-300 rounded px-2 py-1 mr-2"
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setEditingCard({ ...editingCard, image: e.target.files[0] })}
      className="border border-gray-300 rounded px-2 py-1 mr-2"
    />
    <button
      onClick={saveCard}
      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Save Changes
    </button>
  </div>
)}




      {/* Cards Table */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {cards.map((card) => (
            <tr key={card.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{card.id}</td>
              <td className="py-3 px-6 text-left">{card.name}</td>
              <td className="py-3 px-6 text-left">{card.location}</td>
              <td className="py-3 px-6 text-left">{card.price}</td>
              <td className="py-3 px-6 text-left">
                <img src={`data:image/jpeg;base64,${card.imageBase64}`} alt={card.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => startEditingCard(card)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <Modal onConfirm={ () => deleteCard(card.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
                </Modal>
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

export default ManageCardsHurghada;
