/*
Checks that when a single Customer registration is attempted the API request only contains the fields defined in the 
schema.   
*/

const checkFields = {}

checkFields.registerCustomer = function (req) {
    for (property in req.body) {
        if (property !== 'latitude' && 
            property !== 'longitude' &&
            property !== 'Customer_id' && 
            property !== 'name') {
            return 'Request contained unsupported field: ' + property
        }
    }
}

module.exports = checkFields