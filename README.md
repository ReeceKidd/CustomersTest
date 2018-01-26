# CustomersTest 
This solution uses a MongoDB database, node and express to determine which users receive an invite. 
The criteria for receiving an invite is that the user must be located within 100km of Intercoms Dublin 
office. The algorithm for determining the distance can be found here: https://en.wikipedia.org/wiki/Great-circle_distance. 

To upload the original customers use: node uploadCustomers.js

To view the answers go to the answers directory and view "customers-to-invite.json"

To view the associated distances of all the customers go to the answers directory and view "all-customers.json"