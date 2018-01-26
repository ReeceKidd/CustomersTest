const registerController = {};

var User = require('../models/User')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js');

// Request validators
const registerUserValidation = require('./validators/registerUserValidation')

const distanceCalculator = require('./distance/distanceCaluclator')
const calculateDistanceFromDublinOfffice = distanceCalculator.calculateDistanceFromDublinOffice

registerController.registerUser = (req, res) => {
      
            //Checks that fields only defined in the schema are passed. 
            var unwantedField = checkFields.registerSingleUser(req.body)

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
                //Replacing original string values of latitude and longitude with floats
                req.body.latitude = latitudeFloat
                req.body.longitude = longitudeFloat
            } catch (err) {
                if (err) {
                    res.status(500).json({
                        message: 'Invalid longitude or latitude value'
                    })
                    return
                }
            }

            var radiansResult = calculateDistanceFromDublinOfffice(req.body.latitude, req.body.longitude)


            //Validation checks.  
            var errors = registerUserValidation(req)
            if (errors) {
                console.log(errors)
                res.status(600).json({
                    message: errors,
                    error: 'Validation failure'
                })
                return
            }

            const newUser = req.body
            //Latitude and longitude are converted here for use with distance equation later.
            newUser.distance = radiansResult
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

module.exports = registerController