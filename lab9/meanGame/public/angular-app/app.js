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
    })
    .when("/deletegame/:id",{
        templateUrl:"angular-app/game-delete/game_delete.html",
        controller:"DeleteGameController",
        controllerAs:"vm"

    }).when("/updateGame/:id",{
        templateUrl:"angular-app/game_update/game_update.html",
        controller:"UpdateGameController",
        controllerAs:"vm"

    })
    .when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs:"vm"
    })
}