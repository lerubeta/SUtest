const LocationModel = require('../models/LocationModel');

exports.searchLocations = async (req, res) => { 
    const query = await getSearchQuery(req.query);
    const resultLocations = await LocationModel.searchLocations(query);   
    if (resultLocations === null || resultLocations === undefined) { 
         return res.status(500).send("Server error")
    }
    res.json(resultLocations);
}

const getSearchQuery = async (query) => { 
    const searchQuery = {};
    searchQuery.latLong = query.latLong ? query.latLong: "";
    searchQuery.time = query.time ? query.time: "";
    searchQuery.distance = query.distance ? query.distance: "";
    return searchQuery;
}
