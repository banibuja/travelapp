import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function MaqedoniPricesTable() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [prices, setPrices] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ lloji_dhomes: '', sherbimi: '', gjat_sezones: '', jasht_sezones: '' });

  useEffect(() => {
    axios.get('http://localhost:5001/api/maqedoni-price', { withCredentials: true })
      .then(res => setPrices(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/maqedoni-prices-delete/${id}`, { withCredentials: true });
      setPrices(prices.filter(item => item.id !== id));
      setMessage('Price deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error deleting price.'); }
  };

  const handleEditChange = (e, field) => setUpdatedFields({ ...updatedFields, [field]: e.target.value });

  const updateItem = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/maqedoni-prices-update/${id}`, updatedFields, { withCredentials: true });
      setPrices(prices.map(item => item.id === id ? res.data : item));
      setEditingId(null);
      setMessage('Price updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error updating price.'); }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setUpdatedFields({ lloji_dhomes: item.lloji_dhomes, sherbimi: item.sherbimi, gjat_sezones: item.gjat_sezones, jasht_sezones: item.jasht_sezones });
  };

  const addItem = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/add-maqedoni-price', newItem, { withCredentials: true });
      setPrices([...prices, res.data.maqedoniPrices]);
      setMessage('Price added successfully!');
      setNewItem({ lloji_dhomes: '', sherbimi: '', gjat_sezones: '', jasht_sezones: '' });
      setShowAddForm(false);
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error adding price.'); }
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
                  <h2 className="text-2xl font-bold text-white">Maqedoni Prices</h2>
                  <p className="text-cyan-200 text-sm">{prices.length} prices</p>
                </div>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Price</span>
              </button>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
          )}

          {showAddForm && (
            <div className="mx-8 mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Add New Price</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" placeholder="Room Type" value={newItem.lloji_dhomes} onChange={(e) => setNewItem({ ...newItem, lloji_dhomes: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Service" value={newItem.sherbimi} onChange={(e) => setNewItem({ ...newItem, sherbimi: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="number" placeholder="In Season" value={newItem.gjat_sezones} onChange={(e) => setNewItem({ ...newItem, gjat_sezones: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="number" placeholder="Off Season" value={newItem.jasht_sezones} onChange={(e) => setNewItem({ ...newItem, jasht_sezones: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200">Cancel</button>
                <button onClick={addItem} className="px-6 py-2 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>Add</button>
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Room Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">In Season</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Off Season</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {prices.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <input type="text" value={updatedFields.lloji_dhomes} onChange={(e) => handleEditChange(e, 'lloji_dhomes')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                        ) : <span className="font-semibold text-gray-800">{item.lloji_dhomes}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <input type="text" value={updatedFields.sherbimi} onChange={(e) => handleEditChange(e, 'sherbimi')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                        ) : <span className="text-gray-600">{item.sherbimi}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <input type="number" value={updatedFields.gjat_sezones} onChange={(e) => handleEditChange(e, 'gjat_sezones')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-20 focus:border-cyan-500 focus:outline-none" />
                        ) : <span className="text-green-600 font-semibold">€{item.gjat_sezones}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <input type="number" value={updatedFields.jasht_sezones} onChange={(e) => handleEditChange(e, 'jasht_sezones')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-20 focus:border-cyan-500 focus:outline-none" />
                        ) : <span className="text-green-600 font-semibold">€{item.jasht_sezones}</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {editingId === item.id ? (
                            <>
                              <button onClick={() => updateItem(item.id)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:scale-110 transition-transform">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEditing(item)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <Modal onConfirm={() => deleteItem(item.id)}>
                                <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </Modal>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {prices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No prices found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaqedoniPricesTable;

