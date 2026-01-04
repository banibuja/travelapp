import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

function ManageAranzhmanet() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [aranzhmanet, setAranzhmanet] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [editingImage, setEditingImage] = useState(null);
  const [editingImagePreview, setEditingImagePreview] = useState(null);
  const [reservationsCount, setReservationsCount] = useState({}); // Store counts for each package

  useEffect(() => {
    const fetchAranzhmanet = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/aranzhmanet', { withCredentials: true });
        setAranzhmanet(response.data);
        
        // Fetch completed reservations count for each package that has a usage limit
        const counts = {};
        const packagesWithLimit = response.data.filter(pkg => pkg.usageLimit !== null && pkg.usageLimit !== undefined);
        
        await Promise.all(
          packagesWithLimit.map(async (pkg) => {
            try {
              const countResponse = await axios.get(
                `http://localhost:5001/api/purchases/completed-count/${pkg.id}`,
                { withCredentials: true }
              );
              counts[pkg.id] = countResponse.data.count || 0;
            } catch (error) {
              console.error(`Error fetching count for package ${pkg.id}:`, error);
              counts[pkg.id] = 0;
            }
          })
        );
        
        setReservationsCount(counts);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchAranzhmanet();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/Aranzhmani-delete/${id}`, { withCredentials: true });
      setAranzhmanet(aranzhmanet.filter((item) => item.id !== id));
      setMessage('Package deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error deleting package.');
    }
  };

  const handleEditChange = (e, field) => {
    setUpdatedFields({ ...updatedFields, [field]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditingImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateItem = async (id) => {
    try {
      let updateData = { ...updatedFields };
      
      // If new image is selected, convert it to base64
      if (editingImage) {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64String = reader.result.split(',')[1];
          updateData.imageBase64 = base64String;
          
          try {
            const response = await axios.put(
              `http://localhost:5001/api/Aranzhmani-update/${id}`,
              updateData,
              { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
            );
            setAranzhmanet(aranzhmanet.map((item) => (item.id === id ? response.data : item)));
            setEditingId(null);
            setEditingImage(null);
            setEditingImagePreview(null);
            setMessage('Package updated successfully!');
            setTimeout(() => setMessage(''), 3000);
          } catch (error) {
            setMessage('Error updating package.');
          }
        };
        reader.readAsDataURL(editingImage);
      } else {
        // No new image, just update other fields
        const response = await axios.put(
          `http://localhost:5001/api/Aranzhmani-update/${id}`,
          updateData,
          { withCredentials: true }
        );
        setAranzhmanet(aranzhmanet.map((item) => (item.id === id ? response.data : item)));
        setEditingId(null);
        setEditingImage(null);
        setEditingImagePreview(null);
        setMessage('Package updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error updating package.');
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setUpdatedFields({
      titulli: item.titulli,
      cmimi: item.cmimi,
      nrPersonave: item.nrPersonave,
      nrNeteve: item.nrNeteve,
      llojiDhomes: item.llojiDhomes,
      sherbimi: item.sherbimi,
      dataNisjes: item.dataNisjes,
      dataKthimit: item.dataKthimit,
      llojiTransportit: item.llojiTransportit || '',
      usageLimit: item.usageLimit || '',
    });
    setEditingImage(null);
    setEditingImagePreview(null);
  };

  const filteredItems = aranzhmanet.filter(item =>
    item.titulli?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Menu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-72'} p-8`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Manage Packages</h2>
                  <p className="text-cyan-200 text-sm">{aranzhmanet.length} packages</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input type="text" placeholder="Search packages..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 text-white placeholder-white/60"
                    style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <svg className="w-5 h-5 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button onClick={() => navigate('/dashboard/AddAranzhmanet')}
                  className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Package</span>
                </button>
              </div>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
              {message}
            </div>
          )}

          {/* Table */}
          <div className="p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Image</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">People</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Nights</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Room</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Service</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Departure</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Return</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Usage Limit</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-500 uppercase">Transport</th>
                  <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <div className="space-y-2">
                          <input type="file" accept="image/*" onChange={handleEditImageChange}
                            className="text-xs border border-gray-300 rounded-lg p-1 focus:border-cyan-500 focus:outline-none" />
                          {editingImagePreview ? (
                            <img src={editingImagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                          ) : item.imageBase64 ? (
                            <img src={`data:image/jpeg;base64,${item.imageBase64}`} alt={item.titulli} className="w-16 h-16 object-cover rounded-lg" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">No image</div>
                          )}
                        </div>
                      ) : (
                        item.imageBase64 ? (
                          <img src={`data:image/jpeg;base64,${item.imageBase64}`} alt={item.titulli} className="w-20 h-20 object-cover rounded-lg" />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400">No image</div>
                        )
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input type="text" value={updatedFields.titulli} onChange={(e) => handleEditChange(e, 'titulli')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-32 focus:border-cyan-500 focus:outline-none" />
                      ) : (
                        <span className="font-semibold text-gray-800">{item.titulli}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input type="number" value={updatedFields.cmimi} onChange={(e) => handleEditChange(e, 'cmimi')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-20 focus:border-cyan-500 focus:outline-none" />
                      ) : (
                        <span className="text-green-600 font-semibold">€{item.cmimi}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input type="number" value={updatedFields.nrPersonave} onChange={(e) => handleEditChange(e, 'nrPersonave')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-16 focus:border-cyan-500 focus:outline-none" />
                      ) : item.nrPersonave}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input type="number" value={updatedFields.nrNeteve} onChange={(e) => handleEditChange(e, 'nrNeteve')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-16 focus:border-cyan-500 focus:outline-none" />
                      ) : item.nrNeteve}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input type="text" value={updatedFields.llojiDhomes} onChange={(e) => handleEditChange(e, 'llojiDhomes')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-24 focus:border-cyan-500 focus:outline-none" />
                      ) : item.llojiDhomes}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input type="text" value={updatedFields.sherbimi} onChange={(e) => handleEditChange(e, 'sherbimi')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-24 focus:border-cyan-500 focus:outline-none" />
                      ) : item.sherbimi}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {editingId === item.id ? (
                        <input type="date" value={updatedFields.dataNisjes} onChange={(e) => handleEditChange(e, 'dataNisjes')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                      ) : item.dataNisjes}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {editingId === item.id ? (
                        <input type="date" value={updatedFields.dataKthimit} onChange={(e) => handleEditChange(e, 'dataKthimit')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none" />
                      ) : item.dataKthimit}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <input 
                          type="number" 
                          value={updatedFields.usageLimit || ''} 
                          onChange={(e) => handleEditChange(e, 'usageLimit')}
                          min="1"
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm w-20 focus:border-cyan-500 focus:outline-none" 
                          placeholder="Unlimited" 
                        />
                      ) : (
                        <span className="text-gray-600 font-medium">
                          {item.usageLimit !== null && item.usageLimit !== undefined 
                            ? `${reservationsCount[item.id] || 0}/${item.usageLimit}`
                            : 'Unlimited'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === item.id ? (
                        <select value={updatedFields.llojiTransportit || ''} onChange={(e) => handleEditChange(e, 'llojiTransportit')}
                          className="px-2 py-1 border border-gray-300 rounded-lg text-sm focus:border-cyan-500 focus:outline-none">
                          <option value="">Select transport</option>
                          <option value="plane">Plane ✈️</option>
                          <option value="bus">Bus 🚌</option>
                        </select>
                      ) : (
                        <span className="text-gray-600">
                          {item.llojiTransportit === 'plane' && '✈️ Plane'}
                          {item.llojiTransportit === 'bus' && '🚌 Bus'}
                          {!item.llojiTransportit && '-'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        {editingId === item.id ? (
                          <>
                            <button onClick={() => updateItem(item.id)}
                              className="p-2 rounded-lg text-white hover:scale-110 transition-transform"
                              style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button onClick={() => setEditingId(null)}
                              className="p-2 rounded-lg bg-gray-200 text-gray-600 hover:scale-110 transition-transform">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEditing(item)}
                              className="p-2 rounded-lg text-white hover:scale-110 transition-transform"
                              style={{ background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <Modal onConfirm={() => deleteItem(item.id)}>
                              <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform"
                                style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </Modal>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-gray-400 text-lg">No packages found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAranzhmanet;
