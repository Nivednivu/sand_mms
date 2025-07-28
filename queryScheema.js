const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  lesseeId: String,
  registrationHolderName: String,
  registrationHolderAddress: String,
  SerialNo: String,
  SerialEndNo: String,
  bulkPermitNo: String,
  districtName: String,
  Taluk: String,
  village: String,
  sfNoExtent: String,
  mineralName: String,
  signature: String,
  quantity: String,
  locationStockyard: String,
  validityStockyard: String,
  transitSerialNo: String, 
  purchaserName: String,
  purchaserAddress: String,
  email: String, // Remove unique constraint if not needed
  password: String,
  fullname: String,
  destinationState: String,
  driverName: String,
  requiredTime: String,
  totalDistance: String,
  travellingDate: String,
  vehicleNo: String,
  time: String,
  formattedTravellingDate: String
}, {
  timestamps: true
});
const querys = mongoose.model('querys', querySchema);
module.exports = querys  
