import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

function AddAirport() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({ emri: '', akronimi: '', shtetiId: '1' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shtetet, setShtetet] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/shtetet', { withCredentials: true })
      .then(res => setShtetet(res.data))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5001/api/add-airports', formData);
      setMessage('Airport created successfully!');
      setTimeout(() => navigate('/dashboard/ManageAirports'), 2000);
    } catch (error) {
      setMessage('Error creating airport.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New Airport</h2>
                <p className="text-cyan-200 text-sm">Create a new airport entry</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Airport Name</label>
                  <input type="text" name="emri" value={formData.emri} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="e.g. Prishtina International" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Airport Code (IATA)</label>
                  <input type="text" name="akronimi" value={formData.akronimi} onChange={handleChange} maxLength="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all uppercase"
                    style={{ background: '#f8fafc' }} placeholder="e.g. PRN" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <select name="shtetiId" onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
                    style={{ background: '#f8fafc' }}>
                    {shtetet.map((shteti) => (<option key={shteti.id} value={shteti.id}>{shteti.emri}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => navigate('/dashboard/ManageAirports')}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" disabled={isLoading}
                  className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)' }}>
                  {isLoading ? 'Creating...' : '+ Create Airport'}
                </button>
              </div>
            </form>
            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAirport;
