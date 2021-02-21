const User = require("../queries/User");

exports.addUserToDb = async (user) => { 
    const userToInsert = createUserObjectToInsert(user);
    const result = await User.addUser(userToInsert);
    if (result) {
        const insertedUser = result.ops[0];
        return insertedUser;
    } else { 

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

const createUserObjectToInsert = (user) => { 
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
    }
}