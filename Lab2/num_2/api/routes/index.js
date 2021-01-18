var express= require("express");
var router= express.Router();
var additionControllers =require("../controllers/addingController.js")

// router.route("/sum/:number/").get(addingController.addTwoNumbers);
router.route("/sum/:number").get(additionControllers.addTwoNumbers);
module.exports=router;