module.exports = function registerSingleUserValidation(req){
    
    req.check('longitude', 'First name is required for basic registration').exists()
    
    req.check('latitude', 'Last name is required for basic registration').exists()
    
    req.check('user_id', 'Username is required for basic registration').exists()
    
    req.check('name', 'Password is required for basic registration').exists()

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}
