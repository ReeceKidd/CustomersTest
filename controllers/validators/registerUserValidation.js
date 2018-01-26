
/*
Basic requirement checks more can be added depending on the needs of the application. 
For example there chould be checks to only allow name to be alphabetical and include whitespace. 
*/
module.exports = function registerUserValidation(req) {

    req.check('latitude', 'Latitude is required for basic registration').exists()
    req.check('latitude', 'Latitude must be a float number between -90 and +90').isFloat({min:-90.00, max:90.00})

    req.check('longitude', 'Longitude is required for basic registration').exists()
    req.check('longitude', 'Longitude must be a float number between -180 and +180').isFloat({min:-180.00, max:180.00})
    
    req.check('user_id', 'User ID is required for basic registration').exists()
    req.check('user_id', 'User ID must be an integer value').isInt()
     
    req.check('name', 'Name is required for basic registration').exists()
    req.check('name', 'Name must be greater than two characters').isLength({min:2})

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}