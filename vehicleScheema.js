const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  district: { type: String, required: true },
  vehicleRCNumber: { type: String, required: true },
  vehicleFCNumber: { type: String, required: true },
  insuranceNumber: { type: String, required: true },
  vehicleWeight: { type: Number, required: true, min: 0 },
  vehicleImage: { type: String }, // filename or URL
  currentStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
  vehicleType: { type: String, required: true },
  ownerContact: { type: String, required: true },
  chassisNumber: { type: String, required: true },
  rcValidTill: { type: Date, required: true },
  fcValidTill: { type: Date, required: true },
  insuranceValidTill: { type: Date, required: true }, 
  maximumCapacity: { type: String, required: true },
  numberPlateImage: { type: String }, // filename or URL
}, {
  timestamps: true
});

 
const vehicles = mongoose.model('Vehicles', vehicleSchema);
module.exports = vehicles
