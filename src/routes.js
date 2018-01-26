var express = require('express')
const routes = express();

//Controller imports
const registerController = require('../controllers/registerController.js')
const matchingController = require('../controllers/matchingController.js')
const adminController = require('../controllers/adminController.js')

//Register Routes
routes.post('/register-customer', registerController.registerCustomer)

// Matching Routes
routes.get('/get-customers-eligible-for-invite', matchingController.getCustomersWithin100KMofDublin)

// Admin Routes
routes.get('/get-all-customers', adminController.getAllCustomers)

module.exports = routes