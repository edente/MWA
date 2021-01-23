angular.module("JobApp").factory("JobDataFactory",JobDataFactory);

function JobDataFactory($http){
    return{
        getAllJobs:getAllJobs,
        getOneJob:getOneJob,
        addOneJob:postJob,
        updateOneJob:updateOneJob,
        deleteOneJob:deleteOneJob
    };

    function getAllJobs(){
        return $http.get("/api/Jobs").then(complete).catch(failed);
    }ad
    function getOneJob(id){
        return $http.get("/api/Jobs/"+id).then(complete).catch(failed);
    }
    function postJob(Job){
        return $http.post("/api/Jobs/",Job).then(complete).catch(failed);

    }
    function updateOneJob(Job){
        return $http.put("/api/Jobs/"+id,Job).then(complete).catch(failed);
    }
    function deleteOneJob(id){
        return $http.delete("/api/Jobs/"+id).then(complete).catch(failed);
    }

    function complete(response){
        console.log(response.data);
        return response.data;
    }
    function failed(error){
        return error.status.statusText;


    }
}