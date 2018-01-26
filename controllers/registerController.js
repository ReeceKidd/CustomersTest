const jwt = require('jsonwebtoken')
var User = require('../models/User')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js')

//Checks for duplication of values in array.
const duplicationChecker = require('./validators/duplicationChecks.js')

// Validatiors
const basicRegistrationValidation = require('./validators/basicRegistrationValidation.js')
const updateAreasOfInterestValidation = require('./validators/updateAreasOfInterestValidation.js')

const registerController = {}

//JWT ISSUE TOKEN AND VERIFY
const asyncIssue = payload => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(payload, 'supersecret', {
            expiresIn: '1d'
        })
        if (token) {
            resolve(token)
        }
        reject({
            error: 'There was an error signing payload'
        })
    })
}
// verify token
const asyncVerify = token => {
    return new Promise((resolve, reject) => {
        const decoded = jwt.verify(token, 'supersecret')
        if (decoded) {
            resolve(decoded)
        }
        reject({
            error: 'There was an error verifying token'
        })
    })
}

registerController.checkUserName = (req, res) => {
    const username = req.params.username
    User.findOne({
        userName: username
    }, function (err, existingUser) {
        if (existingUser) {
            res.status(900)
            res.send({
                message: 'Username already exists',
                error: 'Already exists in database.'
            })
        } else if (err) {
            res.status(500)
            res.send({
                message: '',
                error: 'Server error'
            })
        } else {
            res.status(200)
            res.send({
                message: 'Email available'
            })
        }
    })
}

registerController.checkEmail = (req, res) => {
    const email = req.params.email
    User.findOne({
        email: email
    }, function (err, existingEmail) {
        if (existingEmail) {
            res.status(900)
            res.send({
                message: 'Email already exists',
                error: 'Already exists in database.'
            })
        } else if (err) {
            res.status(500)
            res.send({
                message: 'Email available',
                error: 'Server error'
            })
        } else {
            res.status(200)
            res.send({
                message: 'Email available'
            })
        }
    })
}

// Register User
registerController.register = (req, res) => {

    //Checks that fields only defined in the schema are passed. 
    var unwantedField = checkFields.basicRegistration(req)

    if (unwantedField) {
        res.status(700).json({
            message: unwantedField,
            error: 'Additional fields found'
        })
        return
    }

    //Validation for basic registration. 
    var errors = basicRegistrationValidation(req)
    if (errors) {
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })

    } else {
        try {
            const newUser = req.body
            newUser.areasOfInterest = []
            newUser.mentors = []
            newUser.mentees = []
            newUser.basicRegistrationComplete = true
            newUser.areasOfInterestRegistrationComplete = false
            newUser.userRegistrationComplete = false
            newUser.isUserLoggedIn = true
            const saveUser = new User(newUser)
            saveUser
                .save()
                .then(user => {
                    user.password = user.updatedAt = user.createdAt = user.confirmPassword = undefined
                    const token = asyncIssue(user.toObject()).then(token => {
                        res.status(200).send({
                            message: 'Success',
                            token: token,
                            user: user
                        })
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send({
                        message: err.message ? err.message : 'Unable to save user to database',
                        error: 'Unable to save user.'
                    })
                })
        } catch (err) {
            const message = err.message ? err.message : 'There was an error'
            res.status(401).send({
                message: message
            })
        }
    }
}

registerController.getAreasOfInterest = (req, res) => {
    const userID = req.params.userID
    User.findById(userID, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get areas of interest',
                error: 'Server error'
            })
        }
    }).select('areasOfInterest -_id').then(user => {
        /*
        Once a user submits areas of interest, additional fields are added that will be used
        for matching, however a user should not be able to see or change these, the
        code below makes sure they cant see the other fields. 
        */
        var areasOfInterestWithFieldsUserCanUpdate = []
        for(var x = 0; x < user.areasOfInterest.length; x++){
            areasOfInterestWithFieldsUserCanUpdate.push({
                value: user.areasOfInterest[x].value,
                years: user.areasOfInterest[x].years,
                areaOfInterestID: user.areasOfInterest[x].areaOfInterestID
            })
        }
        res.status(200).send({
            areasOfInterest: areasOfInterestWithFieldsUserCanUpdate
        })
    })
}

registerController.getUsersAge = (req, res) => {
    const userID = req.params.userID
    var query = {
        _id: userID
    }
    User.findOne(query, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get users age',
                error: 'Server error'
            })
        }
    }).select('age -_id').then(user => {
        res.status(200).send({
            age: user.age
        })
    })
}

// Title case function is needed for when users add an area of interest. 
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

registerController.updateAreasOfInterest = (req, res) => {

    //Checks that only _id and areas of interest are passed in request. 
    var unwantedField = checkFields.updateAreasOfInterest(req.body)

    if (unwantedField) {
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedField
        })
    }


    for (var x = 0; x < req.body.areasOfInterest.length; x++) {
        req.body.areasOfInterest[x].value = toTitleCase(req.body.areasOfInterest[x].value)
    }

    //Checks that there are no duplicate values for the areas of interest
    var duplicatedAreaOfInterestValues = duplicationChecker.checkForDuplicates(req.body.areasOfInterest)

    if (duplicatedAreaOfInterestValues) {
        return res.status(800).send({
            error: 'Duplicate values',
            message: duplicatedAreaOfInterestValues
        })
    }

    //Validation for updating areas of interest. 
    var errors = updateAreasOfInterestValidation(req)

    if (errors) {
        return res.status(600).send({
            error: 'Validation failure',
            message: errors[Object.keys(errors)[0]].msg
        })
    } else {
        var updatedAreasOfInterest = req.body.areasOfInterest
        // This updates each of the areas of interest to include fields that will be used in recommendation engine. 
        for (var x = 0; x < updatedAreasOfInterest.length; x++) {
            updatedAreasOfInterest[x].numberOfLikes = 0
            updatedAreasOfInterest[x].numberOfLinksClicked = 0
            updatedAreasOfInterest[x].articlesRead = 0
            updatedAreasOfInterest[x].videosWatched = 0
            updatedAreasOfInterest[x].pathsStudied = 0
        }

        var query = {
            '_id': req.body._id
        }

        User.findOneAndUpdate(query, {
                $set: {
                    areasOfInterest: updatedAreasOfInterest,
                    areasOfInterestRegistrationComplete: true
                },
                
            },
            function (err, updated) {
                if (err) {
                    res.status(400).send({
                        message: 'Unable to update areas of interest. Could not find user. '
                    })
                } else {
                    res.status(200).send({
                        message: 'Updated areas of interest successfully.'
                    })
                }
            }
        )
    }



}

module.exports = registerController