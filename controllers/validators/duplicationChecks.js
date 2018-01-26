// Checks that there is no repeat "value" in any of the areas of interest objects. 

const duplicateChecker = {}

duplicateChecker.checkForDuplicates = function checkForDuplicates(areasOfInterest) {

    var valuesArray = areasOfInterest.map(function(areaOfInterest){ return areaOfInterest.value });
    var isDuplicate = valuesArray.some(function(areaOfInterest, idx){ 
        return valuesArray.indexOf(areaOfInterest) != idx 
    });
    
    if(isDuplicate) {
        return 'Duplicate area of interest found'
    }
}
    
module.exports = duplicateChecker