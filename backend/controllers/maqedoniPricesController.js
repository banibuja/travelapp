const MaqedoniPrices = require ('../models/MaqedoniPrices');

//get all maqedoni prices
const getAllMaqedoniPrices = async (req, res) => {
    try{
        const maqedoniPrices = await MaqedoniPrices.findAll();
        res.json(maqedoniPrices);
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
};

//add  new maqedoni prices
const addMaqedoniPrices = async (req, res) => {
    const { lloji_dhomes, sherbimi, gjat_sezones, jasht_sezones } = req.body;

    try{
        newMaqedoniPrices = await MaqedoniPrices.create({
            lloji_dhomes, 
            sherbimi, 
            gjat_sezones, 
            jasht_sezones
        });
        res.status(201).json({message: 'Maqedoni prices added succesfully', maqedoniPrices: newMaqedoniPrices});
    }
    catch (error){
        res.status(500).json({ message:'Error adding maqedoni prices', error: error.message});
    }

};

// delete maqedoni prices
const deleteMaqedoniPrices = async (req, res) => {
    try{
        const { id } = req.params;
        const maqedoniPrices = await MaqedoniPrices.findByPK(id);
        if(!maqedoniPrices){
            return res.status(404).json({error: 'Maqedoni prices not found'});
        }
        await maqedoniPrices.destroy();
        res.status(200).json({message: 'Maqedoni Prices deleted successfully'});
    }
    catch (err){
        res.status(500).json({ error: err.message});
    }
};

//update maqedoni prices
const updateMaqedoniPrices = async (req, res) => {
    try{
        const { id } = req.params;
        const {lloji_dhomes, sherbimi, gjat_sezones, jasht_sezones} = req.body;
        const maqedoniPrices = await MaqedoniPrices.findByPK(id);
        if(!maqedoniPrices){
            return res.status(404).json({ error: 'Maqedoni price snot found'});
        }

        maqedoniPrices.lloji_dhomes = lloji_dhomes || maqedoniPrices.lloji_dhomes;
        maqedoniPrices.sherbimi = sherbimi || maqedoniPrices.sherbimi;
        maqedoniPrices.gjat_sezones = gjat_sezones || maqedoniPrices.gjat_sezones;
        maqedoniPrices.jasht_sezones = jasht_sezones || maqedoniPrices.jasht_sezones;

        await maqedoniPrices.save();
        res.status(200).json(maqedoniPrices);
    }catch (err){
        res.status(500).json({error: err.message});
    }
};

module.exports = {getAllMaqedoniPrices, addMaqedoniPrices, deleteMaqedoniPrices, updateMaqedoniPrices};