const Student = require("../models/students");
// const faculty = require("../models/faculty");
// const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, './upload')
//   },
//   filename: function (req, file, cb) {
//       cb(null, file.originalname)
//   }
// })
// const upload = multer({
//   storage: storage
// })


//student Log in
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  //simple validation
  if (!email || !password) {
    res.status(400).json({
      msg: "All fields are required",
    });
  }

  Student.findOne({
    email: email,
  })
    .then((student) => {
      if (student) {
        bcrypt.compare(password, student.password).then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign(
              {
                id: student._id,
                role: student.role,
              },
              "yye",
              {
                expiresIn: 3600,
              }
            );
            res.status(200).json({
              token,
              student,
            });
          } else {
            res.status(400).send("Password doesn't match");
          }
        });
      } else {
        res.status(400).send({
          msg: "This account doesn't exist",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        msg: err,
      });
    });
};

//student sign up

exports.signup = (req, res, next) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    photo
  } = req.body;

  //simple validation
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    res.status(400).json({
      msg: "All fields are required",
    });
  }
  //Check existing student
  Student.findOne({
    email: email,
  })
    .then((studentExist) => {
      if (studentExist) {
        res.status(400).json({
          msg: "This account is already exists",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const student = new Student({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            photo,
             role: "student"
          });
          return student.save();
        })
        .then((student) => {
          const token = jwt.sign(
            {
              id: student._id,
              role: student.role,
            },
            "yye",
            {
              expiresIn: 3600,
            }
          );
          res.status(200).json({
            token,
            student,
          });
        });
    })
    .catch((err) => {
      res.status(400).send({
        msg: err,
      });
    });
};
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

  if (req.body && req.body.FirstName && req.body.LastName) {
      console.log("after fn", req.body);

      Student.create({
         
          FirstName: req.body.FirstName,
          LastName:req.body.LastName,
          EmailAddress:req.body.EmailAddress,
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

      console.log("are u here");
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
  const StudentId = req.params.studentId;
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
  
  


