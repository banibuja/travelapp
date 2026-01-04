require('dotenv').config();
const nodemailer = require('nodemailer');
const Aranzhmanet = require('../models/Aranzhmanet');
const Shtetet = require('../models/shtetet');
const Airports = require('../models/airports');
const BusStations = require('../models/busStations');
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
        {
          model: BusStations,
          attributes: ['emri', 'adresa'], // Include bus station name and address
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
          airport: aranzhmani.airport ? `${aranzhmani.airport.emri} (${aranzhmani.airport.akronimi})` : null,
          busStationId: aranzhmani.busStationId,
          busStation: aranzhmani.busStation ? aranzhmani.busStation.emri : null,
          cmimi: aranzhmani.cmimi,
          rating: aranzhmani.rating,
          shtetiId: aranzhmani.shtetiId,
          shteti: aranzhmani.shtetet.emri,
          imageBase64: aranzhmani.imageBase64,
          llojiTransportit: aranzhmani.llojiTransportit,
          usageLimit: aranzhmani.usageLimit
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
  const { titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airportId, busStationId, cmimi, rating, shtetiId, imageBase64, llojiTransportit, usageLimit } = req.body;
  
  // Validate required fields
  if (!shtetiId || shtetiId === '' || isNaN(parseInt(shtetiId))) {
    return res.status(400).json({ message: 'Country (shtetiId) is required and must be a valid number.' });
  }

  try {
    const newAranzhmani = await Aranzhmanet.create({
      titulli, 
      nrPersonave: parseInt(nrPersonave) || null, 
      nrNeteve: parseInt(nrNeteve) || null, 
      llojiDhomes, 
      sherbimi, 
      dataNisjes, 
      dataKthimit, 
      airportId: airportId ? parseInt(airportId) : null, 
      busStationId: busStationId ? parseInt(busStationId) : null,
      cmimi: parseFloat(cmimi) || null, 
      rating: parseInt(rating) || null, 
      shtetiId: parseInt(shtetiId),
      imageBase64: imageBase64 || null,
      llojiTransportit: llojiTransportit || null,
      usageLimit: usageLimit ? parseInt(usageLimit) : null,
    });

    // Try to send email, but don't fail if it doesn't work
    try {
      const users = await User.findAll({ attributes: ['email'] });
      const emailList = users.map(user => user.email).filter(email => email);

      if (emailList.length > 0 && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: emailList,
          subject: 'New Offer Added!',
          text: `A new offer has been added:
      
      Title: ${newAranzhmani.titulli}
      Number of People: ${newAranzhmani.nrPersonave}
      Number of Nights: ${newAranzhmani.nrNeteve}
      Room Type: ${newAranzhmani.llojiDhomes}
      Service: ${newAranzhmani.sherbimi}
      Departure Date: ${newAranzhmani.dataNisjes}
      Return Date: ${newAranzhmani.dataKthimit}
      Price: ${newAranzhmani.cmimi} EUR
      `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(201).json({
          message: 'Aranzhmani u shtua me sukses dhe email-i u dërgua!',
          Aranzhmani: newAranzhmani,
        });
      }
    } catch (emailError) {
      console.error('Gabim gjatë dërgimit të email-it (por aranzhmani u ruajt):', emailError.message);
      // Continue even if email fails
    }

    res.status(201).json({
      message: 'Aranzhmani u shtua me sukses!',
      Aranzhmani: newAranzhmani,
      emailNote: 'Email nuk u dërgua. Kontrolloni konfigurimin e email-it në .env file.',
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
    const { titulli, nrPersonave, nrNeteve, llojiDhomes, sherbimi, dataNisjes, dataKthimit, airport, airportId, busStationId, cmimi, rating, shteti, imageBase64, llojiTransportit, usageLimit } = req.body;
    const Aranzhmani = await Aranzhmanet.findByPk(id);
    if (!Aranzhmani) {
      return res.status(404).json({ error: 'Aranzhmani not found' });
    }

    Aranzhmani.titulli = titulli !== undefined ? titulli : Aranzhmani.titulli;
    Aranzhmani.nrPersonave = nrPersonave !== undefined ? nrPersonave : Aranzhmani.nrPersonave;
    Aranzhmani.nrNeteve = nrNeteve !== undefined ? nrNeteve : Aranzhmani.nrNeteve;
    Aranzhmani.llojiDhomes = llojiDhomes !== undefined ? llojiDhomes : Aranzhmani.llojiDhomes;
    Aranzhmani.dataNisjes = dataNisjes !== undefined ? dataNisjes : Aranzhmani.dataNisjes;
    Aranzhmani.dataKthimit = dataKthimit !== undefined ? dataKthimit : Aranzhmani.dataKthimit;
    Aranzhmani.airport = airport !== undefined ? airport : Aranzhmani.airport;
    Aranzhmani.rating = rating !== undefined ? rating : Aranzhmani.rating;
    Aranzhmani.shteti = shteti !== undefined ? shteti : Aranzhmani.shteti;
    Aranzhmani.cmimi = cmimi !== undefined ? cmimi : Aranzhmani.cmimi;
    Aranzhmani.sherbimi = sherbimi !== undefined ? sherbimi : Aranzhmani.sherbimi;
    if (airportId !== undefined) {
      Aranzhmani.airportId = airportId ? parseInt(airportId) : null;
    }
    if (busStationId !== undefined) {
      Aranzhmani.busStationId = busStationId ? parseInt(busStationId) : null;
    }
    if (imageBase64 !== undefined) {
      Aranzhmani.imageBase64 = imageBase64;
    }
    if (llojiTransportit !== undefined) {
      Aranzhmani.llojiTransportit = llojiTransportit;
    }
    if (usageLimit !== undefined) {
      Aranzhmani.usageLimit = usageLimit ? parseInt(usageLimit) : null;
    }

    await Aranzhmani.save();
    
    // Fetch updated record with associations
    const updatedAranzhmani = await Aranzhmanet.findByPk(id, {
      include: [
        { model: Shtetet, attributes: ['emri'] },
        { model: Airports, attributes: ['emri', 'akronimi'] },
      ],
    });

    res.status(200).json({
      id: updatedAranzhmani.id,
      titulli: updatedAranzhmani.titulli,
      nrPersonave: updatedAranzhmani.nrPersonave,
      nrNeteve: updatedAranzhmani.nrNeteve,
      llojiDhomes: updatedAranzhmani.llojiDhomes,
      usageLimit: updatedAranzhmani.usageLimit,
      sherbimi: updatedAranzhmani.sherbimi,
      dataNisjes: updatedAranzhmani.dataNisjes,
      dataKthimit: updatedAranzhmani.dataKthimit,
          airportId: updatedAranzhmani.airportId,
          airport: updatedAranzhmani.airport ? `${updatedAranzhmani.airport.emri} (${updatedAranzhmani.airport.akronimi})` : null,
          busStationId: updatedAranzhmani.busStationId,
          cmimi: updatedAranzhmani.cmimi,
          rating: updatedAranzhmani.rating,
          shtetiId: updatedAranzhmani.shtetiId,
          shteti: updatedAranzhmani.shtetet.emri,
          imageBase64: updatedAranzhmani.imageBase64,
          llojiTransportit: updatedAranzhmani.llojiTransportit,
          usageLimit: updatedAranzhmani.usageLimit,
    });
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
