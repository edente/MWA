angular.module("meanGames",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angular-app/game-list/games.html",
        controller:"GamesController",
        controllerAs:"vm"
    })
    .when("/game/:id",{
        templateUrl:"angular-app/game-display-controller/game.html",
        controller:"GameController",
        controllerAs:"vm"
    });
}