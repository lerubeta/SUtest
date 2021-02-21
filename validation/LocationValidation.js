const validator = require('validator');

exports.validateLocation = (location) => {
    const errorObject = {};
    let errorOccurred = false;
    if(!location){
        errorObject.error = true;
        errorObject.message = "Please fill out required fields!"
        return errorObject;
    }
    if(!location.latLong||validator.isEmpty(location.latLong)){
        errorObject.latLong = "Lat and Long are a required field";
        errorObject.error = true;
        errorOccurred = true;
    } else {
        if(!validator.isLatLong(location.latLong)){
            errorObject.latLong = "Lat and long are not valid";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    if (!location.timestamp || validator.isEmpty(location.timestamp)) { 
        errorObject.timestamp = "Timestamp is a required field";
        errorObject.error = true;
        errorOccurred = true;
    }
    return errorOccurred ? errorObject : true;
}