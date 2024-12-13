import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Menu from '../Menu';

function AddAirport() {
  const [formData, setFormData] = useState({
    emri: '',
    akronimi: '',
    shtetiId: '1',
  });
    const [message, setMessage] = useState('');
    const [shtetet, setShtetet] = useState([]);
    const today = new Date().toISOString().split('T')[0];

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-Airports', formData);
      setMessage('Regjistrimi ishte i suksesshëm.');
      setTimeout(() => {
        window.location.href = '/dashboard/ManageAirports';
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-gray-100 flex">
      <div className="flex-grow flex  justify-center p-4 overflow-auto max-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-max">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Shto Airports</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="emri">
                Emri
              </label>
              <input
                type="text"
                id="emri"
                name="emri"
                value={formData.emri}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani Emrin"
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
              <label className="block text-gray-700 mb-2" htmlFor="akronimi">
                Akronimi
              </label>
              <input
                type="text"
                id="akronimi"
                name="akronimi"
                value={formData.akronimi}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Shkruani Akronimin"
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

export default AddAirport;
