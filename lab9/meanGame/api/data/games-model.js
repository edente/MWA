const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name:{
        type:String,
        //required:true
    },
    // country:{
    //     type:String,
    //     //required:true
    // },
    location:{
        //Store coordinates in order logitude(E/W),latitude 
        // address:String,
        coordinates:{
            type:[Number],  //long(E/W),lat(N/S)
            index:"2dsphere"
        }
    }

});
const reviewSchema = new mongoose.Schema({
    name:{
        type:String
        //required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        //required:true
    },
    review:{
        type:String
        //required:true
    },
    createdOn:{
        type:Date,
        "default":Date.now
    }
});

const gameSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:Number,
    designers:[String],
    minPlayers:{
        type:Number,
        min:1,
        max:10
    },
    maxPlayers:{
        type:Number,
        min:1,
        max:10
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        "default":1
    },
    //publisher:publisherSchema,
   // reviews:[reviewSchema]
});

mongoose.model("Game",gameSchema,"games"); //Collection in MOngoDB is games (compiling the document)