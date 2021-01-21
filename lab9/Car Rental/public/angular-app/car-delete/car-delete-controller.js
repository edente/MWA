angular.module("MyCarApp").controller("DeleteCarController",DeleteCarController);


function DeleteCarController($routeParams,CarDataFactory){
    CarDataFactory.deleteOneCar(id).then(function(response){
        console.log("car id to be deleted"+ id);
        console.log("Deleted response data", respone);
        vm.carDeleted=response;
    })
}