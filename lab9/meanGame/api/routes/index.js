var express = require("express");
var router = express.Router();

var controllerGames = require("../controllers/games.controllers"); 
const controllerPublishers = require("../controllers/publisher-controller");
const controllerReviews = require("../controllers/reviews-controller");
const controllerUsers = require("../controllers/users-controller");

// getting all the games and adding one game 
router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerGames.gamesAddOne);

// getting, updating and deleting one game 
router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesUpdateOne)
.delete(controllerGames.gamesDeleteOne);


// all the methods related to the publisher
router.route("/games/:gameId/publisher")
.get(controllerPublishers.publisherGetOne)
.post(controllerPublishers.publisherAdd);

// methods related  to the review ( get all and add one reviews )
router.route("/games/:gameId/reviews")
    .get(controllerReviews.reviewsGetAll)
    .post(controllerReviews.reviewsAddOne);
// methods related to the review (get, update and delete one review)
router.route("/games/:gameId/reviews/:reviewId")
    .get(controllerReviews.reviewsGetOne)
    .put(controllerReviews.reviewsUpdateOne)
    .delete(controllerReviews.reviewsDeleteOne);

    //for registering user to the database
router.route("/users/register")
.post(controllerUsers.register);    


module.exports = router;