const { default: mongoose } = require("mongoose");
mongoose.connect("mongodb+srv://nivedzedsoft:nivedzedsoft@cluster0.x6l3zy2.mongodb.net/mimas?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("data base connected");
    
}).catch((err)=>{
    console.log(err);
    
})