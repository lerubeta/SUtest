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

exports.getAllUsers = async () => {
    const _db = getDb();
    try {
        const collection = _db.collection("users");
        const result = await collection.find({}).toArray();
        return result;
    } catch {
        return null;
    }
}

exports.getUserById = async (_id) => { 
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const user = await collection.findOne({ "_id": ObjectID(_id) });
        return user;
    } catch {
        return null;
    }
}

exports.updateUserById = async (user, userToUpdate) => { 
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const updatedUser = await collection.updateOne({ "_id": user._id }, { $set: userToUpdate });
        return updatedUser;
    } catch {
        return null;
    }
}

exports.deleteUser = async (user) => { 
    const _db = getDb();
    try {
        const collection = _db.collection('users');
        const deleteUser = await collection.deleteOne({ "_id": user._id });     
        return deleteUser;
    } catch {
        return null;
    }
}
