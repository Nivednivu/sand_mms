const mongoose = require('mongoose');



const employeeSchema = new mongoose.Schema({
     lesseeId: String,
    registrationHolderName: String,
    registrationHolderAddress: String,
    SerialNo:String,
      SerialEndNo:String,
    bulkPermitNo:String,
    districtName: String,
    Taluk:String,
   village: String, 
  sfNoExtent: String,
  mineralName: String,
  signature:String, 
  // deliveredTo: String,
  // vehicleNo: String,
  // vehicleType: String,
  totalDistance: String,  //  approximateDistance:String,
      travellingDate: String,
    requiredTime: String,
 destinationState:String,
//  startingTime: String,
//  endTime: String,
  quantity: String,
  locationStockyard:String,
  validityStockyard:String,
  transitSerialNo:String,
 purchaserName: String,
 purchaserAddress: String,
  driverName: String,
  fullname:String,
  email:{
    type:String,
    unique:true
  },
  password:String}, {
  timestamps: true});

const employees = mongoose.model('employees', employeeSchema);
module.exports = employees  
