var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({

    FirstName:{
        type:String,
        unique:true,
        required:true
    },
    LastName:{
        type:String
    },
    EmailAddress:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        required:true
    }

    
});

mongoose.model("StudentAttendance",studentSchema,"StudentAttendance");