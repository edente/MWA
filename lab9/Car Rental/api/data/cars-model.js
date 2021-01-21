const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String
        //required:true
    },
    age:{
        type:Number
       // required:true
    },
    drivingLicence:{
        type:String
       // require:true
 } });

 
const CarsSchema=new mongoose.Schema({
    year:{
        type:Number,
        required:true
     },
    make:{
        type:String,
        required:true
    },
    model:{
        type:String ,
        required:true
    },
    MadeIn:{
        type:String,
        default:"Japan"
    },
    transmission:{
        type:String,
        required:true
    },
user:userSchema
     


});

mongoose.model("Car", CarsSchema, "Cars");
