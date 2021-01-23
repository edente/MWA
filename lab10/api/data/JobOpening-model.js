const mongoose=require("mongoose");

const locationSchema= new mongoose.Schema({
     Street:{
         type:String
     },
     ZipCode:{
         type:String
     },
    State:{
        type:String
    },
    country:{
        type:String
    }

});
const reviewSchema = new mongoose.Schema({
    name:{
        type:String
        //required:true
    },
    
    review:{
        type:String
        //required:true
    },
    Date:{
        type:Date,
        "default":Date
    }
});

const JobOpeningSchema = new mongoose.Schema({
  title:{
      type:String,
     // required:true
  },
     salary:{
         type:Number,
        //  required:true

     },
     description:{
         type:String,
         
        //  required:true
     },
      experience:{
          type:String,
        //   required:true
      },
       skills:{
           type:[String],
        //    required:true
       },
       postDate:{
           type:Date  //Date
         //  required:true
       },
      location:locationSchema,
       reviews:[reviewSchema]


});


    mongoose.model("JobOpenings", JobOpeningSchema, "JobOpening");