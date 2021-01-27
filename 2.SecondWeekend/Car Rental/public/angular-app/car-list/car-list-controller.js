angular.module("MyCarApp").controller("CarsController",CarsController);

function CarsController(CarDataFactory){
    var vm =this;
    vm.title = "Car Rental for trial";
    CarDataFactory.getAllCars().then(function(response){
        vm.cars = response;
        console.log("response from controller"+response);
    });
vm.addCar = function(){
    console.log("in the addcar function");
    var postData ={
        year:vm.newCarYear,
        make:vm.newCarMake,
        model:vm.newCarModel,
        MadeIn:vm.newCarMadeIn,
        transmission:vm.newCartransmission
     };
    if(vm.carForm.$valid){
        CarDataFactory.addOneCar(postData).then(function(response){
        console.log("car saved");
        console.log("this is car data",postData);

    // }).catch(function(error){
    //     console.log(error)
    });
}
else{
    vm.isSubmitted= false;
}
}

 

}

