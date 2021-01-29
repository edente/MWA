const mongoose = require("mongoose");
const Student  = mongoose.model("StudentAttendance");
var ObjectId = require("mongodb").ObjectId;

 module.exports.getAllStudents = function (req, res) {
    console.log("Get all Students");

    var offset = 0;     
    var count = 10;
    const maxCount = 10;
    if (req.query && req.query.offset) {    
        offset = parseInt(req.query.offset, 10);
    };
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    };
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "Query String offset and count should be numbers" });
        return;
    }
    if (count > maxCount) {
        res.status(400).json({ "message": "Count exceeds maximum of " + maxCount });
        return;
    }

   Student.find().skip(offset).limit(count).exec(function (err, Students) {
        //checking on the error happened by our system . It is not user's error ("Error Checking ")
        if (err) {
            console.log("Err finding Student ");
            res.status(500).json(err);
        } else {
             res.status(200).json(Students);
        }

    });

}

module.exports.StudenGetOne = function (req, res) {

    console.log("Getting one Student");
    var StudentId = req.params.studentId;
    console.log(StudentId);

    Student.findById(StudentId).exec(function (err, student) {

        const response = {
            status: 200,
            message: student
        };

        if (err) {
            response.status = 500;
            response.message = err;
            console.log(err);
            return;
        }
        else if (!Student) {                        // ("Result Checking ")
            response.status = 404;
            response.message = { "message": "student ID not found." };
        }
        res.status(response.status).json(response.message);

    });

}

module.exports.StudentAddOne = function (req, res) {
    console.log("POST to add new Student ");
    console.log("before function", req.body);

    if (req.body && req.body.title && req.body.price) {
        console.log("after fn", req.body);

        Student.create({
            student:FirstName = req.body.FirstName,
            student:LastName = req.body.LastName,
            student:EmailAddress = req.body.EmailAddress,
            student:password = req.body.password,
            student:ConfirmPassword = req.body.password,
        }, function (err, Student) {
            const response = {
                status: 201,
                message: Student
            };
            if (err) {
                response.status = 400;
                response.message = err;

            }
            res.status(response.status).json(response.message);
        });

        
    }
    else {
        console.log("Data missing from POST body");
        res.status(400).json({ error: "Required data missing from POST" });
    }
   
}

module.exports.StudentUpdateOne = function (req, res) {
    const StudentId = req.params.studentId;
    //finding all the Students excluding the reviews and publisher
    Student.findById(StudentId).exec(function (err, updatedStudent) {
        const response = {
            status: 204,
            message: updatedStudent
        };
        if (err) {
            response.status = 400;
            response.message = err;
        }
        else if (!updatedStudent) {
            response.status = 404;
            response.message = { "message": "Student Id not found " };
        }
        //This means something went wrong
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            // we go a Student, we need to update it on the DB
            updatedStudent.FirstName = req.body.FirstName;
            updatedStudent.LastName = req.body.LastName;
            updatedStudent.EmailAddress = req.body.EmailAddress;
            
          {
                response.message = updatedStudent;
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            }
        }});
    }
    

module.exports.StudentDeleteOne = function (req, res) {
    const studentId = req.params.StudentId;
    Student.findByIdAndRemove(StudentId).exec(function (err, deletedStudent) {
        const response = {
            status: 204,
            message: deletedStudent
        }
        if (err) {
            response.status = 400;
            response.message = err;
        } else if (!deletedStudent) {
            response.status = 404;
            response.message = { "message": "Student ID not found" };
        }
        res.status(response.status).json(response.message);


    });
}
    
    

