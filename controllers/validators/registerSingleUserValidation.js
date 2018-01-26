

module.exports = function registerSingleUserValidation(req) {

    //Need to do checks for valid latitude and longitude. 

    req.check('longitude', 'Longitude is required for basic registration').exists()
    req.check('longitude', 'Longitude needs to be between -180 and +180').custom(longitude =>{
        // Longitude is in the range -180 and +180 specifying coordinates west and east of the Prime Meridian.
        if(longitude < -180 || longitude > 180){
            return false
        } 
        return true
    })
    
    req.check('latitude', 'Latitude is required for basic registration').exists()
    req.check('latitude', 'Latitude needs to be between -90 and +90').custom(latitude =>{
        // Valid range of latitude in degrees is -90 and +90 for the southern and northern hemisphere 
        if(latitude < -90 || latitude > 90){
            return false
        } 
        return true
    })
    
    req.check('user_id', 'User ID is required for basic registration').exists()
    req.check('user_id', 'User ID must be an integer value').isInt()
    

    // Need to check if name equals a string. 
    req.check('name', 'Name is required for basic registration').exists()

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}