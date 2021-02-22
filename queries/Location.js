const { ObjectID } = require('bson');
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
        userLocationHistory.push(ObjectID(location._id));
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