const checkFields = {}

// Check fields is used to determine if a request only gets the valid fields for that request.

/*
Checks that when a single user registration is attempted the API request only contains the fields defined in the 
schema.   
*/

checkFields.registerSingleUser = function (req) {
    for (property in req.body) {
        if (property !== 'latitude' && 
            property !== 'longitude' &&
            property !== 'user_id' && 
            property !== 'name') {
            return 'Request contained unsupported field: ' + property
        }
    }
}

module.exports = checkFields