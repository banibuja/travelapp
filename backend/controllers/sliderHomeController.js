const SliderHome = require('../models/SliderHome');
const fs = require('fs');
const path = require('path');

// Fetch all images
const getAllImages = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
  
      const images = await SliderHome.findAll({ offset, limit });
      res.json(images);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Add a new image
const addImage = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Image Size:', req.body.imageBase64?.length);
  
    try {
      const { imageBase64, title } = req.body;
  
      if (!imageBase64) {
        return res.status(400).json({ message: 'Image data (Base64) is required' });
      }
  
      // Check image size (if needed for debugging)
      if (imageBase64.length > 50 * 1024 * 1024) {
        return res.status(400).json({ message: 'Image size exceeds the limit of 50MB' });
      }
  
      const newImage = await SliderHome.create({
        imageBase64,
        title,
      });
  
      res.status(201).json({
        message: 'Image uploaded successfully',
        image: newImage,
      });
    } catch (error) {
      console.error('Error uploading image:', error);  // Log full error for better debugging
      res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
  };
  
  
  

// Delete an image
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await SliderHome.findByPk(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    await image.destroy();
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an image
const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: 'ImageBase64 is required for update' });
    }

    const image = await SliderHome.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    image.imageBase64 = imageBase64;
    await image.save();

    res.status(200).json({
      message: 'Image updated successfully',
      image
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllImages,
  addImage,
  deleteImage,
  updateImage
};