angular.module("MyCarApp").controller("CarsController",CarsController);

function CarsController(CarDataFactory,AuthFactory){
    var vm =this;
    vm.title = "Car Rental for trial";
    CarDataFactory.getAllCars().then(function(response){
        vm.cars = response;
        console.log("response from controller"+response);
    });

    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        }else{
            return false;
        }
    }
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
vm.deletecar = function(carId,index,name){
    console.log("car id ",carId);
    if(carId){
        CarDataFactory.deleteOneCar(carId).then(function(response){
            vm.message = "Succesfully deleting "+name+" from system";
            vm.cars.splice(index,1);
        });
    }else{
        vm.err = "Unsuccesfull to delete a car";
    }
}

 // searching for cars
 vm.searchcar = function(){
    var searchData = vm.searchcarName;
    console.log("car name to be searched "+ searchData);
    if(searchData){
        CarDataFactory.searchAllCar(searchData).then(function(response){
            vm.cars = response;
        });
    }
}


 

}

