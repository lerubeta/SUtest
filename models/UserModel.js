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

const createUserObjectToInsert = (user) => { 
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
    }
}