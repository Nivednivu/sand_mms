const vehicles = require("./vehicleScheema.js");



exports.createVehicle = async (req, res) => {
  try {
    const data = req.body;
    data.vehicleImage = req.files['vehicleImage'] ? req.files['vehicleImage'][0].filename : null;
    data.numberPlateImage = req.files['numberPlateImage'] ? req.files['numberPlateImage'][0].filename : null;

    const newVehicle = new vehicles(data);
    await newVehicle.save();

    res.status(200).json({ message: 'Vehicle saved successfully', data: newVehicle });
  } catch (error) {
    res.status(500).json({ error: 'Error saving vehicle', details: error.message });
  }
};
 
exports.allVehicles = async (req,res)=>{
  try {
    const allVehicles = await vehicles.find();
    res.status(200).json(allVehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles', details: err.message });
  }

}
