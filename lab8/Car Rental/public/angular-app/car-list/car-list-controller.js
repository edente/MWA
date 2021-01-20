angular.module("MyCarApp").controller("CarsController",CarsController);

function CarsController(CarDataFactory){
    var vm =this;
    vm.title = "Car Rental";
    CarDataFactory.getAllCars().then(function(response){
        vm.cars = response;
        console.log("response from controller"+response);
    });
};