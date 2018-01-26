var express = require('express')
const routes = express();

//Controller imports
const adminController = require('../controllers/adminController.js')
const registerController = require('../controllers/registerController.js')
const matchingController = require('../controllers/matchingController.js')

// //Admin routes
// routes.get('/admin/get-all-users', adminController.getUsers)

//Register Routes
routes.post('/register-single-user', registerController.registerSingleUser)
routes.post('/bulk-upload-users', registerController.bulkUpload)

// //Matching Routes
// routes.get('/get-customers-dublin', matchingController.getCustomersWithin100KMofDublin)
// routes.get('/get-customers/:distance', matchingController.getCustomersByDistance)

// //Testing Routes 
// routes.get('/get-single-user-ID', testController.getSingleUserID)

module.exports = routes