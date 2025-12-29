import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';

function AddAranzhmanet() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    titulli: '',
    shtetiId: '',
    cmimi: '',
    nrPersonave: '',
    nrNeteve: '',
    llojiDhomes: '',
    sherbimi: '',
    dataNisjes: '',
    dataKthimit: '',
    airportId: '',
    busStationId: '',
    rating: '',
    llojiTransportit: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [airports, setAirports] = useState([]);
  const [busStations, setBusStations] = useState([]);
  const [shtetet, setShtetet] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shtetResponse = await axios.get('http://localhost:5001/api/shtetet', { withCredentials: true });
        setShtetet(shtetResponse.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchData();
  }, []);

  // Fetch airports when country changes
  useEffect(() => {
    const fetchAirportsByCountry = async () => {
      if (formData.shtetiId) {
        try {
          const response = await axios.get(`http://localhost:5001/api/airports/by-shteti/${formData.shtetiId}`, { withCredentials: true });
          setAirports(response.data);
        } catch (error) {
          console.error('Error fetching airports:', error);
          setAirports([]);
        }
      } else {
        setAirports([]);
      }
    };
    fetchAirportsByCountry();
  }, [formData.shtetiId]);

  // Fetch bus stations when country changes
  useEffect(() => {
    const fetchBusStationsByCountry = async () => {
      if (formData.shtetiId) {
        try {
          const response = await axios.get(`http://localhost:5001/api/bus-stations/by-shteti/${formData.shtetiId}`, { withCredentials: true });
          setBusStations(response.data);
        } catch (error) {
          console.error('Error fetching bus stations:', error);
          setBusStations([]);
        }
      } else {
        setBusStations([]);
      }
    };
    fetchBusStationsByCountry();
  }, [formData.shtetiId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset airportId and busStationId when country changes
    if (name === 'shtetiId') {
      setFormData({ ...formData, [name]: value, airportId: '', busStationId: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.shtetiId || formData.shtetiId === '') {
      setMessage('Please select a country.');
      return;
    }

    setIsLoading(true);
    try {
      let imageBase64 = null;
      
      // Convert image to base64 if provided
      if (image) {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64String = reader.result.split(',')[1];
          
          // Convert empty strings to null for numeric fields
          const submitData = {
            ...formData,
            shtetiId: formData.shtetiId ? parseInt(formData.shtetiId) : null,
            airportId: formData.llojiTransportit === 'plane' && formData.airportId ? parseInt(formData.airportId) : null,
            busStationId: formData.llojiTransportit === 'bus' && formData.busStationId ? parseInt(formData.busStationId) : null,
            nrPersonave: formData.nrPersonave ? parseInt(formData.nrPersonave) : null,
            nrNeteve: formData.nrNeteve ? parseInt(formData.nrNeteve) : null,
            cmimi: formData.cmimi ? parseFloat(formData.cmimi) : null,
            rating: formData.rating ? parseInt(formData.rating) : null,
            imageBase64: base64String,
          };

          try {
            await axios.post('http://localhost:5001/api/add-Aranzhmani', submitData, { 
              withCredentials: true,
              headers: { 'Content-Type': 'application/json' }
            });
            setMessage('Package created successfully!');
            setTimeout(() => navigate('/dashboard/ManageAranzhmanet'), 2000);
          } catch (error) {
            console.error('Error creating package:', error);
            setMessage(error.response?.data?.message || 'Error creating package.');
            setIsLoading(false);
          }
        };
        reader.readAsDataURL(image);
      } else {
        // No image provided, submit without image
        const submitData = {
          ...formData,
          shtetiId: formData.shtetiId ? parseInt(formData.shtetiId) : null,
          airportId: formData.llojiTransportit === 'plane' && formData.airportId ? parseInt(formData.airportId) : null,
          busStationId: formData.llojiTransportit === 'bus' && formData.busStationId ? parseInt(formData.busStationId) : null,
          nrPersonave: formData.nrPersonave ? parseInt(formData.nrPersonave) : null,
          nrNeteve: formData.nrNeteve ? parseInt(formData.nrNeteve) : null,
          cmimi: formData.cmimi ? parseFloat(formData.cmimi) : null,
          rating: formData.rating ? parseInt(formData.rating) : null,
        };

        try {
          await axios.post('http://localhost:5001/api/add-Aranzhmani', submitData, { withCredentials: true });
          setMessage('Package created successfully!');
          setTimeout(() => navigate('/dashboard/ManageAranzhmanet'), 2000);
        } catch (error) {
          console.error('Error creating package:', error);
          setMessage(error.response?.data?.message || 'Error creating package.');
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error processing form:', error);
      setMessage('Error processing form.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add New Package</h2>
                <p className="text-cyan-200 text-sm">Create a new travel package</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Title */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Package Title</label>
                  <input type="text" name="titulli" value={formData.titulli} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="Enter package title" required />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                  <select name="shtetiId" value={formData.shtetiId} onChange={handleChange} required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
                    style={{ background: '#f8fafc' }}>
                    <option value="">Select country</option>
                    {shtetet.map((shteti) => (
                      <option key={shteti.id} value={shteti.id}>{shteti.emri}</option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (€)</label>
                  <input type="number" name="cmimi" value={formData.cmimi} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="0.00" required />
                </div>

                {/* Number of People */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of People</label>
                  <input type="number" name="nrPersonave" value={formData.nrPersonave} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="2" required />
                </div>

                {/* Number of Nights */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Nights</label>
                  <input type="number" name="nrNeteve" value={formData.nrNeteve} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="7" required />
                </div>

                {/* Departure Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
                  <input type="date" name="dataNisjes" min={today} value={formData.dataNisjes} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} required />
                </div>

                {/* Return Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date</label>
                  <input type="date" name="dataKthimit" min={today} value={formData.dataKthimit} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} required />
                </div>

                {/* Room Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Room Type</label>
                  <input type="text" name="llojiDhomes" value={formData.llojiDhomes} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="Double, Suite, etc." required />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
                  <input type="text" name="sherbimi" value={formData.sherbimi} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="All Inclusive, BB, HB" required />
                </div>

                {/* Transport Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Transport Type</label>
                  <select name="llojiTransportit" value={formData.llojiTransportit} onChange={(e) => {
                    handleChange(e);
                    // Reset airportId and busStationId when transport type changes
                    setFormData({ ...formData, llojiTransportit: e.target.value, airportId: '', busStationId: '' });
                  }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
                    style={{ background: '#f8fafc' }}>
                    <option value="">Select transport type</option>
                    <option value="plane">Plane ✈️</option>
                    <option value="bus">Bus 🚌</option>
                    <option value="train">Train 🚂</option>
                  </select>
                </div>

                {/* Airport - Only show if transport type is plane */}
                {formData.llojiTransportit === 'plane' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Airport <span className="text-red-500">*</span></label>
                    <select name="airportId" value={formData.airportId} onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
                      style={{ background: '#f8fafc' }}
                      required={formData.llojiTransportit === 'plane'}>
                      <option value="">{formData.shtetiId ? 'Select airport' : 'Select country first'}</option>
                      {airports.length > 0 ? (
                        airports.map((airport) => (
                          <option key={airport.id} value={airport.id}>{airport.emri} ({airport.akronimi})</option>
                        ))
                      ) : formData.shtetiId ? (
                        <option value="" disabled>No airports found for this country</option>
                      ) : null}
                    </select>
                    {formData.shtetiId && airports.length === 0 && (
                      <p className="text-xs text-gray-500 mt-1">No airports available for this country. Add airports first.</p>
                    )}
                  </div>
                )}

                {/* Bus Station - Only show if transport type is bus */}
                {formData.llojiTransportit === 'bus' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bus Station <span className="text-red-500">*</span></label>
                    <select name="busStationId" value={formData.busStationId || ''} onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all appearance-none"
                      style={{ background: '#f8fafc' }}
                      required={formData.llojiTransportit === 'bus'}>
                      <option value="">{formData.shtetiId ? 'Select bus station' : 'Select country first'}</option>
                      {busStations.length > 0 ? (
                        busStations.map((station) => (
                          <option key={station.id} value={station.id}>{station.emri} {station.adresa && `- ${station.adresa}`}</option>
                        ))
                      ) : formData.shtetiId ? (
                        <option value="" disabled>No bus stations found for this country</option>
                      ) : null}
                    </select>
                    {formData.shtetiId && busStations.length === 0 && (
                      <p className="text-xs text-gray-500 mt-1">No bus stations available for this country. Add bus stations first.</p>
                    )}
                  </div>
                )}

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (1-5)</label>
                  <input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} placeholder="5" required />
                </div>

                {/* Image Upload */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Package Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-all"
                    style={{ background: '#f8fafc' }} />
                  {imagePreview && (
                    <div className="mt-4">
                      <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-xl border-2 border-gray-200" />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button type="button" onClick={() => navigate('/dashboard/ManageAranzhmanet')}
                  className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={isLoading}
                  className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)' }}>
                  {isLoading ? 'Creating...' : '+ Create Package'}
                </button>
              </div>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAranzhmanet;
