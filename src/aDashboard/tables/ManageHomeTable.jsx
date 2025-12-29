import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function ManageHomeTable() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [homes, setHomes] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ nisja_nga: '', destinimi_hoteli: '', opsionet_neteve: '', data: '', udhetaret: '' });

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/travel-plans', {
          withCredentials: true,
        });
        if (Array.isArray(response.data)) {
          setHomes(response.data);
        } else {
          console.error('Expected an array of homes');
        }
      } catch (error) {
        console.error('Error fetching homes:', error);
        setMessage('There was an error fetching homes.');
      }
    };

    fetchHomes();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/travel-plans/${id}`, {
        withCredentials: true,
      });
      setHomes(homes.filter((home) => home.id !== id));
      setMessage('Travel plan deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting travel plan.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditChange = (e, field) => setUpdatedFields({ ...updatedFields, [field]: e.target.value });

  const updateItem = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/travel-plans/${id}`, updatedFields, { withCredentials: true });
      setHomes(homes.map(item => item.id === id ? res.data : item));
      setEditingId(null);
      setMessage('Travel plan updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error updating travel plan.'); }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setUpdatedFields({ nisja_nga: item.nisja_nga, destinimi_hoteli: item.destinimi_hoteli, opsionet_neteve: item.opsionet_neteve, data: item.data, udhetaret: item.udhetaret });
  };

  const addItem = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/travel-plans', newItem, { withCredentials: true });
      setHomes([...homes, res.data.home]);
      setMessage('Travel plan added successfully!');
      setNewItem({ nisja_nga: '', destinimi_hoteli: '', opsionet_neteve: '', data: '', udhetaret: '' });
      setShowAddForm(false);
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error adding travel plan.'); }
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
                  <h2 className="text-2xl font-bold text-white">Travel Plans</h2>
                  <p className="text-cyan-200 text-sm">{homes.length} plans</p>
                </div>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Plan</span>
              </button>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
          )}

          {showAddForm && (
            <div className="mx-8 mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Add New Travel Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input type="text" placeholder="Departure From" value={newItem.nisja_nga} onChange={(e) => setNewItem({ ...newItem, nisja_nga: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Hotel Destination" value={newItem.destinimi_hoteli} onChange={(e) => setNewItem({ ...newItem, destinimi_hoteli: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Nights Option" value={newItem.opsionet_neteve} onChange={(e) => setNewItem({ ...newItem, opsionet_neteve: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="date" placeholder="Date" value={newItem.data} onChange={(e) => setNewItem({ ...newItem, data: e.target.value })}
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500" />
                <input type="text" placeholder="Travelers" value={newItem.udhetaret} onChange={(e) => setNewItem({ ...newItem, udhetaret: e.target.value })}
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
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Departure From</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Hotel Destination</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Nights Option</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Travelers</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {Array.isArray(homes) && homes.length > 0 ? (
                    homes
                      .filter((home) => home && home.id)
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            {editingId === item.id ? (
                              <input type="text" value={updatedFields.nisja_nga} onChange={(e) => handleEditChange(e, 'nisja_nga')}
                                className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                            ) : <span className="font-semibold text-gray-800">{item.nisja_nga}</span>}
                          </td>
                          <td className="px-6 py-4">
                            {editingId === item.id ? (
                              <input type="text" value={updatedFields.destinimi_hoteli} onChange={(e) => handleEditChange(e, 'destinimi_hoteli')}
                                className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                            ) : <span className="text-gray-600">{item.destinimi_hoteli}</span>}
                          </td>
                          <td className="px-6 py-4">
                            {editingId === item.id ? (
                              <input type="text" value={updatedFields.opsionet_neteve} onChange={(e) => handleEditChange(e, 'opsionet_neteve')}
                                className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                            ) : <span className="text-gray-600">{item.opsionet_neteve}</span>}
                          </td>
                          <td className="px-6 py-4">
                            {editingId === item.id ? (
                              <input type="date" value={updatedFields.data} onChange={(e) => handleEditChange(e, 'data')}
                                className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                            ) : <span className="text-gray-600">{item.data}</span>}
                          </td>
                          <td className="px-6 py-4">
                            {editingId === item.id ? (
                              <input type="text" value={updatedFields.udhetaret} onChange={(e) => handleEditChange(e, 'udhetaret')}
                                className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                            ) : <span className="text-gray-600">{item.udhetaret}</span>}
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
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-12">
                        <p className="text-gray-400 text-lg">No travel plans found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageHomeTable;
