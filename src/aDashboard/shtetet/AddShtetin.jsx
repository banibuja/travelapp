import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';

function AddShtetin() {
  const [formData, setFormData] = useState({
    emri: ''
  });
    const [message, setMessage] = useState('');
    const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-shtetin', formData);
      setMessage('Regjistrimi ishte i suksesshëm.');
      setTimeout(() => {
        window.location.href = '/dashboard/ManageShtetet';
      }, 3000);
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div className=" bg-gray-100 flex">
      <div className="flex-grow flex  justify-center p-4 overflow-auto max-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-max">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Shto Shtetet</h2>
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

export default AddShtetin;
