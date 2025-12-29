import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

function ManageBusStations() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [busStations, setBusStations] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [shtetet, setShtetet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stationsResponse, shtetetResponse] = await Promise.all([
          axios.get('http://localhost:5001/api/bus-stations', { withCredentials: true }),
          axios.get('http://localhost:5001/api/shtetet', { withCredentials: true })
        ]);
        setBusStations(stationsResponse.data);
        setShtetet(shtetetResponse.data);
      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/bus-stations-delete/${id}`, { withCredentials: true });
      setBusStations(busStations.filter(item => item.id !== id));
      setMessage('Bus station deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error deleting bus station.'); }
  };

  const handleEditChange = (e, field) => setUpdatedFields({ ...updatedFields, [field]: e.target.value });

  const updateItem = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/bus-stations-update/${id}`, updatedFields, { withCredentials: true });
      setBusStations(busStations.map(item => item.id === id ? res.data.busStation : item));
      setEditingId(null);
      setMessage('Bus station updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error updating bus station.'); }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setUpdatedFields({ emri: item.emri, adresa: item.adresa || '', shtetiId: item.shtetiId });
  };

  const filtered = busStations.filter(item =>
    item.emri?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.adresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.shteti?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Manage Bus Stations</h2>
                  <p className="text-cyan-200 text-sm">{busStations.length} bus stations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input type="text" placeholder="Search bus stations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 text-white placeholder-white/60"
                    style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <svg className="w-5 h-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button onClick={() => navigate('/dashboard/AddBusStation')}
                  className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Bus Station</span>
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
          )}

          <div className="p-8">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Station Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Country</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <input type="text" value={updatedFields.emri} onChange={(e) => handleEditChange(e, 'emri')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-40 focus:border-cyan-500 focus:outline-none" />
                        ) : <span className="font-semibold text-gray-800">{item.emri}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === item.id ? (
                          <input type="text" value={updatedFields.adresa || ''} onChange={(e) => handleEditChange(e, 'adresa')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-48 focus:border-cyan-500 focus:outline-none" />
                        ) : <span className="text-gray-600">{item.adresa || '-'}</span>}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {editingId === item.id ? (
                          <select value={updatedFields.shtetiId} onChange={(e) => handleEditChange(e, 'shtetiId')}
                            className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none">
                            {shtetet.map((shteti) => (
                              <option key={shteti.id} value={shteti.id}>{shteti.emri}</option>
                            ))}
                          </select>
                        ) : <span>{item.shteti || '-'}</span>}
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
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <p className="text-gray-400 text-lg">No bus stations found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageBusStations;

