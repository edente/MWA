angular.module("meanGames").controller("RegisterController",RegisterController);

function RegisterController($http){

    var vm = this;
    vm.register = function(){

        var user={
            username:vm.username,
            password:vm.password,
            name:vm.name
        };
        if(!vm.username || !vm.password){
            vm.message = 
            vm.err = " Please add a username and password";
        }else{
            if(vm.password !== vm.passwordRepeat){
                vm.message = 
                vm.err=" Please make sure the passwords match. ";
            }else{
                $http.post("/api/users/register",user).then(function(result){

                }).catch(function(err){

                });
            }
        }

    }
    
}