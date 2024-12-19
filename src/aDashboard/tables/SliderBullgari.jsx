import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Menu';
import Modal from '../Modal';

function SliderBullgari() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [newImage, setNewImage] = useState({ title: '', file: null });

  // Fetch all images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bullgari/images', {
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

  // Add new image
  const addImage = async () => {
    if (!newImage.file) {
      setMessage('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          'http://localhost:5000/api/bullgari/add-images',
          { imageBase64: base64String, title: newImage.title },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        setImages([...images, response.data.image]);
        setMessage('Image added successfully.');
        setNewImage({ title: '', file: null });
      } catch (error) {
        console.error('Error adding image:', error);
        setMessage('Error adding image.');
      }
    };

    reader.readAsDataURL(newImage.file);
  };

  // Delete image
  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bullgari/images-delete/${id}`, {
        withCredentials: true,
      });
      setImages(images.filter((image) => image.id !== id));
      setMessage('Image deleted successfully.');
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Error deleting image.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Content Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Images</h2>
        {message && (
          <p
            className={`mb-4 ${
              message.includes('successfully') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        {/* Add new image form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Image Title"
            value={newImage.title}
            onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage({ ...newImage, file: e.target.files[0] })}
            className="border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={addImage}
            className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Add Image
          </button>
        </div>

        {/* Images Table */}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {images.map((image) => (
              <tr key={image.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{image.id}</td>
                <td className="py-3 px-6 text-left">{image.title}</td>
                <td className="py-3 px-6 text-left">
                  <img
                    src={`data:image/jpeg;base64,${image.imageBase64}`}
                    alt={image.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <Modal onConfirm={ () => deleteImage(image.id)}>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Fshi
                    </button>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar Menu */}
      <div className="w-64 bg-gray-100 border-l border-gray-300 shadow-lg">
        <Menu />
      </div>
    </div>
  );
}

export default SliderBullgari;
