const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  hsnCode: String,
  minecode: String,
  dispatchDateTime: String,
  lesseeId: String,
  serialNo: String,  
  lesseeName: String,
  lesseeNameAddress: String,
  mineralName: String,
  bulkPermitNo: String,
  classification: String,
  orderRef: String,
  leasePeriod: String,
  withinTamilNadu: String,
  dispatchSlipNo: String,
  districtName: String,
  deliveredTo: String,
  talukName: String,
  vehicleNo: String,
  village: String,
  vehicleType: String,
  sfNoExtent: String,
  totalDistance: String,
  destinationAddress: String,
  travellingDate: String,
  driverName: String,
  requiredTime: String,
  via: String,
  quantity: String,
  driverLicenseNo: String,
  driverPhoneNo: String,
  authorizedPersonName: String,
  driverSignature: String,
  adSignature: String
}, {
  timestamps: true
});

const querys = mongoose.model('querys', querySchema);
module.exports = querys  
