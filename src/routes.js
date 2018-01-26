var express = require('express')

const routes = express();

//Controller imports
const adminController = require('../controllers/adminController.js')

//Admin routes
routes.get('/admin/get-users', adminController.getUsers)

//Register Routes
routes.post('/register', registerController.register)

//User Routes
routes.post('/login', userController.login)
routes.get('/logout/:userID', userController.logout)

//Testing Routes 
routes.get('/get-single-user-ID', testController.getSingleUserID)

module.exports = routes