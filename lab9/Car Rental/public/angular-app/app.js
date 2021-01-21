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
    })
    .when("/deleteCar/:id",{
        templateUrl:"angular-app/car-delete/car_delete.html",
        controller:"DeleteCarController",
        controllerAs:"vm"

    // }).when("/updateGame/:id",{
    //     templateUrl:"angular-app/game_update/game_update.html",
    //     controller:"UpdateGameController",
    //     controllerAs:"vm"

    })
}