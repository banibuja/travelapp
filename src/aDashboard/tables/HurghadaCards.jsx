import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';

function ManageCardsHurghada() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState('');
  const [newCard, setNewCard] = useState({ title: '', description: '', price: '', image: null });
  const [editingCard, setEditingCard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/hurghada/cards', { withCredentials: true });
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setMessage('There was an error fetching cards.');
      }
    };

    fetchCards();
  }, []);

  const addCard = async () => {
    if (!newCard.image) {
      setMessage('Please select an image for the card.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          'http://localhost:5001/api/hurghada/add-cards',
          { title: newCard.title, description: newCard.description, price: newCard.price, imageBase64: base64String },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );

        setCards([...cards, response.data.card]);
        setMessage('Card added successfully.');
        setNewCard({ title: '', description: '', price: '', image: null });
        setShowAddForm(false);
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error adding card:', error);
        setMessage('Error adding card.');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    reader.readAsDataURL(newCard.image);
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/hurghada/cards-delete/${id}`, { withCredentials: true });
      setCards(cards.filter((card) => card.id !== id));
      setMessage('Card deleted successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting card:', error);
      setMessage('Error deleting card.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const startEditingCard = (card) => {
    setEditingCard({
      id: card.id,
      name: card.name || '',
      location: card.location || '',
      price: card.price || '',
      image: null,
    });
  };

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
            `http://localhost:5001/api/hurghada/cards-update/${editingCard.id}`,
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
          setTimeout(() => setMessage(''), 3000);
        } catch (error) {
          console.error('Error updating card:', error);
          setMessage('Error updating card.');
          setTimeout(() => setMessage(''), 3000);
        }
      };

      reader.readAsDataURL(image);
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5001/api/hurghada/cards-update/${editingCard.id}`,
          { name, location, price },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );

        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingCard.id ? response.data.card : card
          )
        );
        setEditingCard(null);
        setMessage('Card updated successfully.');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error updating card:', error);
        setMessage('Error updating card.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Hurghada Cards</h2>
                  <p className="text-cyan-200 text-sm">{cards.length} cards</p>
                </div>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Card</span>
              </button>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
          )}

          {showAddForm && (
            <div className="mx-8 mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Add New Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" placeholder="Card Name" value={newCard.title} onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Location" value={newCard.description} onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Price" value={newCard.price} onChange={(e) => setNewCard({ ...newCard, price: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="file" accept="image/*" onChange={(e) => setNewCard({ ...newCard, image: e.target.files[0] })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200">Cancel</button>
                <button onClick={addCard} className="px-6 py-2 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>Add</button>
              </div>
            </div>
          )}

          {editingCard && (
            <div className="mx-8 mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-700 mb-4">Edit Card</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" placeholder="Card Name" value={editingCard.name || ''} onChange={(e) => setEditingCard({ ...editingCard, name: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Location" value={editingCard.location || ''} onChange={(e) => setEditingCard({ ...editingCard, location: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Price" value={editingCard.price || ''} onChange={(e) => setEditingCard({ ...editingCard, price: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="file" accept="image/*" onChange={(e) => setEditingCard({ ...editingCard, image: e.target.files[0] })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => setEditingCard(null)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200">Cancel</button>
                <button onClick={saveCard} className="px-6 py-2 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>Save Changes</button>
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cards.map((card) => (
                    <tr key={card.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">{card.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{card.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-semibold">€{card.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <img src={`data:image/jpeg;base64,${card.imageBase64}`} alt={card.name} className="w-20 h-20 object-cover rounded-lg" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => startEditingCard(card)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <Modal onConfirm={() => deleteCard(card.id)}>
                            <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </Modal>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {cards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No cards found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCardsHurghada;
