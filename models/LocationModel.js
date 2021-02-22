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

exports.searchLocations = async (query) => { 
    const searchQuery = createQueryForSearch(query);
    const locationsResults = await Location.getLocationsByQuery(searchQuery);
    return locationsResults;
}

const createQueryForSearch = (searchQuery) => {
    const query = {};
    query.timestamp = getTimeQuery(searchQuery.time);
    console.log(query)
    return query;
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

const getTimeQuery = (time) => { 
    if (!time) return {};
    const timeFilter = new Date(new Date().getTime() - (time*60*1000));
    return { $gte: timeFilter };
}

const getLocationToInsert = (location, userId) => { 
    return {
        latLong: location.latLong,
        timestamp: new Date(),
        userId: ObjectID(userId)
    }
}