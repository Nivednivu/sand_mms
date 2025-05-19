const { default: mongoose } = require("mongoose");

const AdminScheema = new mongoose.Schema({
   hsnCode: String,
     lesseeId: String,
  minecode: String,
    lesseeName: String,
    lesseeNameAddress: String,
    SerialNo:String,
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
    
})
  
const admins = mongoose.model("admins",AdminScheema)
module.exports = admins

  