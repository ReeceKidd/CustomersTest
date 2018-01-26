/*
Admin controller is used to retreive all customers from the database.
*/
var Customer = require('../models/Customer')

const adminController = {}

adminController.getAllCustomers = (req, res) => {
    var query = Customer.find({}).select('-__v')
    
    query.exec(function (err, customers) {
        if (err) {
            res.status(500).send(err)
            return
        }
        res.send(JSON.stringify({
             customers
        }));
    })
}

module.exports = adminController