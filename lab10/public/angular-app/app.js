angular.module("JobApp",["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"angular-app/Job-list/Jobs.html",
        controller:"JobsController",
        controllerAs:"vm"
    })
    .when("/Job/:id",{
        templateUrl:"angular-app/Job-display-controller/Job.html",
        controller:"JobController",
        controllerAs:"vm"
    })
    .when("/deleteJob/:id",{
        templateUrl:"angular-app/Job-delete/Job_delete.html",
        controller:"DeleteJobController",
        controllerAs:"vm"

    }).when("/updateJob/:id",{
        templateUrl:"angular-app/Job_update/Job_update.html",
        controller:"UpdateJobController",
        controllerAs:"vm"

    })
    
}