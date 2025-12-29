import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

function ManageShtetet() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [shtetet, setShtetet] = useState([]); // Countries from database
  const [allCountries, setAllCountries] = useState([]); // All countries from API
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch countries from database
        const dbResponse = await axios.get('http://localhost:5001/api/shtetet', { withCredentials: true });
        setShtetet(Array.isArray(dbResponse.data) ? dbResponse.data : []);

        // Fetch all countries from API
        const apiResponse = await axios.get('https://restcountries.com/v3.1/all?fields=name');
        const sortedCountries = apiResponse.data
          .map(country => country.name.common)
          .sort();
        setAllCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error loading countries.');
        setShtetet([]);
        setAllCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/shtetin-delete/${id}`, { withCredentials: true });
      setShtetet(shtetet.filter(item => item.id !== id));
      setMessage('Country deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error deleting country.'); }
  };

  const handleEditChange = (e, field) => setUpdatedFields({ ...updatedFields, [field]: e.target.value });

  const updateItem = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/shtetin-update/${id}`, updatedFields, { withCredentials: true });
      setShtetet(shtetet.map(item => item.id === id ? res.data : item));
      setEditingId(null);
      setMessage('Country updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error updating country.'); }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setUpdatedFields({ emri: item.emri });
  };

  const addCountryToDatabase = async (countryName) => {
    try {
      const res = await axios.post('http://localhost:5001/api/add-shtetin', { emri: countryName }, { withCredentials: true });
      // Refresh the list from database to get the updated data
      const dbResponse = await axios.get('http://localhost:5001/api/shtetet', { withCredentials: true });
      setShtetet(dbResponse.data);
      setMessage('Country added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding country:', error);
      setMessage('Error adding country. It may already exist.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Filter countries based on search term
  const filteredCountries = allCountries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Manage Countries</h2>
                  <p className="text-cyan-200 text-sm">{allCountries.length} total countries • {shtetet.length} in database</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input type="text" placeholder="Search countries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 text-white placeholder-white/60"
                    style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <svg className="w-5 h-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button onClick={() => navigate('/dashboard/AddShtetin')}
                  className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Country</span>
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
          )}

          <div className="p-8">
            {isLoading ? (
              <div className="text-center py-12">
                <svg className="animate-spin h-12 w-12 mx-auto text-cyan-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-400 text-lg">Loading countries...</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Country Name</th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCountries.map((countryName, index) => {
                      const dbCountry = Array.isArray(shtetet) 
                        ? shtetet.find(s => s && s.emri && typeof s.emri === 'string' && s.emri.toLowerCase() === countryName.toLowerCase())
                        : null;
                      const isSaved = !!dbCountry;

                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            {editingId === dbCountry?.id ? (
                              <input type="text" value={updatedFields.emri} onChange={(e) => handleEditChange(e, 'emri')}
                                className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-48 focus:border-cyan-500 focus:outline-none" />
                            ) : (
                              <span className="font-semibold text-gray-800">{countryName}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              {isSaved ? (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                  ✓ In Database
                                </span>
                              ) : (
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                                  Not Saved
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              {isSaved ? (
                                <>
                                  {editingId === dbCountry.id ? (
                                    <>
                                      <button onClick={() => updateItem(dbCountry.id)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                      </button>
                                      <button onClick={() => setEditingId(null)} className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:scale-110 transition-transform">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button onClick={() => startEditing(dbCountry)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                      </button>
                                      <Modal onConfirm={() => deleteItem(dbCountry.id)}>
                                        <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                      </Modal>
                                    </>
                                  )}
                                </>
                              ) : (
                                <button onClick={() => addCountryToDatabase(countryName)} className="px-4 py-2 rounded-lg text-white font-semibold hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                  Add
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            {!isLoading && filteredCountries.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-400 text-lg">No countries found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageShtetet;
