const mongoose = require("mongoose");
const Car = mongoose.model("Car");
const message404 = "Car Id is not found.";
//===================================================================================================================================
//adding user
var _adduser = function(req,res,car){
    console.log("The car to add a user");
    if(car.user === null){
        car.user={
            name:req.body.name,
             age:parseInt(req.body.age),
           drivingLicence:req.body.drivingLicence
             }}
    else{
         car.user.name=req.body.name;
         car.user.age=parseInt(req.body.age);
    car.user.drivingLicence=req.body.drivingLicence;
    }
   
    car.save(function(err,updatedcar){
        var response={
            status:200,
            message:[]
        };
        if(err){
            response.status=500;
            response.message =err;
        }else{
            response.status =201;
            response.message = updatedcar.user;
        }
        res.status(response.status).json(response.message);

    });
}
 module.exports.createUser = function(req,res){
    var carId = req.params.carId;
    console.log("Get carId ",carId);
    Car.findById(carId).select("user").exec(function(err,car){
        var response={
            status:200,
            message:[]
        };
        if(err){
            console.log("Error finding car ..");
            response.status=500;
            response.message = err;
        }
        else if(!car){
            console.log("car id not found in database",carId);
            response.status = 404;
            response.message = {"message":"car ID not found"+carId};
        }
        if(car){
            _adduser(req,res,car);
        }
        else{
            res.status(response.status).json(response.message);
        }
    });
}
//===============================================================================================================================
//get a user
module.exports.getUser = function(req, res) {
  const carId = req.params.carId;
  Car.findById(carId).exec(function(err, car){
    const response = { status: 200 }
    if (err) {
      response.status = 500;
      response.message = err;
    }
    if (!car) {
      response.status = 404;
      response.message = { message: message404 };
    } else { 
        response.message=car.user ? car.user :[]
     }
    res.status(response.status).json(response.message);
  })
}
//=============================================================================================================================
//deleting user
var _deleteUser = function(req,res,car){
    car.user = null;
    car.save(function(err,car){
        var response={
            status:204
        };
        if(err){
            console.log("Error finding the car ");
            response.status =500;
            response.message =err;
        }
        res.status(response.status).json(response.message);

    });
}

// for deleting the user from the car
module.exports.deleteUser = function(req,res){
    var carId = req.params.carId;
    console.log("DELETE car ...",carId);

    Car.findById(carId).exec(function(err,car){
        var response = {status:204};
        if(err){
            console.log("Error finding car..");
            response.status=500;
            response.message =err;
        }
        else if(!car){
            response.status =404;
            response.message = {"message":"car ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }
        else{
            _deleteUser(req,res,car);
        }
    });
}
//================================================================================================================================
//updating the user 
var _updateuser =function(req,res,car){
    car.user.name = req.body.name;
    car.user.age=parseInt(req.body.age);
    car.user.drivingLicence=req.body.drivingLicence;
     car.save(function(err,updatedcar){
        var response = {
            status:204
        };
        if(err){
            console.log("Error finding car");
            response.status=500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

// for updating the user's information
module.exports.updateUser = function(req,res){
    var carId = req.params.carId;
    console.log("PUT carId ", carId);
    Car.findById(carId).exec(function(err,car){
        var response = {
            status:204
        };
        if(err){
            console.log("Error finding car ");
            response.status=500;
            response.message=err;
        }
        else if(!car){
            response.status =404;
            response.message = {"message":"car ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }
        else{
            _updateuser(req,res,car);
        }

    });

}



