
const express = require("express");
const router = express.Router();
  
const studentController = require("../controllers/student");
 
router.post("/api/students/signup",studentController.signup);
router.post("/api/students/login", studentController.login);

 router.route("/api/Students").get(studentController.getAllStudents)
                          .post(studentController.StudentAddOne);



                          
router.route("api/Students/:studentId").get(studentcontroller.StudenGetOne)
                                    .put(studentcontroller.StudentUpdateOne)
                                    .delete(studentcontroller.StudentDeleteOne);

module.exports = router;
