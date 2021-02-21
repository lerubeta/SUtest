const {getDb} = require('../config/dbConnection');
const ObjectID = require('mongodb').ObjectID;

exports.addUser = async (user) => { 
    const _db = getDb();
    try {
        const collection = _db.collection("users");
        const result = await collection.insertOne(user)
        return result;
        
    } catch {
        return null;
    }
}