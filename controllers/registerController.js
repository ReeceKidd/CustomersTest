const registerController = {};

var User = require('../models/User')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js');

// Request validators
const registerSingeUserValidation = require('./validators/registerSingleUserValidation')

const convertDegreesToRadians = require('./distance/degreesToRadians')

const degreesToRadians = function degressToRadians(deg) {
    return (deg * Math.PI / 180.0);
}

registerController.registerSingleUser = (req, res) => {

    //Checks that fields only defined in the schema are passed. 
    var unwantedField = checkFields.registerSingleUser(req)

    if (unwantedField) {
        res.status(700).json({
            message: unwantedField
        })
        return
    }

    
    try {
        //Converting degrees to radians. 
        var latitudeFloat = parseFloat(req.body.latitude)
        var longitudeFloat = parseFloat(req.body.longitude)
        var convertedLatitude = degreesToRadians(latitudeFloat)
        var convertedLongitude = degreesToRadians(longitudeFloat)
        //Replacing original string values of latitude and longitude with floats
        req.body.latitude = convertedLatitude
        req.body.longitude = convertedLongitude
    } catch(err){
        if(err){
            res.status(500).json({
                message:'Invalid longitude or latitude value'
            })
        return
        }
    }
    
    //Validation checks.  
    var errors = registerSingeUserValidation(req)
    if (errors) {
        console.log(errors)
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })
        return
    }

    

    //Longitude and latitude validation



    //Validation checks after conversion

    const newUser = req.body
    //Latitude and longitude are converted here for use with distance equation later.
    newUser.latitude = parseFloat(newUser.latitude)
    newUser.longitude = parseFloat(newUser.longitude)

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