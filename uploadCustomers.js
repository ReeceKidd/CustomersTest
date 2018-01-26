const axios = require('axios')

var currentCustomers = [{
    "latitude": "52.986375",
    "Customer_id": 12,
    "name": "Christina McArdle",
    "longitude": "-6.043701"
}, {
    "latitude": "51.92893",
    "Customer_id": 1,
    "name": "Alice Cahill",
    "longitude": "-10.27699"
}, {
    "latitude": "51.8856167",
    "Customer_id": 2,
    "name": "Ian McArdle",
    "longitude": "-10.4240951"
}, {
    "latitude": "52.3191841",
    "Customer_id": 3,
    "name": "Jack Enright",
    "longitude": "-8.5072391"
}, {
    "latitude": "53.807778",
    "Customer_id": 28,
    "name": "Charlie Halligan",
    "longitude": "-7.714444"
}, {
    "latitude": "53.4692815",
    "Customer_id": 7,
    "name": "Frank Kehoe",
    "longitude": "-9.436036"
}, {
    "latitude": "54.0894797",
    "Customer_id": 8,
    "name": "Eoin Ahearn",
    "longitude": "-6.18671"
}, {
    "latitude": "53.038056",
    "Customer_id": 26,
    "name": "Stephen McArdle",
    "longitude": "-7.653889"
}, {
    "latitude": "54.1225",
    "Customer_id": 27,
    "name": "Enid Gallagher",
    "longitude": "-8.143333"
}, {
    "latitude": "53.1229599",
    "Customer_id": 6,
    "name": "Theresa Enright",
    "longitude": "-6.2705202"
}, {
    "latitude": "52.2559432",
    "Customer_id": 9,
    "name": "Jack Dempsey",
    "longitude": "-7.1048927"
}, {
    "latitude": "52.240382",
    "Customer_id": 10,
    "name": "Georgina Gallagher",
    "longitude": "-6.972413"
}, {
    "latitude": "53.2451022",
    "Customer_id": 4,
    "name": "Ian Kehoe",
    "longitude": "-6.238335"
}, {
    "latitude": "53.1302756",
    "Customer_id": 5,
    "name": "Nora Dempsey",
    "longitude": "-6.2397222"
}, {
    "latitude": "53.008769",
    "Customer_id": 11,
    "name": "Richard Finnegan",
    "longitude": "-6.1056711"
}, {
    "latitude": "53.1489345",
    "Customer_id": 31,
    "name": "Alan Behan",
    "longitude": "-6.8422408"
}, {
    "latitude": "53",
    "Customer_id": 13,
    "name": "Olive Ahearn",
    "longitude": "-7"
}, {
    "latitude": "51.999447",
    "Customer_id": 14,
    "name": "Helen Cahill",
    "longitude": "-9.742744"
}, {
    "latitude": "52.966",
    "Customer_id": 15,
    "name": "Michael Ahearn",
    "longitude": "-6.463"
}, {
    "latitude": "52.366037",
    "Customer_id": 16,
    "name": "Ian Larkin",
    "longitude": "-8.179118"
}, {
    "latitude": "54.180238",
    "Customer_id": 17,
    "name": "Patricia Cahill",
    "longitude": "-5.920898"
}, {
    "latitude": "53.0033946",
    "Customer_id": 39,
    "name": "Lisa Ahearn",
    "longitude": "-6.3877505"
}, {
    "latitude": "52.228056",
    "Customer_id": 18,
    "name": "Bob Larkin",
    "longitude": "-7.915833"
}, {
    "latitude": "54.133333",
    "Customer_id": 24,
    "name": "Rose Enright",
    "longitude": "-6.433333"
}, {
    "latitude": "55.033",
    "Customer_id": 19,
    "name": "Enid Cahill",
    "longitude": "-8.112"
}, {
    "latitude": "53.521111",
    "Customer_id": 20,
    "name": "Enid Enright",
    "longitude": "-9.831111"
}, {
    "latitude": "51.802",
    "Customer_id": 21,
    "name": "David Ahearn",
    "longitude": "-9.442"
}, {
    "latitude": "54.374208",
    "Customer_id": 22,
    "name": "Charlie McArdle",
    "longitude": "-8.371639"
}, {
    "latitude": "53.74452",
    "Customer_id": 29,
    "name": "Oliver Ahearn",
    "longitude": "-7.11167"
}, {
    "latitude": "53.761389",
    "Customer_id": 30,
    "name": "Nick Enright",
    "longitude": "-7.2875"
}, {
    "latitude": "54.080556",
    "Customer_id": 23,
    "name": "Eoin Gallagher",
    "longitude": "-6.361944"
}, {
    "latitude": "52.833502",
    "Customer_id": 25,
    "name": "David Behan",
    "longitude": "-8.522366"
}]

const registerCustomerURL = 'http://localhost:4000/register-Customer'

currentCustomers.forEach(function(customer) {
axios.post(registerCustomerURL, customer)
    .then(function (response) {
        console.log('Added: ' + customer.name)
    })
    .catch(function (error) {
        console.log(error)
    });
})