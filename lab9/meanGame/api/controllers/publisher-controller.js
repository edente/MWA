const mongoose = require("mongoose");
const Game = mongoose.model("Game");


// Getting the publisher for a specific game
module.exports.publisherGetOne = function(req,res){
    console.log("Getting one Publisher ");

    const gameId = req.params.gameId;

    console.log("Game Id "+gameId);
    Game.findById(gameId).select("publisher").exec(function(err,game){
        console.log("publisher "+game);
        const response = {
            status:200,
            message:[]
        };
        if(err){
            response.status=500;
            response.message =err;
            console.log(err);
            return;
        }
        else if(!game){                        // ("Result Checking ")
        console.log("Game id is not found in the database ",id);
        response.status =404;
        response.message = {"message":"Game ID not found "+gameId};
        }
        else{
            response.message=game.publisher?game.publisher:[];
        }
        res.status(response.status).json(response.message);
    });
}



// helper function for adding publisher to the DB
var _addPublisher = function(req,res,game){
    console.log("The game to add a publisher");
    game.publisher.name=req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
    game.save(function(err,updatedGame){
        var response={
            status:200,
            message:[]
        };
        if(err){
            response.status=500;
            response.message =err;
        }else{
            response.status =201;
            response.message = updatedGame.publisher;
        }
        res.status(response.status).json(response.message);

    });
}

module.exports.publisherAdd = function(req,res){
    var gameId = req.params.gameId;
    console.log("Get GameId ",gameId);
    Game.findById(gameId).select("publisher").exec(function(err,game){
        var response={
            status:200,
            message:[]
        };
        if(err){
            console.log("Error finding game ..");
            response.status=500;
            response.message = err;
        }
        else if(!game){
            console.log("Game id not found in database",id);
            response.status = 404;
            response.message = {"message":"Game ID not found"+gameId};
        }
        if(game){
            _addPublisher(req,res,game);
        }
        else{
            res.status(response.status).json(response.message);
        }
    });
}


// helper method for updating the publisher 
var _updatePublisher =function(req,res,game){
    game.publisher.name = req.body.name;
    game.publisher.location.coordinates = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
    game.save(function(err,updatedGame){
        var response = {
            status:204
        };
        if(err){
            console.log("Error finding game");
            response.status=500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

// for updating the publisher's information
module.exports.publisherUpdate = function(req,res){
    var gameId = req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("-reviews").exec(function(err,game){
        var response = {
            status:204
        };
        if(err){
            console.log("Error finding Game ");
            response.status=500;
            response.message=err;
        }
        else if(!game){
            response.status =404;
            response.message = {"message":"Game ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }
        else{
            _updatePublisher(req,res,game);
        }

    });

}

// helper method for deleting a publisher from the specific Game

var _deletePublisher = function(req,res,game){
    game.publisher.remove();
    game.save(function(err,game){
        var response={
            status:204
        };
        if(err){
            console.log("Error finding the game ");
            response.status =500;
            response.message =err;
        }
        res.status(response.status).json(response.message);

    });
}

// for deleting the publisher from the Game
module.exports.publisherDelete = function(req,res){
    var gameId = req.params.gameId;
    console.log("DELETE GAME ...",gameId);

    Game.findById(gameId).select("-reviews").exec(function(err,game){
        var response = {status:204};
        if(err){
            console.log("Error finding game..");
            response.status=500;
            response.message =err;
        }
        else if(!game){
            response.status =404;
            response.message = {"message":"Game ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }
        else{
            _deletePublisher(req,res,game);
        }
    });
}

