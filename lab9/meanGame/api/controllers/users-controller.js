var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");

module.exports.register = function(req,res){
    console.log("Register User");

    var username = req.body.username;
    var name = req.body.name || null;
    var password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));

    User.create({
        username:username,
        name:name,
        password:password

    },function(err,user){
        if(err){
            console.log(err);
            res.status(400).json(err);
        }else{
            console.log("User created ",user);
            res.status(200).json(user);
        }
    });
}