
const mongoose= require("mongoose");
var Game= mongoose.model("Game");
//const dbconnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

// Get All old Meathod
// module.exports.gamesGetAll = function(req, res){

//     console.log("Get all games");
//     console.log(req.query);

//     var offset = 0;
//     var count = 3;

//     if(req.query && req.query.offset){
//         offset = parseInt(req.query.offset);
//     }

//     if(req.query && req.query.count){
//         count = parseInt(req.query.count); 
//         if(count > 7){
//             count = 7;
//         }
//     }

//     var db = dbconnection.get();
//     var collection = db.collection("games");

//     collection.find().skip(offset).limit(count).toArray(function(err, docs){
//         console.log("games ", docs);
//         res.status(200).json(docs);
//     });


// }

// new Get all Using  MOngoose

module.exports.gamesGetAll= function(req, res) {
     var offset= 0;
    var count= 5;
    var maxCount=10;
    if (req.query && req.query.offset) {
    offset= parseInt(req.query.offset, 10); 
}
    if (req.query && req.query.count) {
         offset= parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({"message": "QueryString Offset and Count should benumbers"});
        return;
        }
        if (count > maxCount) {
            res.status(400).json({"message": "Cannot exceed count of "+ maxCount});
            return; }
    Game.find().skip(offset).limit(count).exec(function(err, games) {
        if(err){
            console.log("Error finding games");
            res.status(500).json(err);
        }
        else{
    console.log("Found games", games.length);
    res.json(games); 
}
    
        });
    };


// Get One Using MONGO
// module.exports.gamesGetOne = function(req, res){

//     var db = dbconnection.get();
//     var collection = db.collection("games");
//     const gameId = req.params.gameId;

//     collection.findOne({_id: ObjectId(gameId)}, function(err, doc){
//         console.log("GET game with gameId: ", gameId);
//         res.status(200).json(doc);
//     });
    
   
// }


//Get One using MOngoose
module.exports.gamesGetOne= function(req, res) {
    var gameId= req.params.gameId;
   
     
    //   Game.findById(gameId).exec(function(err, game) {
    //     if (err) {
    //         console.log("Error finding game"); res.status(500).json(err);
    //         } else { res.status(200).json(game);
    //         }

          
    //    res.status(200).json(game); });


    // Good SE Coding Practise
    Game.findById(gameId).exec(function(err, game) {
        var response= { 
            status: 200, 
            message: game};
        if (err) {
        console.log("Error finding game");
         response.status= 500;
          response.message= err;
        } else if(!game) {
        response.status= 404;
        response.message= {"message" : "Game ID not found"};
        }
        res.status(response.status).json(response.message); });
        };

// meathod for By title
module.exports.gameByTitle = function(req, res){

    var db = dbconnection.get();
    var collection = db.collection("games");
    const gameId = req.params.gameId;

    collection.findOne({_id: ObjectId(gameId)}, function(err, doc){
        console.log("GET game with gameId: ", gameId);
        res.status(200).json(doc);
    });
    
   
}
module.exports.gamesAddOne = function(req, res){
    console.log("POST to add a game");
    

    var db = dbconnection.get();
    var collection = db.collection("games");
    var newGame;
    if(req.body && req.body.title && req.body.price){
        newGame = req.body;
        newGame.price = parseFloat(req.body.price);
        newGame.title = req.body.title;
        console.log(newGame);
        collection.insertOne(newGame, function(err, response){
            console.log(response.ops);
            res.status(201).json(req.body);

        });

        console.log(req.body);
    }else {
        console.log("Data missing from POSt body");
        res.status(400).json({error: "Required data missing from POST"});
    }

}
module.exports.updateGame = function(req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
      let response = { status: 204 };
      if(err) {
        response.status = 500;
        response.message = err;
      }
      if(!game) {
        response.status = 404;
        response.message = {message: "Game Id is not found."}
      }
      if(response.status !== 204) {
        res.status(res.status).json(response.message);
      } else {
        game.title = req.body.title;
        game.year = parseInt(req.body.year);
        game.rate = parseInt(req.body.rate);
        game.price = parseFloat(req.body.price);
        game.minPlayers = parseInt(req.body.min_players);
        game.maxPlayers = parseInt(req.body.max_players);
        game.minAge = parseInt(req.body.min_age);
        game.designers = req.body.designers;
        game.save(function(updateErr, updatedGame){
          if(updateErr) {
            response.status = 500;
            response.message = updateErr;
          } else {
            response.message = updatedGame;
          }
          res.status(response.status).json(response.message);
        })
      }
    })
    Game.update({
      title: req.body.title,
      year: parseInt(req.body.year),
      rate: parseInt(req.body.rate),
      price: parseFloat(req.body.price),
      minPlayers: parseInt(req.body.min_players),
      maxPlayers: parseInt(req.body.max_players),
      minAge: parseInt(req.body.min_age),
      designers: req.body.designers
    }, function(err, updatedGame){
      response = {
        status: 204,
        message: updatedGame
      }
      if(err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    })
  }
  
  module.exports.deleteGame = function(req, res) {
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function(err, deletedGame){
      let response = {
        status: 204,
        message: "Deleted game successfully."
      };
      if(err) {
        response.status = 500;
        response.message = err;
      }
      if(!deletedGame) {
        response.status = 404;
        response.message = {message: "Game Id is not found."}
      }
      res.status(response.status).json(response.message);
    })
  }

