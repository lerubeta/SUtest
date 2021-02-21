const LocationModel = require('../models/LocationModel');
const LocationValidation = require('../validation/LocationValidation');
const UserModel = require('../models/UserModel');
const User = require('../queries/User');

exports.createLocation = async (req, res) => { 
    const location = req.body; 
    const userId = req.body.userId; // can be changed 
    const validationResult = LocationValidation.validateLocation(location)
    if (validationResult === true) { 
        const createdLocation = await LocationModel.createLocation(location, userId);
        console.log(createdLocation);
        if (createdLocation) {
            res.send(createdLocation)
        } else { 
            res.status(500).send("Server error");
        }
    } else {
            res.status(409).json(validationResult)
    }
}