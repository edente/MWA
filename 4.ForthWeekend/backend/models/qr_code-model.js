
// const QRCode = require('qrcode') 
  
// // Creating the data 
// let data = { 
//     name:"Employee Name", 
//     age:27, 
//     department:"Police", 
//     id:"aisuoiqu3234738jdhf100223"
// } 
  
// // Converting the data into String format 
// let stringdata = JSON.stringify(data) 
  
// // Print the QR code to terminal 
// QRCode.toString(stringdata,{type:'terminal'}, 
//                     function (err, QRcode) { 
  
//     if(err) return console.log("error occurred") 
  
//     // Printing the generated code 
//     console.log(QRcode) 
// }) 
    
// // Converting the data into base64  
// QRCode.toDataURL(stringdata, function (err, code) { 
//     if(err) return console.log("error occurred") 
  
//     // Printing the code 
//     console.log(code) 
// })
// const mongoose = require("mongoose");

// const qrCodeSchema = mongoose.Schema({
//   imgUrl: {
//     type: Boolean,
//     required: true
//   },
//   dateOn: {
//     type: Date,
//     required: true
//   }
// });

// mongoose.model("QrCode", qrCodeSchema, "qr_codes");
// Require the package 