var Customer = require('../models/Customer')

const matchingController = {}

matchingController.getCustomersWithin100KMofDublin = (req, res) => {

    var getCustomersWithin100KMs = Customer.find({
        "distanceFromDublinKM": {
            "$lte": "100"
        }
    }).select('name Customer_id -_id').sort({"Customer_id": 'asc'})

    getCustomersWithin100KMs.exec(function (err, customers) {
        if (err) {
         res.status(500).send({
             message: err
         })
         return   
        } 
        res.send(JSON.stringify({
            customers
       }));
    });
      
}

module.exports = matchingController