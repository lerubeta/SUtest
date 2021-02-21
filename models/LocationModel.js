const Location = require('../queries/Location');
const User = require('../queries/User');
const ObjectID = require('mongodb').ObjectID;

exports.createLocation = async (location, userId) => { 
    const locationToInsert = getLocationToInsert(location, userId);
    const insertionResult = await Location.addLocation(locationToInsert)
    if (insertionResult) {
        const locationAddedToUser = await addCreatedLocationToUser(insertionResult, userId);
        if (locationAddedToUser) {
            return insertionResult;
        } else { 
            return null;
        }
    } else { 
        return null;
    }
}

const getLocationToInsert = (location, userId) => { 
    return {
        latLong: location.latLong,
        timestamp: location.timestamp,
        userId: ObjectID(userId)
    }
}

addCreatedLocationToUser = async (location, userId) => {
    if(!userId || !location) return null;
    const result = await Location.addLocationToUser(location,userId);
    if(result){
        return true;
    }else{
        return false;
    }
}