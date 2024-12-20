const SliderGreqi = require('../models/SliderGreqi');

// Fetch all images
const getAllGreqiImages = async (req, res) => {
  try {
    const images = await SliderGreqi.findAll(); // Replace with your ORM query
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new image
const addGreqiImage = async (req, res) => {
  try {
    const { imageBase64, title } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: 'Image data (Base64) is required' });
    }

    const newImage = await SliderGreqi.create({
      imageBase64,
      title,
    });

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: newImage,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an image
const deleteGreqiImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await SliderGreqi.findByPk(id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    await image.destroy();
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllGreqiImages,
  addGreqiImage,
  deleteGreqiImage,
};
