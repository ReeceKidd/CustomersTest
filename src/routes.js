var express = require('express')
const routes = express();

//Controller imports
const registerController = require('../controllers/registerController.js')
const matchingController = require('../controllers/matchingController.js')

//Register Routes
routes.post('/register-user', registerController.registerUser)

// //Matching Routes
// routes.get('/get-customers-dublin', matchingController.getCustomersWithin100KMofDublin)

module.exports = routes