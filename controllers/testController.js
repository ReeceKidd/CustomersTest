
var User = require('../models/User')

const testController = {}

// Returns a list of all users
testController.getSingleUserID = (req, res) => {
    var query = User.findOne({}).select("_id")

    query.exec(function (err, userID) {
        if (err) return next(err);
        res.status(200)
        res.send(userID);
    });
}

module.exports = testController