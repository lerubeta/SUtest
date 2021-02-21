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
            res.status(500).send("Server error");
        }
    }else{
        res.status(409).json(validationResult);
    }
} 

exports.getAllUsers = async (req, res) => { 
    const allUsers = await UserModel.getAllUsers();
    if (allUsers) {
        res.json(allUsers);
    } else { 
        res.status(500).send("Server error");
    }
}

exports.getUserById = async (req, res) => { 
    const _id = req.params.id;
    if (_id) {
        const user = await UserModel.getUserById(_id);
        if (user) {
            res.json(user);
        } else { 
            res.status(404).send('User not found');
        }
    } else { 
        res.status(404).send('Not found');
    }
}

exports.updateUserById = async (req, res) => { 
    const _id = req.params.id;
    const userToUpdate = req.body;
    if (_id) {
        const user = await UserModel.getUserById(_id);
        if (user) {
            const updateUser = await UserModel.updateUserById(user, userToUpdate);
            if (updateUser) {
                res.json(updateUser);
            } else {
                res.status(500).send("Server error"); 
            }
        } else { 
            res.status(404).send('User not found');
        }
    } else { 
        res.status(404).send('Not found');
    }
}

exports.deleteUserById = async (req, res) => { 
    const _id = req.params.id;
    if (_id) {
        const user = await UserModel.getUserById(_id);
        if (user) {
            const deleteUser = await UserModel.deleteUserById(user);
            if (deleteUser) {
                res.status(200).send("User Deleted successfully");
            } else { 
                res.status(500).send("Server error");       
            }
        } else { 
            res.status(404).send('User not found');
        }
    } else { 
        res.status(404).send('Not found');
    }


}