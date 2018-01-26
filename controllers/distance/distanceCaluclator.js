/*
Earths radius: 6371
Source: https://www.google.co.uk/search?q=earth%27s+radius+in+kilometers&oq=earths+radius+in+kilome&aqs=chrome.1.69i57j0l5.7463j0j7&sourceid=chrome&ie=UTF-8
*/
const distanceCalculator = {}

const earthsRadius = 6371
const dublinOfficeLatitude = 53.339428
const dublinOfficeLongitude = -6.257664

function degrees_to_radians(degrees) {
    return degrees * Math.PI / 180
}

distanceCalculator.calculateDistanceFromDublinOffice = function(customerLatitude, customerLongitude){

    var customerLatRadian = degrees_to_radians(customerLatitude)
    var customerLongRadian = degrees_to_radians(customerLongitude) 

    const central_angle = Math.acos(
        Math.sin(degrees_to_radians(customerLatitude)) * Math.sin(degrees_to_radians(dublinOfficeLatitude)) +
        Math.cos(degrees_to_radians(customerLatitude)) * Math.cos(degrees_to_radians(dublinOfficeLatitude)) 
        * Math.cos(degrees_to_radians(customerLongitude) - degrees_to_radians(dublinOfficeLongitude))
    )

    const distance = earthsRadius * central_angle
    return distance
}

module.exports = distanceCalculator