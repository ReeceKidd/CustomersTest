const registerController = {};

var Customer = require('../models/Customer')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js');

// Request validators
const registerCustomerValidation = require('./validators/registerCustomerValidation')

const distanceCalculator = require('./distance/distanceCaluclator')
const calculateDistanceFromDublinOfffice = distanceCalculator.calculateDistanceFromDublinOffice

registerController.registerCustomer = (req, res) => {

    //Checks that fields only defined in the schema are passed. 
    var unwantedField = checkFields.registerCustomer(req)

    if (unwantedField) {
        res.status(700).json({
            message: unwantedField
        })
        return
    }

    //Validation checks.  
    var errors = registerCustomerValidation(req)
    if (errors) {
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
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
        res.status(500).json({
            message: 'Invalid longitude or latitude value'
        })
        return
    }

    var radiansResult = calculateDistanceFromDublinOfffice(req.body.latitude, req.body.longitude)

    const newCustomer = req.body
        /*
        The result is rounded to two decimal places for readability and because this
        online tool displays results to two places:
        https://www.movable-type.co.uk/scripts/latlong.html
        which was necessary to accurately test the results. 
        */
    newCustomer.distanceFromDublinKM = radiansResult.toFixed(2)
    const saveCustomer = new Customer(newCustomer)
    saveCustomer
        .save()
        .then(Customer => {
            res.status(200).send({
                message: 'Success',
                Customer: Customer
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ? err.message : 'Unable to save Customer to database',
                error: 'Unable to save Customer.'
            })
        })
}

module.exports = registerController