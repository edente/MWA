const mongoose= require("mongoose");
const JobOpenings=mongoose.model("JobOpenings");
var ObjectId = require("mongodb").ObjectId;

module.exports.getAllJobs=function(req,res){
    console.log("in get all jobs");
    var offset=0;
    var count=5;
    var maxCount=10;
   if(req.query && req.query.offset){
       offset=parseInt(req.query.offset, 10);
   };
   if(req.query && req.query.count){
       count=parseInt(req.query.count,10);
   };
   if(req.query && req.query.lat && req.query.lng){ 
    runGeoQuery(req,res);
    return;
}

if(isNaN(offset)|| isNaN(count)){
    res.status(400).json({"message":"Query string offset and count should be numbers"});
    return;
}
if(count>maxCount){
    res.status(400).json({"message":"count exceeds maximum of"+maxCount});
    return;
}

JobOpenings.find().skip(offset).limit(count).exec(function(err,JobOpening){
    if(err){
        console.log("Err finding JobOpening");
    }else{
        console.log("Found jobs", JobOpening.length);
        res.status(200).json(JobOpening);
    }
});
}

module.exports.getOneJob= function(req, res){
 var jobId =req.params.jobId;

 JobOpenings.findById(jobId).exec(function(err, JobOpening){
     const response={
         status:200,
         message:JobOpening
     };
     if(err){
         response.status=500;
         response.message=err;
         console.log(err);
         return;
     }
     else if(!JobOpening){
         response.status=404;
         response.message={"message":"Job ID not found."};
     }
     res.status(response.status).json(response.message);
 });


}

module.exports.addOneJob=function(req, res){

    if(req.body && req.body.title){
        console.log("before function", req.body);
        let review= {name:req.body.name,
            review:req.body.review,
            review:req.body.Date
        }
 JobOpenings.create({
     title:req.body.title,
     salary:parseFloat(req.body.salary),
     description:req.body.description,
     experience:req.body.experience,
     skills:req.body.skills,
     postDate:req.body.postDate,
     location:{Street:req.body.Street,
              ZipCode:req.body.ZipCode,
               State: req.body.State,
               country:req.body.country
            },
        reviews:""

        }, function(err,JobOpening){
     const response={
         status:201, 
         message:JobOpening
     };
if(err){
         response.status=400;
         response.message=err;
       }
 res.status(response.status).json(response.message);
    });
}else {
    console.log("Data missing from Post body");
    res.status(400).json({error:"Required data missing from Post"});

}
}
module.exports.updateOneJob = function(req,res){
    const jobId = req.params.jobId;
     JobOpenings.findById(jobId).exec(function(err,JobOpening){
        const response={
            status:204,
            message:JobOpening
        };
        if(err){
            response.status=400;
            response.message=err;
        }
        else if(!JobOpening){
            response.status =404;
            response.message ={"message":"JobOpening Id not found "};
        }
        //This means something went wrong
        if(response.status !==204){
            res.status(response.status).json(response.message);
        }else{
            JobOpening.title=req.body.title;
            JobOpening.salary = parseInt(req.body.salary);
            JobOpening.description = req.body.description;
            JobOpening.experience = req.body.experience;
            JobOpening.skills = req.body.skills;
            JobOpening.postDate = req.body.postDate;
             
 
            JobOpening.save(function(err,updatedJobOpening){
                response.message = updatedJobOpening;
                if(err){
                    response.status =500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}
module.exports.deleteOneJob = function(req,res){
    const jobId = req.params.jobId;
    JobOpenings.findByIdAndRemove(jobId).exec(function(err, deletedJobOpening){
    const response = {
    status : 204,
    message : deletedJobOpening
    }
    if(err){
    response.status=400;
    response.message = err;
    } else if(!deletedJobOpening){
    response.status=404;
    response.message = {"message": "Job ID not found"};
    } 
    res.status(response.status).json(response.message);
    
    
    });
}
