const mongoose= require("mongoose");
const dburl= "mongodb://localhost:27017/meanGames";
require("./games-model.js");

mongoose.connect(dburl);
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to"+" "+dburl);

});

mongoose.connection.on("disconnected", function(){
console.log("Mongoose disconnected")
});
mongoose.connection.on("error", function(err){
    console.log("Mongoose connected error"+ err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose discoonnected by application Termination");
        process.exit(0);
    });

});

process.on("SIGINT2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by Application Restart");
        process.kill(process.pid, "SIGUSR2");

    
});
});
