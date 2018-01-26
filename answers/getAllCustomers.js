/*
This retrieves all the customers stored in the MongoDB datbase. 
Including their distance from the dublin office. 
*/
const axios = require('axios')
const fs = require('fs');

const getAllCustomersURL = 'http://localhost:4000/get-all-customers'

axios.get(getAllCustomersURL)
    .then(function (customers) {
        var customersJson = JSON.stringify(customers.data.customers, null, "\t");
        fs.writeFile("all-customers.json", customersJson, function (err) {
            if (err) {
                return console.log(err);
            }
        });
        console.log('Successfully created: "all-customers.json"')
    })
    .catch(function (error) {
        console.log(error)
    });