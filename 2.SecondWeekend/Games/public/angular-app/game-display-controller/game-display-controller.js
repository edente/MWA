angular.module("meanGames").controller("GameController",GameController);

function _getStarRating(rate){
    return new Array(rate);
}


function GameController($routeParams,GameDataFactory){
    
    var vm =this;
    vm.isCheckedToShow = true;
    vm.title = "Mean Games";
    var id= $routeParams.id;
    console.log("game id " + id);
    GameDataFactory.getOneGame(id).then(function(response){
        console.log("game id " + id);
        console.log ("*********  response Data", response);
        vm.game = response;
        vm.rating = _getStarRating(response.rate);
    });

    function _getStarRating(stars){
        return new Array(stars);
    }

   
   vm.change = function(){
       if(this.isCheckedToShow){
        vm.isCheckedToShow = false;
        vm.isCheckedToUpdate = true;   
       }
       else{
           vm.isCheckedToShow = true;
           vm.isCheckedToUpdate = false;
       }
      
   }
   vm.updateGame= function(){
    var putData ={
        title:vm.updatedTitle,
        price:vm.updatedPrice,
        year:vm.updatedYear,
        rate:vm.updatedRate,
        minPlayers:vm.updatedMinPlayers,
        maxPlayers:vm.updatedMaxPlayers,
        minAge:vm.updatedMinAge,
        designers:vm.updatedDesigner
    };
    if(vm.gameForm.$valid){
        GameDataFactory.updateOneGame(putData).then(function(response){
            console.log("game updated");
        });
    }
    else{
        vm.isSubmitted= false;
    }

   }
}