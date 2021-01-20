angular.module("meanGames").controller("GameController",GameController);

function _getStarRating(rate){
    return new Array(rate);
}


function GameController($routeParams,GameDataFactory){
    var vm =this;
    vm.title1 = "Mean Games";
    var id= $routeParams.id;
    console.log("game id " + id);
    GameDataFactory.getOneGame(id).then(function(response){
        console.log("game id " + id);
        console.log ("*********  response Data", response);
        vm.game = response;
        vm.rating = _getStarRating(response.rate);
    });
    

}