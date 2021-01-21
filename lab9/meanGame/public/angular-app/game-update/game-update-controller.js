angular.module("meanGames").controller("UpdateGameController",UpdateGameController);

function UpdateGameController($routeParams,GameDataFactory){
   var vm = this;
   var id = $routeParams.id;
   GameDataFactory.deleteOneGame(id).then(function(response){
    console.log("game id to be deleted " + id);
    console.log ("Deleted response Data", response);
    vm.gameDeleted = response;
});

}