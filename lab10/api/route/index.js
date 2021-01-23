var express=require("express");
var router=express.Router();
const jobOpeningController= require("../controller/JobOpening-Controller");
const controllerReviews=require("../controller/reviews-controller");




router.route("/jobs").get(jobOpeningController.getAllJobs)
                      .post(jobOpeningController.addOneJob);

router.route("/jobs/:jobId").get(jobOpeningController.getOneJob)
                            .delete(jobOpeningController.deleteOneJob)
                            .put(jobOpeningController.updateOneJob);


router.route("/jobs/:jobId/reviews")
                            .get(controllerReviews.reviewsGetAll)
                            .post(controllerReviews.reviewsAddOne);
                        // methods related to the review (get, update and delete one review)
router.route("/jobs/:jobId/reviews/:reviewId")
                            .get(controllerReviews.reviewsGetOne)
                            .put(controllerReviews.reviewsUpdateOne)
                            .delete(controllerReviews.reviewsDeleteOne);
                        
                        

module.exports=router;