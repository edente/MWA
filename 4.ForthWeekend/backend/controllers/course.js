const mongoose = require("mongoose");
const course  = mongoose.model("courseAttendance");
var ObjectId = require("mongodb").ObjectId;

 module.exports.getAllcourses = function (req, res) {
    console.log("Get all courses");

     course.find().exec(function (err, courses) {
        //checking on the error happened by our system . It is not user's error ("Error Checking ")
        if (err) {
            console.log("Err finding course ");
            res.status(500).json(err);
        } else {
             res.status(200).json(courses);
        }

    });

}

module.exports.courseGetOne = function (req, res) {

    console.log("Getting one course");
    var courseId = req.params.courseId;
    console.log(courseId);

    course.findById(courseId).exec(function (err, course) {

        const response = {
            status: 200,
            message: course
        };

        if (err) {
            response.status = 500;
            response.message = err;
            console.log(err);
            return;
        }
        else if (!course) {                        // ("Result Checking ")
            response.status = 404;
            response.message = { "message": "course ID not found." };
        }
        res.status(response.status).json(response.message);

    });

}

module.exports.courseAddOne = function (req, res) {
    console.log("POST to add new course ");
    console.log("before function", req.body);

    if (req.body && req.body.FirstName && req.body.LastName) {
        console.log("after fn", req.body);

        course.create({
           
            FirstName: req.body.FirstName,
            LastName:req.body.LastName,
            EmailAddress:req.body.EmailAddress,
         }, function (err, course) {
            const response = {
                status: 201,
                message: course
            };
            if (err) {
                response.status = 400;
                response.message = err;

            }
            res.status(response.status).json(response.message);
        });

        console.log("are u here");
    }
    else {
        console.log("Data missing from POST body");
        res.status(400).json({ error: "Required data missing from POST" });
    }
   
}

 module.exports.courseDeleteOne = function (req, res) {
    const courseId = req.params.courseId;
    course.findByIdAndRemove(courseId).exec(function (err, deletedcourse) {
        const response = {
            status: 204,
            message: deletedcourse
        }
        if (err) {
            response.status = 400;
            response.message = err;
        } else if (!deletedcourse) {
            response.status = 404;
            response.message = { "message": "course ID not found" };
        }
        res.status(response.status).json(response.message);


    });
}
    
    

