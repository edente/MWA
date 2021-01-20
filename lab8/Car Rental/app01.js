
require("./api/data/db");
const bodyparser=require("body-parser");
const express=require("express");
const path=require("path");
const routes=require("./api/routes");


const app=express();

app.set("port",3000);

app.use(function(req,res,next){
    console.log("middlenware...");
    next();
    });

app.use(express.static(path.join(__dirname, "public")));
// app.use("/node_modules"),express.static(path.join(__dirname,"node_modules"));
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));

app.use(bodyparser.urlencoded({extended:false}));


app.use("/api",routes);

var server=app.listen(app.get("port"),function(){
    var port=server.address().port;
    console.log("Listening to the port"+port);
 });



