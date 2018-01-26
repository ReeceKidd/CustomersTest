var User = require('../models/User')

const matchingController = {}

matchingController.getCustomersWithin100KMofDublin = (req, res) => {

    var getCustomersWithin100KMs = User.find({
        "distanceFromDublinKM": {
            "$lte": "100"
        }
    }).select('name user_id -_id')

    getCustomersWithin100KMs.exec(function (err, customers) {
        if (err) {
         res.status(500).send({
             message: err
         })
         return   
        } 
        res.status(200).send(customers);
    });
      
}

module.exports = matchingController