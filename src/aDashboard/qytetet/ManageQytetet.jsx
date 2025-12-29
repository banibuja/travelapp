import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

function ManageQytetet() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [qytetet, setQytetet] = useState([]); // Cities from database
  const [shtetet, setShtetet] = useState([]); // Countries from database
  const [allCitiesByCountry, setAllCitiesByCountry] = useState({}); // All cities from API grouped by country
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Mapping of countries to their major cities
  const countryCitiesMap = {
    'Turkey': ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bodrum', 'Cappadocia', 'Pamukkale', 'Trabzon'],
    'Greece': ['Athens', 'Thessaloniki', 'Santorini', 'Mykonos', 'Crete', 'Rhodes', 'Corfu'],
    'Bulgaria': ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Nesebar', 'Sunny Beach'],
    'Egypt': ['Cairo', 'Alexandria', 'Hurghada', 'Sharm El Sheikh', 'Luxor', 'Aswan'],
    'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'],
    'Macedonia': ['Skopje', 'Ohrid', 'Bitola', 'Tetovo'],
    'Albania': ['Tirana', 'Durres', 'Saranda', 'Vlora', 'Shkodra'],
    'Kosovo': ['Pristina', 'Prizren', 'Peja', 'Gjakova'],
    'Montenegro': ['Podgorica', 'Budva', 'Kotor', 'Cetinje'],
    'Serbia': ['Belgrade', 'Novi Sad', 'Nis', 'Kragujevac'],
    'Croatia': ['Zagreb', 'Dubrovnik', 'Split', 'Rijeka'],
    'Italy': ['Rome', 'Milan', 'Venice', 'Florence', 'Naples'],
    'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
    'France': ['Paris', 'Lyon', 'Marseille', 'Nice'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch cities from database
        const citiesResponse = await axios.get('http://localhost:5001/api/qytetet', { withCredentials: true });
        setQytetet(Array.isArray(citiesResponse.data) ? citiesResponse.data : []);

        // Fetch countries from database
        const countriesResponse = await axios.get('http://localhost:5001/api/shtetet', { withCredentials: true });
        const dbCountries = Array.isArray(countriesResponse.data) ? countriesResponse.data : [];
        setShtetet(dbCountries);

        // Fetch countries data from REST Countries API
        const apiResponse = await axios.get('https://restcountries.com/v3.1/all?fields=name,capital');
        const countriesData = apiResponse.data;

        // Create mapping of country names to their cities
        const citiesMap = {};
        
        dbCountries.forEach(dbCountry => {
          const countryName = dbCountry.emri;
          const apiCountry = countriesData.find(c => 
            c.name.common.toLowerCase() === countryName.toLowerCase() ||
            c.name.official?.toLowerCase() === countryName.toLowerCase()
          );

          const cities = [];
          
          // Add capital from API
          if (apiCountry && apiCountry.capital && apiCountry.capital.length > 0) {
            cities.push(...apiCountry.capital);
          }

          // Add cities from our mapping
          if (countryCitiesMap[countryName]) {
            cities.push(...countryCitiesMap[countryName]);
          }

          // Remove duplicates and sort
          const uniqueCities = [...new Set(cities)].sort();
          citiesMap[countryName] = uniqueCities;
        });

        setAllCitiesByCountry(citiesMap);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error loading cities.');
        setQytetet([]);
        setShtetet([]);
        setAllCitiesByCountry({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/qytetet-delete/${id}`, { withCredentials: true });
      setQytetet(qytetet.filter(item => item.id !== id));
      setMessage('City deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error deleting city.'); }
  };

  const handleEditChange = (e, field) => setUpdatedFields({ ...updatedFields, [field]: e.target.value });

  const updateItem = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5001/api/qytetet-update/${id}`, updatedFields, { withCredentials: true });
      setQytetet(qytetet.map(item => item.id === id ? res.data : item));
      setEditingId(null);
      setMessage('City updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('Error updating city.'); }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setUpdatedFields({ emri: item.emri, shtetiId: item.shtetiId });
  };

  const addCityToDatabase = async (cityName, countryId) => {
    try {
      const res = await axios.post('http://localhost:5001/api/add-qytetet', 
        { emri: cityName, shtetiId: countryId }, 
        { withCredentials: true });
      
      // Refresh the list from database
      const citiesResponse = await axios.get('http://localhost:5001/api/qytetet', { withCredentials: true });
      setQytetet(Array.isArray(citiesResponse.data) ? citiesResponse.data : []);
      
      setMessage('City added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding city:', error);
      setMessage('Error adding city. It may already exist.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // Get all cities for display (grouped by country or flat list)
  const getAllCitiesForDisplay = () => {
    const allCities = [];
    
    shtetet.forEach(country => {
      const cities = allCitiesByCountry[country.emri] || [];
      cities.forEach(cityName => {
        const dbCity = qytetet.find(c => 
          c && c.emri && c.emri.toLowerCase() === cityName.toLowerCase() && 
          c.shtetiId === country.id
        );
        
        allCities.push({
          cityName,
          countryId: country.id,
          countryName: country.emri,
          isSaved: !!dbCity,
          dbCity: dbCity || null
        });
      });
    });

    return allCities;
  };

  const allCities = getAllCitiesForDisplay();
  const filteredCities = allCities.filter(city => 
    city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.countryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group by country for better display
  const citiesByCountry = filteredCities.reduce((acc, city) => {
    if (!acc[city.countryName]) {
      acc[city.countryName] = [];
    }
    acc[city.countryName].push(city);
    return acc;
  }, {});

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Manage Cities</h2>
                  <p className="text-cyan-200 text-sm">{allCities.length} total cities • {qytetet.length} in database</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input type="text" placeholder="Search cities or countries..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 text-white placeholder-white/60"
                    style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <svg className="w-5 h-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button onClick={() => navigate('/dashboard/AddQytetet')}
                  className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add City</span>
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
                <p className="text-gray-400 text-lg">Loading cities...</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">City Name</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Country</th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCities.map((city, index) => (
                      <tr key={`${city.countryId}-${city.cityName}-${index}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          {editingId === city.dbCity?.id ? (
                            <input type="text" value={updatedFields.emri} onChange={(e) => handleEditChange(e, 'emri')}
                              className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-40 focus:border-cyan-500 focus:outline-none" />
                          ) : (
                            <span className="font-semibold text-gray-800">{city.cityName}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingId === city.dbCity?.id ? (
                            <select value={updatedFields.shtetiId} onChange={(e) => handleEditChange(e, 'shtetiId')}
                              className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none">
                              {shtetet.map(s => <option key={s.id} value={s.id}>{s.emri}</option>)}
                            </select>
                          ) : (
                            <span className="text-gray-600">{city.countryName}</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            {city.isSaved ? (
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
                            {city.isSaved ? (
                              <>
                                {editingId === city.dbCity.id ? (
                                  <>
                                    <button onClick={() => updateItem(city.dbCity.id)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </button>
                                    <button onClick={() => setEditingId(null)} className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:scale-110 transition-transform">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button onClick={() => startEditing(city.dbCity)} className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <Modal onConfirm={() => deleteItem(city.dbCity.id)}>
                                      <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                      </button>
                                    </Modal>
                                  </>
                                )}
                              </>
                            ) : (
                              <button onClick={() => addCityToDatabase(city.cityName, city.countryId)} className="px-4 py-2 rounded-lg text-white font-semibold hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!isLoading && filteredCities.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-gray-400 text-lg">No cities found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageQytetet;
