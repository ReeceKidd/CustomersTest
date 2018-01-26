

const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var User = require('../models/User')

const userController = {}

//JWT ISSUE TOKEN AND VERIFY
const asyncIssue = payload => {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(payload, 'supersecret', { expiresIn: '1d' })
      if (token) {
        resolve(token)
      }
      reject({ error: 'There was an error signing payload' })
    })
  }
  // verify token
  const asyncVerify = token => {
    return new Promise((resolve, reject) => {
      const decoded = jwt.verify(token, 'supersecret')
      if (decoded) {
        resolve(decoded)
      }
      reject({ error: 'There was an error verifying token' })
    })
  }

  userController.login = (req, res) => {
    try {
      var formData = req.body
      var query = {
        email: formData.email
      }
      User.findOneAndUpdate(query, {
        $set: {
            isUserLoggedIn: true
        },   
    })
        .then(user => {
          if (user) {
            // compare password
            bcrypt.compare(formData.password, user.password, (error, result) => {
              if (error) {
                throw Error('Invalid Username or Password')
              } else {
                if (result) {
                  // This can only return the username and userID. 
                  var userInfo = {
                    _id: user._id,
                    userName: user.userName 
                  }
                  asyncIssue(user.toObject())
                    .then(token => {
                      res.status(200).send({
                        message: 'Success',
                        token: token,
                        user: userInfo
                      })
                    })
                    .catch(error => {
                      const message = error.message
                        ? error.message
                        : 'There was an error'
                      res.status(400).send({
                        message: message
                      })
                    })
                } else {
                  res
                    .status(400)
                    .send({ message: 'Invalid Username or Password' })
                }
              }
            })
          } else {
            // user does not exist
            res.status(400).send({ message: 'Not a registered User' })
          }
        })
        .catch(err => {
          res
            .status(400)
            .send({ message: err.message ? err.message : 'There was an error' })
        })
    } catch (err) {
      const message = err.message ? err.message : 'There was an error'
      res.status(400).send({
        message: message
      })
    }
  }

  userController.logout = (req, res) => {
    const userID = req.params.userID
    User.findByIdAndUpdate(userID, {
      $set: {
          isUserLoggedIn: false
      },
  }, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not log out user',
                error: 'Server error'
            })
        } else {
            res.status(200).send({
                message: 'Logged out user ' + user.userName
            })
        }
    })
}
    
module.exports = userController