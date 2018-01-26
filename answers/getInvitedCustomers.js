/*
This retrieves the solution to the customers problem from the MongoDB database. 
It outputs the names and Customer ids of matching customers (within 100km), sorted by Customer ID (ascending)
into the "customers-to-invite.json" file.
*/
const axios = require('axios')
const fs = require('fs');

const getInvitedCustomersURL = 'http://localhost:4000/get-customers-eligible-for-invite'

axios.get(getInvitedCustomersURL)
    .then(function (customers) {
        var customersJson = JSON.stringify(customers.data.customers, null, "\t");
        fs.writeFile("customers-to-invite.json", customersJson, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log('Successfully created: "customers-to-invite.json"')
    })
    .catch(function (error) {
        console.log(error)
    });