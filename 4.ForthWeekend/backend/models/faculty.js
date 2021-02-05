const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating customers schema
const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

     
    
})

module.exports = mongoose.model('faculty', facultySchema);