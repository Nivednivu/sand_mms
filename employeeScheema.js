const mongoose = require('mongoose');



const employeeSchema = new mongoose.Schema({
  deliveredTo: String,
  vehicleNo: String,
  vehicleType: String,
  totalDistance: String,
 travellingDate: String,
 requiredTime: String,
  quantity: String,
  driverLicenseNo: String,
  driverPhoneNo: String,
  driverSignature: String,
 destinationAddress: String,
  driverName: String,
  via: String,
  lesseeAuthPersonName:String
}, {
  timestamps: true
});

const employees = mongoose.model('employees', employeeSchema);
module.exports = employees  
