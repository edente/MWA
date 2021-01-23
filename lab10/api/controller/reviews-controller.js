const mongoose = require("mongoose");
const JobOpenings = mongoose.model("JobOpenings");

module.exports.reviewsGetAll = function(req,res){
    
    var jobId = req.params.jobId;
    console.log("Get jobId ", jobId);
    
    JobOpenings.findById(jobId).select("reviews").exec(function(err,Job){
        console.log(Job);
        var reviews = Job.reviews;
        var response = {status:200, message:[]};
        if(err){
            console.log("Error Finding Job");
            response.status = 500;
            response.message = err;
        } else if(!reviews){
            console.log("Job id not found in database", jobId);
            response.status = 404; 
            response.message = {"message" : "Job ID not found " + jobId};
        } else{
            response.message = Job.reviews? Job.reviews : [];
        }

        res.status(response.status).json(response.message);
    });
}
module.exports.reviewsGetOne = function(req, res){
    console.log("Getting one review");
    var jobId = req.params.jobId;
    var reviewId = req.params.reviewId;
    var review;
    console.log(jobId);

    JobOpenings.findById(jobId).select("reviews").exec(function(err,Job){
        // for(i = 0; i < Job.reviews.length; i++){
        //     if(Job.reviews[i]._id == reviewId)
        //         review = Job.reviews[0];
        // }

        review = Job.reviews.id(reviewId);
        console.log(review);
        const response ={
            status:200,
            message:review
        };
        
        if(err){
            response.status = 500;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!Job || !review){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Job or Review ID not found."};
        }
        res.status(response.status).json(response.message);
        
    });
}
module.exports.reviewsDeleteOne = function(req, res){
    console.log("Getting one review");
    var jobId = req.params.jobId;
    var reviewId = req.params.reviewId;

    JobOpenings.findById(jobId).exec(function(err,Job){
        review = Job.reviews.id(reviewId);
        console.log(review);
        const response ={
            status:204,
            message:review
        };
        
        if(err){
            response.status = 400;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!Job || !review){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Job or Review ID not found."};
        }
        
        res.status(response.status).json(response.message);
        review.remove();
        Job.save(function(err, updateJob) {
            response.message = updateJob;
        });   
        
    });
    
}

module.exports.reviewsUpdateOne = function(req, res){
    console.log("Getting one review");
    var jobId = req.params.jobId;
    var reviewId = req.params.reviewId;
    var review;
    console.log(jobId);

    JobOpenings.findById(jobId).select("reviews").exec(function(err,Job){
        review = Job.reviews.id(reviewId);
        console.log(review);
        const response ={
            status:204,
            message:review
        };
        
        if(err){
            response.status = 400;
            response.message = err;
            console.log(err);
            return;
        }
        else if(!Job || !review){                        // ("Result Checking ")
            response.status =404;
            response.message = {"message":"Job or Review ID not found."};
        }

        if(response.status != 204){
            res.status(response.status).json(response.message);
        }else{
            //we got a Job, now we neet to update it
            console.log(Job.title);
            review.name = req.body.name;
            review.rating = parseInt(req.body.rating);
            review.review = req.body.review;
            Job.save(function(err, updateJob) {
                response.message = updateJob;
                if(err){
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
        
    });
}


module.exports.reviewsAddOne=function(req,res){
    console.log("POST to add a review");
    const jobId = req.params.jobId;
    if(req.body.name && req.body.Date){
        JobOpenings.findById(jobId).select("-location").exec(function(err, Job){
            const response =  {
                status : 204,
                message : Job
            }
            if(err){
                response.status=400;
                response.message = err;
            } else if(!Job){
                response.status=404;
                response.message = {"message": "Job ID not found"};
            } 
    
            //this means somethoing went wrong
            if(response.status != 204){
                res.status(response.status).json(response.message);
            }else{
                //we got a Job, now we neet to update it
                if(Job.reviews[0] == '' )
                    Job.reviews = [{"name":req.body.name,"Date":req.body.Date,"review": req.body.review}];
                 else
                    Job.reviews = Job.reviews.concat([{"name":req.body.name,"Date":req.body.Date,"review": req.body.review}]);
                // Job.reviews.rating  = parseInt(req.body.rating);
                // Job.reviews.review = req.body.review;
                console.log(response.status);
                console.log(req.body.name);

                console.log("Jobs reviewss..."+Job.reviews);
                Job.save(function(err, updateJob) {
                    response.message = updateJob;
                    if(err){
                        response.status = 500;
                        response.message = err;
                    }
                    res.status(response.status).json(response.message);
                });
            }
    
        });
    } else{
        console.log("Data missing from POST body");
        res.status(400).json({error:"Required data missing from POST"});
    }
}