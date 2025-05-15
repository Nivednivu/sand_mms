const { default: mongoose } = require("mongoose");

const usersScheema = new mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String
    },
    password:{
        type:String
 
    }
})

const users = mongoose.model("users",usersScheema)
module.exports = users