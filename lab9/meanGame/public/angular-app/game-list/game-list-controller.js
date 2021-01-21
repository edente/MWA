angular.module("meanGames").controller("GamesController",GamesController);

function GamesController(GameDataFactory){
    var vm =this;
    vm.title = "Mean Game Application";
    GameDataFactory.getAllGames().then(function(response){
        vm.games = response;
    });
   

    vm.addGame = function(){
        var postData ={
            title:vm.newGameTitle,
            price:vm.newGamePrice,
            year:vm.newGameYear,
            rate:vm.newGameRate,
            minPlayers:vm.newGameMinPlayers,
            maxPlayers:vm.newGameMaxPlayers,
            minAge:vm.newGameMinAge,
            designers:vm.newGameDesigner
        };
        if(vm.gameForm.$valid){
        GameDataFactory.addOneGame(postData).then(function(response){
            console.log("game saved");

        // }).catch(function(error){
        //     console.log(error)
        });
    }
    else{
        vm.isSubmitted= false;
    }
    }

     
   
    

}