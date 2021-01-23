angular.module("JobApp").controller("UpdateJobController",UpdateJobController);

function UpdateJobController($routeParams,JobDataFactory){
   var vm = this;
   var id = $routeParams.id;
   JobDataFactory.deleteOneJob(id).then(function(response){
    console.log("Job id to be deleted " + id);
    console.log ("Deleted response Data", response);
    vm.JobDeleted = response;
});

}