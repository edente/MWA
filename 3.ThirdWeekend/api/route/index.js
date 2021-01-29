var express=require("express");
var router=express.Router();
var studentcontroller=require("../controller/student-controller");
 


router.route("/Students").get(studentcontroller.getAllStudents)
                          .post(studentcontroller.StudentAddOne);
router.route("/Students/:studentId").get(studentcontroller.StudenGetOne)
                                    .put(studentcontroller.StudentUpdateOne)
                                    .delete(studentcontroller.StudentDeleteOne);


module.exports=router;