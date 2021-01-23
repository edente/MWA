angular.module("JobApp").controller("JobsController",JobsController);

function JobsController(JobDataFactory){
    var vm =this;
    vm.title = "Mean Job Application";
    JobDataFactory.getAllJobs().then(function(response){
        vm.Jobs = response;
    });
   

    vm.addJob = function(){
        var postData ={
            title:vm.newJobTitle,
            salary:vm.newJobSalary,
            description:vm.newJobDescription,
            experience:vm.newJobExperience,
            skills:vm.newJobSkills,
            postDate:vm.newJobpostDate,
    
        };
        if(vm.JobForm.$valid){
        JobDataFactory.addOneJob(postData).then(function(response){
            console.log("Job saved");

        // }).catch(function(error){
        //     console.log(error)
        });
    }
    else{
        vm.isSubmitted= false;
    }
    }

     
   
    

}