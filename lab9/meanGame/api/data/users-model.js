var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({

    username:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String
    },
    password:{
        type:String
    }
});

mongoose.model("User",userSchema);