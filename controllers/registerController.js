const jwt = require('jsonwebtoken')
var User = require('../models/User')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js')

//Checks for duplication of values in array.
const duplicationChecker = require('./validators/duplicationChecks.js')

// Validatiors
const basicRegistrationValidation = require('./validators/basicRegistrationValidation.js')

const registerController = {}

module.exports = registerController