const express = require("express");
const router = express.Router();

const carController = require("../controller/car-Controller");
const userController = require("../controller/user-Controller");
const controllerUsers=require("../controller/users-controller");
router.route("/cars").get(carController.getAllCars)
  .post(carController.addOneCar);
 
  router.route("/carSearch").get(carController.getAllSearchedCars);

 router.route("/cars/:carId").get(carController.getCarById)
  .put(carController.updateCar)
  .delete(carController.deleteCar)
  .post(userController.createUser);



router.route("/cars/:carId/user").get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);


router.route("/users/register")
  .post(controllerUsers.register);

router.route("/users/login")
  .post(controllerUsers.login);
module.exports = router







