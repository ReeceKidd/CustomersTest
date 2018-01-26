

module.exports = function registerSingleUserValidation(req) {

    //Need to do checks for valid latitude and longitude. 

    req.check('longitude', 'Longitude is required for basic registration').exists()
    req.check('latitude', 'Latitude is required for basic registration').exists()
    
    req.check('user_id', 'User ID is required for basic registration').exists()
    req.check('user_id', 'User ID must be an integer value').isInt()
    

    req.check('name', 'Name is required for basic registration').exists()

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}