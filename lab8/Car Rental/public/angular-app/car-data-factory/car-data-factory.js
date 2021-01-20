angular.module("MyCarApp").factory("CarDataFactory",CarDataFactory);

function CarDataFactory($http){
    return{
        getAllCars:getAllCars,
        getOneCar:getOneCar
    };

    function getAllCars(){
        return $http.get("/api/cars").then(complete).catch(failed);
    }
    function getOneCar(id){
        return $http.get("/api/cars/"+id).then(complete).catch(failed);
    }
    function complete(response){

        return response.data;
    }
    function failed(error){
        return error.status.statusText;

    }
}