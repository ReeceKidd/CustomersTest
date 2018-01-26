const degreesToRadianConvertor = {}

degreesToRadianConvertor.degreesToRadians = function(deg) {
    return (deg * Math.PI / 180.0);
}

module.exports = degreesToRadianConvertor