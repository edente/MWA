const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviewsGetAll = function(req,res){
    
    var gameId = req.params.gameId;
    console.log("Get gameId ", gameId);
    
    Game.findById(gameId).select("reviews").exec(function(err,game){
        console.log(game);
        var reviews = game.reviews;
        var response = {status:200, message:[]};
        if(err){
            console.log("Error Finding game");
            response.status = 500;
            response.message = err;
        } else if(!reviews){
            console.log("Game id not found in database", gameId);
            response.status = 404; 
            response.message = {"message" : "Game ID not found " + gameId};
        } else{
            response.message = game.reviews? game.reviews : [];
        }

        res.status(response.status).json(response.message);
    });
}
module.exports.reviewsGetOne = function(req, res){
    console.log("Getting one review");
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;
    var review;
    console.log(gameId);

    Game.findById(gameId).select("reviews").exec(function(err,game){
        // for(i = 0; i < game.reviews.length; i++){
        //     if(game.reviews[i]._id == reviewId)
        //         review = game.reviews[0];
        // }

        review = game.reviews.id(reviewId);
        console.log(review);
        const response ={
            status:200,
            message:review
        };
        
        if(err){
            response.status = 500;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!game || !review){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Game or Review ID not found."};
        }
        res.status(response.status).json(response.message);
        
    });
}
module.exports.reviewsDeleteOne = function(req, res){
    console.log("Getting one review");
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;

    Game.findById(gameId).exec(function(err,game){
        review = game.reviews.id(reviewId);
        console.log(review);
        const response ={
            status:204,
            message:review
        };
        
        if(err){
            response.status = 400;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!game || !review){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Game or Review ID not found."};
        }
        
        res.status(response.status).json(response.message);
        review.remove();
        game.save(function(err, updateGame) {
            response.message = updateGame;
        });   
        
    });
    
}

module.exports.reviewsUpdateOne = function(req, res){
    console.log("Getting one review");
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;
    var review;
    console.log(gameId);

    Game.findById(gameId).select("reviews").exec(function(err,game){
        review = game.reviews.id(reviewId);
        console.log(review);
        const response ={
            status:204,
            message:review
        };
        
        if(err){
            response.status = 400;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!game || !review){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Game or Review ID not found."};
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else{
            //we got a game, now we neet to update it
            console.log(game.title);
            review.name = req.body.name;
            review.rating = parseInt(req.body.rating);
            review.review = req.body.review;
            game.save(function(err, updateGame) {
                response.message = updateGame;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
        
    });
}


module.exports.reviewsAddOne=function(req,res){
    console.log("POST to add a review");
    const gameId = req.params.gameId;
    if(req.body.name && req.body.rating){
        Game.findById(gameId).select("-publisher").exec(function(err, game){
            const response =  {
                status : 204,
                message : game
            }
            if(err){
                response.status=400;
                response.message = err;
            } else if(!game){
                response.status=404;
                response.message = {"message": "Game ID not found"};
            } 
    
            //this means somethoing went wrong
            if(response.status != 204){
                res.status(response.status).json(response.message);
            }else{
                //we got a game, now we neet to update it
                if(game.reviews[0] == '' )
                    game.reviews = [{"name":req.body.name,"rating":req.body.rating,"review": req.body.review}];
                 else
                    game.reviews = game.reviews.concat([{"name":req.body.name,"rating":req.body.rating,"review": req.body.review}]);
                // game.reviews.rating  = parseInt(req.body.rating);
                // game.reviews.review = req.body.review;
                console.log(response.status);
                console.log(req.body.name);

                console.log("Games reviewss..."+game.reviews);
                game.save(function(err, updateGame) {
                    response.message = updateGame;
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }
    
        });
    } else{
        console.log("Data missing from POST body");
        res.status(400).json({error:"Required data missing from POST"});
    }
}