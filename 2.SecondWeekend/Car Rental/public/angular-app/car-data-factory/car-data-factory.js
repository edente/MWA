angular.module("MyCarApp").factory("CarDataFactory",CarDataFactory);

function CarDataFactory($http){
    return{
        getAllCars:getAllCars,
        getOneCar:getOneCar,
        addOneCar:addOneCar,
        deleteOneCar:deleteOneCar

    };

    function getAllCars(){
        return $http.get("/api/cars").then(complete).catch(failed);
    }
    function getOneCar(id){
        return $http.get("/api/cars/"+id).then(complete).catch(failed);
    }
    function addOneCar(car){
        return $http.post("/api/cars",car).then(complete).catch(failed);
    }
    function deleteOneCar(id){
        return $http.delete("/api/cars/"+id).then(complete).catch(failed);
    }

    function complete(response){

        return response.data;
    }
    function failed(error){
        return error.status.statusText;

    }
}