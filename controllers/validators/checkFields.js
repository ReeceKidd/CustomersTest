const checkFields = {}

// Check fields is used to determine if a request only gets the valid fields for that request.

/*
Checks that the basic registration request only has: firstName, lastName, userName, email, password, 
confirmPasword, age, country, terms, areasOfInterest, 
areasOfInterestRegistrationComplete, userRegistrationComplete  
*/

checkFields.basicRegistration = function (req) {
    for (property in req.body) {
        if (property !== 'firstName' && property !== 'lastName' &&
            property !== 'userName' && property !== 'email' && property !== 'password' &&
            property !== 'age' && property !== 'confirmPassword' && property !== 'language' && 
            property !== 'terms' && property) {
            return 'Request contained unsupported field: ' + property
        }
    }
}

//Checks that the update areas of interest request has only to properties an '_id' and 'areas of interest. 
checkFields.updateAreasOfInterest = function (req) {
    for (property in req) {
        if (property !== '_id' && property !== 'areasOfInterest' && property !== 'age') {
            return 'Request contained unsupported field: ' + property
        }
    }
}



module.exports = checkFields