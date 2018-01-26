const registerController = {};

var User = require('../models/User')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js');

// Request validators
const registerSingeUserValidation = require('./validators/registerSingleUserValidation') 


registerController.registerSingleUser = (req, res) => {

    //Checks that fields only defined in the schema are passed. 
    var unwantedField = checkFields.registerSingleUser(req)

    if (unwantedField) {
        res.status(700).json({
            message: unwantedField
        })
        return
    }

    //Validates the request before attempting to save user to database. 
    var errors = registerSingeUserValidation(req)
    if (errors) {
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })
    }

        const newUser = req.body
        newUser.latitude = parseFloat(newUser.latitude)
        newUser.longitude = parseFloat(newUser.longitude)
        console.log(newUser)
        const saveUser = new User(newUser)
        saveUser
            .save()
            .then(user => {
                res.status(200).send({
                    message: 'Success',
                    user: user
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message ? err.message : 'Unable to save user to database',
                    error: 'Unable to save user.'
                })
            })
    }

registerController.bulkUpload = (req, res) => {

}



module.exports = registerController