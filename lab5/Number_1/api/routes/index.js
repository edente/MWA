var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controller");

// router.route("/games").get(controllerGames.gamesGetAll)

// router.route("/games/new").post(controllerGames.gamesAddOne);

// router.route("/games/:gameId").get(controllerGames.gamesGetOne);
// router.route("/games/:title").get(controllerGames.gameByTitle)
router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerGames.gamesAddOne);
router.route("/games/:gameId").get(controllerGames.gamesGetOne)
                              .put(controllerGames.updateGame)
                              .delete(controllerGames.deleteGame);

module.exports = router