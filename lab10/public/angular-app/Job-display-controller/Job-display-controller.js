angular.module("JobApp").controller("JobController",JobController);

 

function JobController($routeParams,JobDataFactory){
    
    var vm =this;
    vm.isCheckedToShow = true;
    vm.title = "Mean Jobs";
    var id= $routeParams.id;
    console.log("Job id " + id);
    JobDataFactory.getOneJob(id).then(function(response){
        console.log("Job id " + id);
        console.log ("*********  response Data", response);
        vm.Job = response;
        vm.rating = _getStarRating(response.rate);
    });
    
    


   
   vm.change = function(){
       if(this.isCheckedToShow){
        vm.isCheckedToShow = false;
        vm.isCheckedToUpdate = true;   
       }
       else{
           vm.isCheckedToShow = true;
           vm.isCheckedToUpdate = false;
       }
      
   }
   vm.updateJob= function(){
    var putData ={
        title:vm.updatedTitle,
        salary:vm.updatedSalary,
        description:vm.updatedDescription,
        experience:vm.updatedExperience,
        skills:vm.updatedSkills,
        postDate:vm.updatedPostDate,
        
    };
    if(vm.JobForm.$valid){
        JobDataFactory.updateOneJob(putData).then(function(response){
            console.log("Job updated");
        });
    }
    else{
        vm.isSubmitted= false;
    }

   }
}