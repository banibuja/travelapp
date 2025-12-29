import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import Menu from '../Menu';

const GreqiSlider = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({ title: '', file: null });
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/greqi-images', {
          withCredentials: true,
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setMessage('There was an error fetching images.');
      }
    };

    fetchImages();
  }, []);

  const deleteGreqiImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/greqi-image-delete/${id}`, {
        withCredentials: true,
      });
      setImages(images.filter((image) => image.id !== id));
      setMessage('Image deleted successfully.');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Error deleting image.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage({ ...newImage, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewImage({ ...newImage, file: e.target.files[0] });
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.file) {
      setMessage('Please select a file.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post('http://localhost:5001/api/add-greqi-image', {
          imageBase64: base64String,
          title: newImage.title,
        }, { withCredentials: true });
        setImages([...images, response.data.image]);
        setMessage('Image added successfully.');
        setNewImage({ title: '', file: null });
        setShowAddForm(false);
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Error adding image:', error);
        setMessage('Error adding image.');
        setTimeout(() => setMessage(''), 3000);
      }
    };

    reader.readAsDataURL(newImage.file);
  };

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Greqi Slider</h2>
                  <p className="text-cyan-200 text-sm">{images.length} images</p>
                </div>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2.5 rounded-xl text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform"
                style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Image</span>
              </button>
            </div>
          </div>

          {message && (
            <div className={`mx-8 mt-6 p-4 rounded-xl text-center font-medium ${message.includes('success') ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>{message}</div>
          )}

          {showAddForm && (
            <div className="mx-8 mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Add New Image</h3>
              <form onSubmit={handleAddImage} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={newImage.title}
                  onChange={handleInputChange}
                  placeholder="Image Title"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500"
                />
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-xl text-white font-semibold" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>Add</button>
                </div>
              </form>
            </div>
          )}

          <div className="p-8">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)' }}>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {images.map((image) => (
                    <tr key={image.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-800">{image.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={`data:image/jpeg;base64,${image.imageBase64}`}
                          alt={image.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Modal onConfirm={() => deleteGreqiImage(image.id)}>
                            <button className="p-2 rounded-lg text-white hover:scale-110 transition-transform" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </Modal>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {images.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No images found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreqiSlider;
