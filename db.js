const { default: mongoose } = require("mongoose");
 mongoose.connect("mongodb+srv://nivedzedsoft:dFx4kjwc7ws3pOUR@cluster0.isshhdz.mongodb.net/send?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("data base connected");
    
}).catch((err)=>{
    console.log(err);
    
})

// mongoose.connect("mongodb+srv://mms2:mms2@cluster0.wqyacmy.mongodb.net/mms2?retryWrites=true&w=majority&appName=Cluster0")

 

// mongodb+srv://mms3:mms3@cluster0.2bigdep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0    
// dFx4kjwc7ws3pOUR

// mongodb+srv://nivedzedsoft:dFx4kjwc7ws3pOUR@cluster0.isshhdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0  