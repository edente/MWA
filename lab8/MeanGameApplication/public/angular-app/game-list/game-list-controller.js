angular.module("meanGames").controller("GamesController",GamesController);

function GamesController(GameDataFactory){
    var vm =this;
    vm.title = "Mean Games Application";
    GameDataFactory.getAllGames().then(function(response){
        vm.games = response;
        console.log("goammmmmm",vm.games);
    });
};