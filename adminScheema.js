const { default: mongoose } = require("mongoose");

const AdminScheema = new mongoose.Schema({
     hsnCode: String,
     lesseeId: String,
    minecode: String,
    lesseeName: String,
    lesseeNameAddress: String,
    SerialNo:String,
      SerialEndNo:String,
    bulkPermitNo:String,
    districtName: String,
    Taluk:String,
   village: String,
  sfNoExtent: String,
  classification: String,
  leasePeriod: String,
    dispatchNo:String, 
    withinTamilNadu: String, 
  mineralName: String,
  signature:String,
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
  lesseeAuthPersonName:String,
  fullname:String,
  email:{
    type:String,
    unique:true
  },
  password:String
}) 

const admins = mongoose.model("admins",AdminScheema)
module.exports = admins

   