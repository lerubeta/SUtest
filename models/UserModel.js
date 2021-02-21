const User = require("../queries/User");

exports.addUserToDb = async (user) => { 
    const userToInsert = createUserObjectToInsert(user);
    const result = await User.addUser(userToInsert);
    if (result) {
        const insertedUser = result.ops[0];
        return insertedUser;
    } else { 
        return null;
    }
}

exports.getAllUsers = async () => { 
    const allUsers = await User.getAllUsers();
    return allUsers;
}

exports.getUserById = async (_id) => { 
    const user = await User.getUserById(_id);
    return user;
}

exports.updateUserById = async (user, userToUpdate) => { 
    const userUpdated = await User.updateUserById(user, userToUpdate);
    if (userUpdated) { 
        const userToReturn = await User.getUserById(user._id)
        console.log(userToReturn)
        return userToReturn;
    }else { 
        return null;
    }
}

const createUserObjectToInsert = (user) => { 
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
    }
}