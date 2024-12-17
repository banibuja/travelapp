import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';

function AddAranzhmanet() {
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
    airportId: '1',
    rating: '',
  });
    const [message, setMessage] = useState('');
    const [airports, setAirports] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [shtetet, setShtetet] = useState([]);

    useEffect(() => {
      
      const fetchShtetet = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/shtetet', {
            withCredentials: true,
          });
          setShtetet(response.data);
        } catch (error) {
          console.error('Gabim gjatë marrjes së përdoruesve:', error);
        }
      };
      fetchShtetet();
      }, [])


    useEffect(() => {
      
    const fetchAirports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/airports', {
          withCredentials: true,
        });
        setAirports(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së përdoruesve:', error);
      }
    };
    fetchAirports();
    }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-Aranzhmani', formData);
      setMessage('Regjistrimi ishte i suksesshëm.');
      setTimeout(() => {
        window.location.href = '/dashboard/ManageAranzhmanet';
      }, 3000);
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div className=" bg-gray-100 flex">
      <div className="flex-grow flex  justify-center p-4 overflow-auto max-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-max">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Shto Aranzhman</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="titulli">
                Titulli
              </label>
              <input
                type="text"
                id="titulli"
                name="titulli"
                value={formData.titulli}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani titullin"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="shtetiId">
              ShtetiId
              </label>
              <select 
                id="shtetiId"
                name="shtetiId" 
                className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                onChange={handleChange}>
              {shtetet.map((shteti, index) => (
                <option key={index} value={shteti.id}>{shteti.emri}</option>
              ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="cmimi">
                Cmimi
              </label>
              <input
                type="number"
                id="cmimi"
                name="cmimi"
                value={formData.cmimi}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani cmimin"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="nrPersonave">
                Numri i personave
              </label>
              <input
                type="number"
                id="nrPersonave"
                name="nrPersonave"
                value={formData.nrPersonave}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani Numrin e personave"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="nrNeteve">
                Numri i neteve
              </label>
              <input
                type="number"
                id="nrNeteve"
                name="nrNeteve"
                value={formData.nrNeteve}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani Numrin e neteve"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="dataNisjes">
                Data e nisjes
              </label>
              <input
                type="date"
                id="dataNisjes"
                name="dataNisjes"
                min={today} 
                value={formData.dataNisjes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani Numrin e neteve"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="dataKthimit">
                data e kthimit
              </label>
              <input
                type="date"
                id="dataKthimit"
                name="dataKthimit"
                min={today} 
                value={formData.dataKthimit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani daten e kthimit"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="llojiDhomes">
                Lloji i dhomes
              </label>
              <input
                type="llojiDhomes"
                id="llojiDhomes"
                name="llojiDhomes"
                value={formData.llojiDhomes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani llojin e dhomes"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="sherbimi">
                Sherbimi
              </label>
              <input
                type="sherbimi"
                id="sherbimi"
                name="sherbimi"
                value={formData.sherbimi}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani sherbimin"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="airportId">
                Airport
              </label>
              <select 
                id="airportId"
                name="airportId" 
                className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                onChange={handleChange}>
              {airports.map((airport, index) => (
                <option key={index} value={airport.id}>{airport.emri} ({airport.akronimi})</option>

              ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="rating">
                rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani rating"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Regjistro
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes('suksesshëm') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>

        <Menu />
    </div>
  );
}

export default AddAranzhmanet;
