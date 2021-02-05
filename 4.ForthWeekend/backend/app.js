// import 3rd party modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
 const cors = require("cors");
const config = require("config");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

//importing routes
const studentRoutes = require("./routes/students");
const customerRoutes = require("./routes/faculty");
const superRoutes = require("./routes/super");

//instatiating app
const app = express();

// getting config key
const db = config.get("mongoURI");

//port
const port = process.env.PORT || 4000;

//config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// create a rotating write stream
 

// // // setup the logger
// app.use(morgan("combined", { stream: accessLogStream }));

//swagger middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//routes
app.use(studentRoutes); 
// app.use(superRoutes); 
// app.use(customerRoutes); 

// app.use(function(error,req,res,next){
//   console.log(error.stack,"errrrrrrrrorrrrrr")
// })

// connecting to mongodb
mongoose
  .connect(db, {
   
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb sucessfully...!!!");
  })
  .catch((err) => {
    console.log("Error", err);
  });

// running app
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
