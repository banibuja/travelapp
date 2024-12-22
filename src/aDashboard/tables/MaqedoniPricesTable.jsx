import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function MaqedoniPricesTable() {
    const [maqedoniPrices, setMaqedoniPrices] = useState([]);
    const [message, setMessage] = useEffect('');
    const [editingMaqedoniPrices, setEditingMaqedoniPrices] = useState(null);
    const [updatedFields, setUpdatedFields] = useState({});

}

//fetch all maqedoni prices
useEffect(() => {
    const fetchMaqedoniPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/maqedoni-price', {
          withCredentials: true,
        });
        setMaqedoniPrices(response.data);
      } catch (error) {
        console.error('Error fetching maqedoni prices:', error);
        setMessage('There was an error fetching maqedoni prices.');
      }
    };

    fetchMaqedoniPrices();
  }, []);

  // delete maqedoni prices
  const deleteMaqedoniPrice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/maqedoni-prices-delete/${id}`, {
        withCredentials: true,
      });
      setMaqedoniPrices(maqedoniPrices.filter((price) => price.id !== id));
      setMessage('Maqedoni price deleted successfully.');
    } catch (error) {
      setMessage('Error deleting Maqedoni price.');
    }
  };

    // Handle input changes for editing
    const handleEditChange = (e, field) => {
        const { value } = e.target;
        setUpdatedFields((prevFields) => ({
          ...prevFields,
          [field]: value,
        }));
      };

  // Update dubai price
  const updateMaqedoniPrice = async (id) => {
    const updatedPrice = {
      ...updatedFields,
    };
    try {
        const response = await axios.put(`http://localhost:5000/api/maqedoni-prices-update/${id}`, updatedPrice, {
          withCredentials: true,
        });
        setMaqedoniPrices(
          maqedoniPrices.map((price) => (price.id === id ? response.data : price))
        );
        setEditingMaqedoniPrice(null); // Exit edit mode after successful update
        setMessage('Maqedoni price updated successfully.');
      } catch (error) {
        setMessage('Error updating maqedoni price.');
      }
    };

 // Enable editing mode
const startEditing = (price) => {
    setEditingMaqedoniPrice(price.id);
    setUpdatedFields({
        lloji_dhomes: price.lloji_dhomes,
        sherbimi: price.sherbimi,
        gjat_sezones: price.gjat_sezones,
        jasht_sezones: price.jasht_sezones
    });
  };

  // Add new maqedoni price
  const addMaqedoniPrice = async () => {
    const newPrice = {
        lloji_dhomes: updatedFields.lloji_dhomes,
        sherbimi: updatedFields.sherbimi,
        gjat_sezones: updatedFields.gjat_sezones,
        jasht_sezones: updatedFields.jasht_sezones
    };

    try {
      const response = await axios.post('http://localhost:5000/api/add-maqedoni-price', newPrice, {
        withCredentials: true,
      });
      setMaqedoniPrices([...maqedoniPrices, response.data.maqedoniPrice]);
      setMessage('Maqedoni price added successfully.');
      setUpdatedFields({});
    } catch (error) {
      setMessage('Error adding maqedoni price.');
    }
  };

  
  return (
    <div className="flex">
      {/* Main content area */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Maqedoni Prices</h2>
        {message && (
          <p
            className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}
  
        {/* Add new maqedoni price form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Lloji i Dhomes"
            value={updatedFields.lloji_dhomes || ''}
            onChange={(e) => handleEditChange(e, 'lloji_dhomes')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            placeholder="Sherbimi"
            value={updatedFields.sherbimi || ''}
            onChange={(e) => handleEditChange(e, 'sherbimi')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Gjatë Sezonës"
            value={updatedFields.gjat_sezones || ''}
            onChange={(e) => handleEditChange(e, 'gjat_sezones')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="number"
            placeholder="Jasht Sezonës"
            value={updatedFields.jasht_sezones || ''}
            onChange={(e) => handleEditChange(e, 'jasht_sezones')}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={addMaqedoniPrice}
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add Maqedoni Price
          </button>
        </div>
  
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Lloji i Dhomes</th>
              <th className="py-3 px-6 text-left">Sherbimi</th>
              <th className="py-3 px-6 text-left">Gjatë Sezonës</th>
              <th className="py-3 px-6 text-left">Jasht Sezonës</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {maqedoniPrices.map((price) => (
              <tr key={price.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{price.id}</td>
                <td className="py-3 px-6 text-left">
                  {editingMaqedoniPrice === price.id ? (
                    <input
                      type="text"
                      value={updatedFields.lloji_dhomes}
                      onChange={(e) => handleEditChange(e, 'lloji_dhomes')}
                      onBlur={() => updateMaqedoniPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.lloji_dhomes
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingMaqedoniPrice === price.id ? (
                    <input
                      type="text"
                      value={updatedFields.sherbimi}
                      onChange={(e) => handleEditChange(e, 'sherbimi')}
                      onBlur={() => updateMaqedoniPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.sherbimi
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingMaqedoniPrice === price.id ? (
                    <input
                      type="number"
                      value={updatedFields.gjat_sezones}
                      onChange={(e) => handleEditChange(e, 'gjat_sezones')}
                      onBlur={() => updateMaqedoniPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.gjat_sezones
                  )}
                </td>
                <td className="py-3 px-6 text-left">
                  {editingMaqedoniPrice === price.id ? (
                    <input
                      type="number"
                      value={updatedFields.jasht_sezones}
                      onChange={(e) => handleEditChange(e, 'jasht_sezones')}
                      onBlur={() => updateMaqedoniPrice(price.id)}
                      className="border border-gray-300 rounded px-2 py-1"
                    />
                  ) : (
                    price.jasht_sezones
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <Modal onConfirm={() => deleteMaqedoniPrice(price.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
                  </Modal>
                  <button
                    onClick={() => startEditing(price)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 ml-2 transition duration-200"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <Menu />
    </div>
  );

  export default MaqedoniPricesTable;