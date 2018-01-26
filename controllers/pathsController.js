const jwt = require('jsonwebtoken')
var User = require('../models/User')

const pathsController = {}

//Return the top five user areas of interest.

//How can I determine which area of interest the user likes best? 
//The best way I can think of doing this is to give each area of interest a likes field, links field, number
// of articles read or comments in that section.  
// maybe a total time spent field, users should also be able to prioritise the fields they want maybe. 

//Get recommended paths for user. 

//Allow users to post there own path. 

module.exports = matchingController