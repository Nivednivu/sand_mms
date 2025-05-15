const { default: mongoose } = require("mongoose");

const AdminScheema = new mongoose.Schema({
   hsnCode: String,
     lesseeId: String,
  minecode: String,
    lesseeNameAddress: String,
    lesseeAreaDetails:String,
  districtName: String,
  village: String,
  sfNoExtent: String,
  classification: String,
  leasePeriod: String,
    withinTamilNadu: String,
  mineralName: String,

})

const admins = mongoose.model("admins",AdminScheema)
module.exports = admins