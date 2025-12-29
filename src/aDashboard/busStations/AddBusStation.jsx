import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

function AddBusStation() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({ emri: '', adresa: '', shtetiId: '' });
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
      await axios.post('http://localhost:5001/api/add-bus-stations', formData, { withCredentials: true });
      setMessage('Bus station created successfully!');
      setTimeout(() => navigate('/dashboard/ManageBusStations'), 2000);
    } catch (error) {
      setMessage('Error creating bus station.');
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New Bus Station</h2>
                <p className="text-cyan-200 text-sm">Create a new bus station entry</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Station Name</label>
                  <input type="text" name="emri" value={formData.emri} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="e.g. Central Bus Station" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <input type="text" name="adresa" value={formData.adresa} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="e.g. Street Name, City" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                  <select name="shtetiId" value={formData.shtetiId} onChange={handleChange} required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
                    style={{ background: '#f8fafc' }}>
                    <option value="">Select country</option>
                    {shtetet.map((shteti) => (<option key={shteti.id} value={shteti.id}>{shteti.emri}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => navigate('/dashboard/ManageBusStations')}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" disabled={isLoading}
                  className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)' }}>
                  {isLoading ? 'Creating...' : '+ Create Bus Station'}
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

export default AddBusStation;

