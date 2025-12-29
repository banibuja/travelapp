import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

function AddShtetin() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({ emri: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoadingCountries(true);
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name');
        const sortedCountries = response.data
          .map(country => country.name.common)
          .sort();
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setMessage('Error loading countries list. You can still type manually.');
      } finally {
        setIsLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleCountrySelect = (countryName) => {
    setFormData({ ...formData, emri: countryName });
    setSearchTerm(countryName);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5001/api/add-shtetin', formData);
      setMessage('Country created successfully!');
      setTimeout(() => navigate('/dashboard/ManageShtetet'), 2000);
    } catch (error) {
      setMessage('Error creating country.');
      setIsLoading(false);
    }
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New Country</h2>
                <p className="text-cyan-200 text-sm">Select from list or type manually</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="relative" ref={dropdownRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="emri" 
                    value={formData.emri} 
                    onChange={handleChange}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} 
                    placeholder={isLoadingCountries ? "Loading countries..." : "Search or type country name..."} 
                    required 
                  />
                  {isLoadingCountries && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                
                {showDropdown && searchTerm && filteredCountries.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {filteredCountries.map((country, index) => (
                      <div
                        key={index}
                        onClick={() => handleCountrySelect(country)}
                        className="px-4 py-3 hover:bg-cyan-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-gray-800 font-medium">{country}</span>
                      </div>
                    ))}
                    {filteredCountries.length === 10 && (
                      <div className="px-4 py-2 text-xs text-gray-500 text-center bg-gray-50">
                        Showing first 10 results. Type more to refine search.
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => navigate('/dashboard/ManageShtetet')}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all">Cancel</button>
                <button type="submit" disabled={isLoading}
                  className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)' }}>
                  {isLoading ? 'Creating...' : '+ Create Country'}
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

export default AddShtetin;
