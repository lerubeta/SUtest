const UserModel = require("../models/UserModel");
const UserValidation = require("../validation/UserValidation");

exports.createUser = async (req, res) => { 
    const user = req.body;
    const validationResult = UserValidation.validateUser(user);
    if (validationResult===true) { 
        const insertedUser = await UserModel.addUserToDb(user);
        if (insertedUser) {
            res.send("User added successfully");
        } else { 
            res.status(500).send("Server error")
        }
    }else{
        res.status(409).json(validationResult);
    }
} 