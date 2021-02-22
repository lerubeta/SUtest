const Location = require('../queries/Location');
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
    query.geometry = getGeometryQuery(searchQuery.latLong,searchQuery.distance);
    query.timestamp = getTimeQuery(searchQuery.time);
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
const getGeometryQuery = (latLong, distance) => { 
    if (!latLong||!distance) return {};
    let latLongArray = latLong.split(",");
    let latitude = parseFloat(latLongArray[0]);
    let longitude = parseFloat(latLongArray[1]);
    let maxDistance = parseInt(distance);
    return { $near: { $maxDistance: maxDistance, $geometry: { type: "Point", coordinates: [latitude, longitude] } } };
}

const getTimeQuery = (time) => { 
    if (!time) return {};
    const timeFilter = new Date(new Date().getTime() - (time*60*1000));
    return { $gte: timeFilter };
}

const getLocationToInsert = (location, userId) => { 
    let latLongArray = location.latLong.split(",");
    let latitude = parseFloat(latLongArray[0]);
    let longitude = parseFloat(latLongArray[1]);
    return {
        geometry: {
            type: "Point",
            coordinates: [longitude, latitude],            
        },
        timestamp: new Date(),
        userId: ObjectID(userId)
    }
}