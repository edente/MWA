const mongoose= require("mongoose");
const Car= mongoose.model("Car");
//======================================================================================================================
//get all cars
module.exports.getAllCars = function(req,res){
    var offset= 0;
    var count= 9;
    var maxCount=10;
    if (req.query && req.query.offset) {
    offset= parseInt(req.query.offset, 10); 
}
    if (req.query && req.query.count) {
         offset= parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({"message": "QueryString Offset and Count should benumbers"});
        return;
        }
        if (count > maxCount) {
            res.status(400).json({"message": "Cannot exceed count of "+ maxCount});
            return; }
    Car.find().skip(offset).limit(count).exec(function(err, cars) {
        if(err){
            console.log("Error finding cars");
            res.status(500).json(err);
        }
        else{
    console.log("Found cars", cars.length);
    res.status(200).json(cars); 
}
    
        });
    }
//===========================================================================================================================   
//get One Car
    module.exports.getCarById = function(req, res) {
        const carId = req.params.carId;
        Car.findById(carId).exec(function(err, Car) {
          const response = {
            status: 200,
            message: Car
          }
          if (err || !Car) {
            response.status = 404;
            response.message = {message: carIdNotFound};
          }
          res.status(response.status).json(response.message);
        })
      }
//=========================================================================================================================
//addOneCar
    module.exports.addOneCar = function(req, res) {
      console.log("inside car-controller");
        Car.create({
          year: parseInt(req.body.year),
          make: req.body.make,
          model:req.body.model,
          MadeIn:req.body.MadeIn,
          transmission:req.body.transmission,
          user:null


        }, function(err, CarInserted){
          response = {
            status: 201,
            message: CarInserted
          }
          if(err) {
            response.status = 500;
            response.message = err;
          }
          res.status(response.status).json(response.message);
          console.log("new car",Car);
        })
      }
    
//===========================================================================================================================
//delete a car
      module.exports.deleteCar = function(req, res) {
        const carId = req.params.carId
        Car.findByIdAndDelete(carId).exec(function(err, deletedCar){
          let response = {
            status: 204,
            message: "Deleted Car successfully."
          };
          if(err) {
            response.status = 500;
            response.message = err;
          }
          if(!deletedCar) {
            response.status = 404;
            response.message = {message: CarIdNotFound}
          }
          res.status(response.status).json(response.message);
        })
      }
//============================================================================================================================
//updateCar
module.exports.updateCar = function(req,res){
    const carId = req.params.carId;
     Car.findById(carId).select("-user").exec(function(err,car){
        const response={
            status:204,
            message:car
        };
        if(err){
            response.status=400;
            response.message=err;
        }
        else if(!car){
            response.status =404;
            response.message ={"message":"car Id not found "};
        }
        //This means something went wrong
        if(response.status !==204){
            res.status(response.status).json(response.message);
        }else{
            // we go a car, we need to update it on the DB
            car.year = parseInt(req.body.year);
            car.make = req.body.make;
            car.model = req.body.model;
            car.transmission=req.body.transmission;
            car.MadeIn=req.body.MadeIn;
           
            car.save(function(err,updatedcar){
                response.message = updatedcar;
                if(err){
                    response.status =500;
                    response.message = err;
                }
                res.status(response.status).json(response.message);
            });
        }
    });
}