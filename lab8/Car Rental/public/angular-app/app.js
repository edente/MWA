angular.module("MyCarApp",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
       // templateUrl:"angular-app/game-list/games.html",
        templateUrl:"angular-app/car-list/cars.html",
        controller:"CarsController",
        controllerAs:"vm"
    })
    .when("/car/:id",{
        templateUrl:"angular-app/car-display-controller/car.html",
        controller:"CarController",
        controllerAs:"vm"
    });
}