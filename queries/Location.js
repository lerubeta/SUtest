const { ObjectId } = require('mongodb');
const { getDb } = require('../config/dbConnection');
const User = require('./User');

exports.addLocation = async (location) => { 
    const _db = getDb();
    try {
        const collection = _db.collection('locations');
        const result = await collection.insertOne(location);
        if (result) {    
            return result.ops[0];
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

exports.addLocationToUser = async (location, userId) => { 
    const user = await User.getUserById(userId);
    if (user) {
        const userLocationHistory = user.locationHistory;
        userLocationHistory.push(ObjectId(location._id));
        const result = await User.updateUserLocationHistory(userId, userLocationHistory)
        if (result) {
            return true;
        } else { 
            return null;
        }
    } else { 
        return null;
    }
}

exports.getLocationsByQuery = async (query) => { 
    const _db = getDb();
    try {
        const collection = _db.collection('locations');
        const locations = await collection.find(query).toArray();
        return locations;
        
    } catch {
        return null;       
    }
}

exports.getUsersIdByLocationQuery = async (query) => { 
    const _db = getDb();
    try {
        const collection = _db.collection('locations');
        const usersIds = await collection.distinct("userId", query);
        return usersIds;   
    } catch {
        return null;       
    }
}
