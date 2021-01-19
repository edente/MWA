angular.module("myProperApp")
.controller("MainController",MainController);

function MainController($http){
    var vm=this;
    vm.name = "from the main Controller";

    $http.get("https://api.publicapis.org/entries?").then(function(response){
        vm.animals = response.data;
    });

}