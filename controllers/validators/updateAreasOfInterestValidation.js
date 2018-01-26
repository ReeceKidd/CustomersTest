module.exports = function updateAreasOfInterestValidation(req) {

    const usersAge = req.body.age

    // User ID validation

    /*
    1) Checks that the user ID exists in the request. 
    2) Checks that the user ID is equal to a string. 
    3) Checks that the userID is not an empty string. 
    */

    req.check('_id', 'User ID must be sent with request').exists()
    req.check('_id', 'UserID must be a string').custom(_id => {
        if (typeof _id !== 'string') {
            return false
        }
        return true
    })
    req.check('_id', 'UserID can not be an empty string').custom(_id => {
        if (_id == '""') {
            return false
        }
        return true
    })

    //User Age validation
    /*
    1) Checks that age is a number. 
    2) Checks that age exists
    3) Checks that age is in valid number range.
    */
    req.check('age', 'User age must be sent with request').exists()
    req.check('age', 'User age must be a number').custom(age => {
        if (typeof age !== 'number' || (age % 1) !== 0) {
            return false
        }
        return true
    })
    req.check('age', 'Age must be a valid number between 16 and 120').custom(age => {
        if (age < 16) {
            return false
        } else if (age > 120) {
            return false
        } else {
            return true
        }
    })

    // Areas of interest array validation.

    /*
    1) Checks for the existience of an areasOfInterest array. 
    2) Checks that the array contains at least one area of interest.
    3) Checks that each area of interest is an object.
    4) Checks that each area of interest has defined value, years and ID. 
    5) Checks that each area of interest object does not contain additional fields. 
    */
    req.check('areasOfInterest', 'Areas of interest request is required').exists()
    req.check('areasOfInterest', 'You must have at least one area of interest').custom(areasOfInterest => {
        return areasOfInterest.length > 0
    })
    req.check('areasOfInterest', 'Each element in array must be an area of interest object').custom(areasOfInterest => {

        for (var x = 0; x < areasOfInterest.length; x++) {
            if (typeof areasOfInterest[x] !== 'object') {
                return false
            }
        }
        return true
    })

    req.check('areasOfInterest', 'Each area of interest must define a value for years of experience and ID').custom(areasOfInterest => {
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (areasOfInterest[x].value === 'undefined') {
                return false
            }
            if (areasOfInterest[x].years === 'undefined') {
                return false
            }
            if (areasOfInterest[x].areaOfInterestID === 'undefined') {
                return false
            }
        }
        return true
    })

    req.check('areasOfInterest', 'Each area of interest must contain a value, years of experience and ID').custom(areasOfInterest => {
        for (var x = 0; x < areasOfInterest.length; x++) {
            for (property in areasOfInterest[x]) {
                if (property !== 'value' && 
                    property !== 'years' &&
                    property !== 'areaOfInterestID') {
                    return false
                }
            }
        }
        return true
    })

    //Area of interest value field checks.

    /*
    1) Checks that a value is defined for every area of interest. 
    2) Checks that the value is a string value. 
    3) Checks that the value only contains letters and whitespace. 
    4) Checks that an empty string is not passed. 
    */

    req.check('areasOfInterest', 'Each area of interest value must be defined').custom(areasOfInterest => {
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (areasOfInterest[x].value === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Each area of interests value must be a string').custom(areasOfInterest => {
        if (areasOfInterest.length === 0) {
            return false
        }
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (typeof areasOfInterest[x].value !== 'string') {
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Area of interest values can only contain letters and white space').custom(areasOfInterest => {
        if (areasOfInterest.length === 0) {
            return false
        }
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (typeof areasOfInterest[x].value !== 'string') {
                return false
            }
            var match = areasOfInterest[x].value.match(/^[A-Za-z\s]+$/)
            if (match === undefined) {
                return false
            }
            if(!match){
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Area of interest values can not be empty').custom(areasOfInterest => {
        if (areasOfInterest.length === 0) {
            return false
        }
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (areasOfInterest[x].value === "") {
                return false
            }
        }
        return true
    })

    //Area of interest years value. 

    /*
    1) Checks that the "years" field is defined. 
    2) Checks that the years field is an integer. 
    3) Checks that years of experience is not greater than the users age. 
    */
    req.check('areasOfInterest', 'Each areas of interest years field must be defined').custom(areasOfInterest => {
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (areasOfInterest[x].years === 'undefined') {
                return false
            }
        }
        return true
    })

    req.check('areasOfInterest', 'Each area of interests years field must be an integer').custom(areasOfInterest => {
        if (areasOfInterest.length === 0) {
            return false
        }
        for (var x = 0; x < areasOfInterest.length; x++) {
            // https://jsperf.com/numbers-and-integers
            if (typeof areasOfInterest[x].years !== 'number' || (areasOfInterest[x].years % 1) !== 0) {
                return false
            }
        }
        return true
    })

    req.check('areasOfInterest', 'Your years of experience cannot be greater than your age. Your age is ' + usersAge).custom(areasOfInterest => {
        for (var x = 0; x < areasOfInterest.length; x++) {

            if (areasOfInterest[x].years >= usersAge) {
                return false
            }
        }
        return true
    })

    //Area of Interest ID field

    /*
    1) Checks the area of interest ID field is defined. 
    2) Checks the area of interest ID field is an integer. 
    */

    req.check('areasOfInterest', 'Each areas of interest ID field must be defined').custom(areasOfInterest => {
        for (var x = 0; x < areasOfInterest.length; x++) {
            if (areasOfInterest[x].areaOfInterestID === 'undefined') {
                return false
            }
        }
        return true
    })

    req.check('areasOfInterest', 'Each area of interests ID field must be an integer').custom(areasOfInterest => {
        if (areasOfInterest.length === 0) {
            return false
        }

        for (var x = 0; x < areasOfInterest.length; x++) {
            // https://jsperf.com/numbers-and-integers
            if (areasOfInterest[x].areaOfInterestID !== parseInt(areasOfInterest[x].areaOfInterestID)) {
                return false
            }
        }
        return true
    })

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}