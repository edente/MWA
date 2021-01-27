angular.module("MyCarApp").controller("CarController",CarController);

function _getStarRating(rate){
    return new Array(rate);
}


function CarController($routeParams,CarDataFactory){
    var vm =this;
    vm.title1 = "Car Rental";
    var id= $routeParams.id;
    console.log("car id " + id);
    CarDataFactory.getOneCar(id).then(function(response){
        console.log("car id " + id);
        console.log ("*********  response Data", response);
        vm.car = response;
        vm.rating = _getStarRating(response.rate);
    });
    

}