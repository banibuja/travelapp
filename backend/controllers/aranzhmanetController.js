require('dotenv').config();
const nodemailer = require('nodemailer');
const Aranzhmanet = require('../models/Aranzhmanet');
const Shtetet = require('../models/shtetet');
const Airports = require('../models/airports');
const User = require('../models/user');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


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
          airportId: aranzhmani.airportId,
          airport: `${aranzhmani.airport.emri} (${aranzhmani.airport.akronimi})`,
          cmimi: aranzhmani.cmimi,
          rating: aranzhmani.rating,
          shtetiId: aranzhmani.shtetiId,
          shteti: aranzhmani.shtetet.emri
        }
      ))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new Aranzhmanet price
// const addAranzhmanet = async (req, res) => {
//   const { titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airportId, cmimi, rating, shtetiId } = req.body;
//   try {
//     const newAranzhmani = await Aranzhmanet.create({
//       titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airportId, cmimi, rating, shtetiId
//     });
//     res.status(201).json({
//       message: 'Aranzhmanet added successfully',
//       Aranzhmani: newAranzhmani
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding Aranzhmani', error: error.message });
//   }
// };

const addAranzhmanet = async (req, res) => {
  const { titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airportId, cmimi, rating, shtetiId } = req.body;
  try {
    const newAranzhmani = await Aranzhmanet.create({
      titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airportId, cmimi, rating, shtetiId,
    });

    const users = await User.findAll({ attributes: ['email'] });
    const emailList = users.map(user => user.email);

    if (emailList.length === 0) {
      return res.status(400).json({ message: 'Nuk ka përdorues të regjistruar me email për të dërguar njoftimin.' });
    }

    const mailOptions = {
      from: 'travelbani48@gmail.com',
      to: emailList,
      subject: 'Ofertë e re është shtuar!',
      text: `Një ofertë e re është shtuar:
      
      Titulli: ${newAranzhmani.titulli}
      Numri i Personave: ${newAranzhmani.nrPersonave}
      Numri i Netëve: ${newAranzhmani.nrNeteve}
      Lloji i Dhomës: ${newAranzhmani.llojiDhomes}
      Shërbimi: ${newAranzhmani.sherbimi}
      Data e Nisjes: ${newAranzhmani.dataNisjes}
      Data e Kthimit: ${newAranzhmani.dataKthimit}
      Çmimi: ${newAranzhmani.cmimi} EUR
      `,
    };

    // Dërgimi i email-it
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: 'Aranzhmani u shtua me sukses dhe email-i u dërgua!',
      Aranzhmani: newAranzhmani,
    });
  } catch (error) {
    console.error('Gabim:', error);
    res.status(500).json({ message: 'Ndodhi një gabim gjatë shtimit të Aranzhmanit.', error: error.message });
  }
};



// Delete Aranzhmani
const deleteAranzhmanet = async (req, res) => {
  try {
    const { id } = req.params;
    const Aranzhmani = await Aranzhmanet.findByPk(id);
    if (!Aranzhmani) {
      return res.status(404).json({ error: 'Aranzhmani not found' });
    }
    await Aranzhmani.destroy();
    res.status(200).json({ message: 'Aranzhmani deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Aranzhmani
const updateAranzhmani = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airport, cmimi, rating, shteti } = req.body;
    const Aranzhmani = await Aranzhmanet.findByPk(id);
    if (!Aranzhmani) {
      return res.status(404).json({ error: 'Aranzhmani not found' });
    }

    Aranzhmani.titulli = titulli || Aranzhmani.titulli;
    Aranzhmani.nrPersonave = nrPersonave || Aranzhmani.nrPersonave;
    Aranzhmani.nrNeteve = nrNeteve || Aranzhmani.nrNeteve;
    Aranzhmani.llojiDhomes = llojiDhomes || Aranzhmani.llojiDhomes;
    Aranzhmani.dataNisjes = dataNisjes || Aranzhmani.dataNisjes;
    Aranzhmani.dataKthimit = dataKthimit || Aranzhmani.dataKthimit;
    Aranzhmani.airport = airport || Aranzhmani.airport;
    Aranzhmani.rating = rating || Aranzhmani.rating;
    Aranzhmani.shteti = shteti || Aranzhmani.shteti;
    Aranzhmani.cmimi = cmimi || Aranzhmani.cmimi;
    Aranzhmani.sherbimi = sherbimi || Aranzhmani.sherbimi;

    await Aranzhmani.save();
    res.status(200).json(Aranzhmani);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const countAranzhmanet = async (req, res) => {
  try {
    const aranzhmanCount = await Aranzhmanet.count();
    res.status(200).json({ count: aranzhmanCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { getAllAranzhmanet, updateAranzhmani, deleteAranzhmanet, addAranzhmanet, countAranzhmanet };
