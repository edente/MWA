var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controller");

router.route("/games").get(controllerGames.gamesGetAll)
                      .post(controllerGames.gamesAddOne);

router.route("/games/:gameId").get(controllerGames.gamesGetAll);

module.exports = router