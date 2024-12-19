import React, { useState } from 'react';
import axios from 'axios';

const GreqiSlider = () => {
  const [newImage, setNewImage] = useState({ title: '', file: null });
  const [message, setMessage] = useState('');

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
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result.split(',')[1];

      try {
        const response = await axios.post('/api/slider-images', {
          imageBase64: base64String,
          title: newImage.title,
        });
        setMessage('Image added successfully.');
        setNewImage({ title: '', file: null });
      } catch (error) {
        console.error('Error adding image:', error);
        setMessage('Error adding image.');
      }
    };

    reader.readAsDataURL(newImage.file);
  };

  return (
    <div className="max-w-4xl m-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Slider Image</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes('successfully') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleAddImage} className="flex flex-col items-center">
        <input
          type="text"
          name="title"
          value={newImage.title}
          onChange={handleInputChange}
          placeholder="Image Title"
          className="border rounded px-4 py-2 mb-3 w-80"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border rounded px-4 py-2 mb-3 w-80"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Add Image
        </button>
      </form>
    </div>
  );
};

export default GreqiSlider;
