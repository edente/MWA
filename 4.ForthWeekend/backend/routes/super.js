// const express = require('express');
// const router = express.Router();
// const customerController = require('../controllers/customers');
// const farmerController = require("../controllers/farmers");
// const superAuth = require("../middlewares/superAuth");

// // farmers routes
// router.post("/api/farmers/signup", farmerController.signup);
// router.post("/api/farmers/login", farmerController.login);

// //farmers routes
// router.get("/api/supers",superAuth ,farmerController.supers);

// //reset password and deactivation
// router.patch("/api/farmers/:id",superAuth, farmerController.resetPassword);
// router.patch("/api/farmers/:id/accounts", superAuth ,farmerController.deactivateAccount);

// //logfiles
// router.get("/api/farmers/logs/files",superAuth , farmerController.yonas);

// //customers routes
// router.get('/api/customers',superAuth , customerController.customers);

// //reset password
// router.patch('/api/customers/:id',superAuth , customerController.resetPassword);

// //activate/deactivate
// router.patch('/api/customers/:id/accounts',superAuth , customerController.deactivateAccount);


// module.exports = router;