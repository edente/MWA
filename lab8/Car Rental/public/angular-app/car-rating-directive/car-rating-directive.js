angular.module("MyCarApp").directive("carRating",carRating);

function carRating(){
    return{
        restrict:"E",
         templateUrl:"angular-app/car-rating-directive/rating.html",
        bindToController:true,
        controller:"CarController",
        controllerAs:"vm",
        scope:{
            starts:"@"
        }

    }
}