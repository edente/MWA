angular.module("meanGames").controller("GamesController",GamesController);

function GamesController($route,AuthFactory,GameDataFactory){
    var vm =this;
    vm.title = "Mean Game Application";
    GameDataFactory.getAllGames().then(function(response){
        vm.games = response;
    });

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    }

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
            vm.message ="Succesfully added to the system";
            GameDataFactory.getAllGames().then(function(response){
                vm.games = response;
                
            });
        }).catch(function(error){
            console.log(error)
        });
    }
    else{
        vm.isSubmitted= false;
    }
    }

     //deleting one Game
     vm.deleteGame = function(gameId,index,name){
        console.log("Game id ",gameId);
        if(gameId){
            GameDataFactory.deleteOneGame(gameId).then(function(response){
                vm.message = "Succesfully deleting "+name+" from system";
                vm.games.splice(index,1);
            });
        }else{
            vm.err = "Unsuccesfull to delete a Game";
        }
    }

     // searching for games
     vm.searchGame = function(){
        var searchData = vm.searchGameName;
        console.log("Game name to be searched "+ searchData);
        if(searchData){
            GameDataFactory.searchAllGames(searchData).then(function(response){
                vm.games = response;
            });
        }
    }



   
    

}