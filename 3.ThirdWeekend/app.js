 require("./api/data/db");

var express = require("express");
var path = require("path");
var routes = require("./api/route");
var bodyParser = require("body-parser");
var app = express();
app.set("port",3000);

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api",routes);
// app.use("/api", controllerUsers.authenticate, protectedRoutes);

var server = app.listen(app.get("port"),function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
});