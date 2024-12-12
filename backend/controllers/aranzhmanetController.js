const Aranzhmanet = require('../models/Aranzhmanet');
const Shtetet = require('../models/shtetet');
const Airports = require('../models/airports');

// Get all ofertat
const getAllAranzhmanet = async (req, res) => {
  try {
    const aranzhmanet = await Aranzhmanet.findAll({
      include: [
        {
          model: Shtetet,
          attributes: ['emri'], // Include only the 'emri' (country name) column
        },
        {
          model: Airports,
          attributes: ['emri', 'akronimi'], // Include only the 'emri' (country name) column
        },
      ],
    });
    res.json(
      aranzhmanet.map(aranzhmani => (
       {
        id: aranzhmani.id,
        titulli: aranzhmani.titulli,
        nrPersonave: aranzhmani.nrPersonave,
        nrNeteve: aranzhmani.nrNeteve,
        llojiDhomes: aranzhmani.llojiDhomes,
        sherbimi: aranzhmani.sherbimi,
        dataNisjes: aranzhmani.dataNisjes,
        dataKthimit: aranzhmani.dataKthimit,
        airport : `${aranzhmani.airport.emri} (${aranzhmani.airport.akronimi})`,
        cmimi: aranzhmani.cmimi,
        rating: aranzhmani.rating,
        shteti: aranzhmani.shtetet.emri
      }
      ))
    );
  } catch (err) {
    //     res.status(500).json({ error: err.message });
  }
};

// // Add new dubai price
// const addDubaiPrice = async (req, res) => {
//   const { nisja, tipi_dhomes, udhetimi, cmimi, sherbimi } = req.body;

//   try {
//     const newDubaiPrice = await DubaiPrices.create({
//       nisja, 
//       tipi_dhomes, 
//       udhetimi, 
//       cmimi, 
//       sherbimi
//     });

//     res.status(201).json({
//       message: 'Dubai price added successfully',
//       dubaiPrice: newDubaiPrice
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding dubai price', error: error.message });
//   }
// };

// // Delete dubai price
// const deleteDubaiPrice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const dubaiPrice = await DubaiPrices.findByPk(id);
//     if (!dubaiPrice) {
//       return res.status(404).json({ error: 'Dubai price not found' });
//     }
//     await dubaiPrice.destroy();
//     res.status(200).json({ message: 'Dubai price deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update dubai price
// const updateDubaiPrice = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nisja, tipi_dhomes, udhetimi, cmimi, sherbimi} = req.body;
//     const dubaiPrice = await DubaiPrices.findByPk(id);
//     if (!dubaiPrice) {
//       return res.status(404).json({ error: 'Dubai price not found' });
//     }

//     dubaiPrice.nisja = nisja || dubaiPrice.nisja;
//     dubaiPrice.tipi_dhomes = tipi_dhomes || dubaiPrice.tipi_dhomes;
//     dubaiPrice.udhetimi = udhetimi || dubaiPrice.udhetimi;
//     dubaiPrice.cmimi = cmimi || dubaiPrice.cmimi;
//     dubaiPrice.sherbimi = sherbimi || dubaiPrice.sherbimi;

//     await dubaiPrice.save();
//     res.status(200).json(dubaiPrice);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = { getAllAranzhmanet};
