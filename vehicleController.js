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

// controllers/vehicleController.js
exports.updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const updatedData = { ...req.body };

    // Handle file uploads if present
    if (req.files?.vehicleImage?.length) {
      updatedData.vehicleImage = req.files.vehicleImage[0].filename;
    }
    if (req.files?.numberPlateImage?.length) {
      updatedData.numberPlateImage = req.files.numberPlateImage[0].filename;
    }

    const updatedVehicle = await vehicles.findByIdAndUpdate(vehicleId, updatedData, { new: true });

    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle updated successfully', data: updatedVehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating vehicle', details: error.message });
  }
};

 
// controllers/vehicleController.js
exports.getAllVehicles = async (req, res) => {
  try {
    const vehiclesList = await vehicles.find(); // Fetch all vehicle documents
    res.status(200).json({ message: 'Vehicles fetched successfully', data: vehiclesList });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles', details: error.message });
  }
};

// In your vehicleController.js
exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if vehicle exists - note the correct model name 'vehicles'
    const vehicle = await vehicles.findById(id);
    if (!vehicle) {
      return res.status(404).json({ 
        success: false,
        error: 'Vehicle not found' 
      });
    }

    // Delete from database - corrected model name
    await vehicles.findByIdAndDelete(id);
    
    res.status(200).json({ 
      success: true,
      message: 'Vehicle deleted successfully',
      deletedId: id
    });
    
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete vehicle', 
      details: error.message 
    });
  }
};