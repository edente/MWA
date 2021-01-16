var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controller");
const publisherController = require("../controllers/publisher_controller");
const reviewsController = require("../controllers/reviews_controller");


// router.route("/games").get(controllerGames.gamesGetAll)

// router.route("/games/new").post(controllerGames.gamesAddOne);

// router.route("/games/:gameId").get(controllerGames.gamesGetOne);
// router.route("/games/:title").get(controllerGames.gameByTitle)
router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerGames.gamesAddOne);
router.route("/games/:gameId").get(controllerGames.gamesGetOne)
                              .put(controllerGames.updateGame)
                              .delete(controllerGames.deleteGame);
router.route("/games/:gameId/publisher").get(publisherController.getPublisher)
                              .post(publisherController.createPublisher)
                              .put(publisherController.updatePublisher)
                              .delete(publisherController.deletePublisher);
router.route("/games/:gameId/reviews/:reviewId").get(reviewsController.getReview)
                              .put(reviewsController.updateReview)
                              .delete(reviewsController.deleteReview);




module.exports = router;