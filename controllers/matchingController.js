var User = require('../models/User')

const matchingController = {}

matchingController.getCustomersWithin100KMofDublin = (req, res) => {

}

//Simply have to return customers in sorted order where the distance is less than 100
//Putting an index on the distance field for faster results. 
//Span some fake user data to test it to scale as well. 
 
module.exports = matchingController