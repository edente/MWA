const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating students schema
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

   phoneNumber: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

   });

module.exports = mongoose.model("Student", studentSchema);
