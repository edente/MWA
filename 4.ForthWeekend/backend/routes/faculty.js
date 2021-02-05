// const express = require('express');
// const router = express.Router();
// const facultyController = require('../controllers/facultys');
// const farmerController = require("../controllers/farmers");
// const facultyAuth = require("../middlewares/facultyAuth");

// router.post('/api/facultys/signup', facultyController.signup);
// router.post('/api/facultys/login', facultyController.login);

// //farmers routes
// router.get("/api/lists",facultyAuth,farmerController.facultysF);

// // place order
// router.post("/api/lists/:id/facultys/:facultyId",facultyAuth,farmerController.palceOrder);

// // add to cart
// router.get('/api/facultys/:id',facultyAuth, facultyController.cart);
// router.post('/api/facultys/:id/carts', facultyAuth,facultyController.addCart);
// router.post('/api/facultys/:id', facultyAuth,facultyController.deleteCart);

// // cutomer order
// router.get('/api/facultys/:id/orders',facultyAuth, facultyController.orderHistory);

// //review
// router.patch("/api/lists/:id/reviews",facultyAuth,farmerController.review)


// module.exports = router;