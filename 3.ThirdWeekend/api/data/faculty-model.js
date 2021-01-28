var mongoose = require("mongoose");

var FacultySchema = new mongoose.Schema({

    FirstName:{
        type:String,
        unique:true,
        required:true
    },
    LastName:{
        type:String
    },
    
});

mongoose.model("Faculty",FacultySchema);