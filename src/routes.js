var express = require('express')

const routes = express();

//Controller imports
const adminController = require('../controllers/adminController.js')

//Admin routes
routes.get('/admin/get-all-users', adminController.getUsers)

//Register Routes
routes.post('/register-single-user', registerController.register)
routes.post('/bulk-upload-users', registerController.bulkUpload)

//Matching Routes
routes.post('/get-customers-dublin', matchingController.getCustomersDublin)
routes.post('/get-customers/:latitude:longitude')

//Testing Routes 
routes.get('/get-single-user-ID', testController.getSingleUserID)

module.exports = routes