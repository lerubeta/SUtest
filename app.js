const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require("./controllers/UserController");
const LocationController = require("./controllers/LocationController");
const SearchController = require("./controllers/SearchController");

app.use(cors());
app.use(bodyParser.json());

//User Endpoints
app.post("/user", UserController.createUser);
app.get("/users", UserController.getAllUsers);
app.get("/user/:id", UserController.getUserById);
app.put("/user/:id", UserController.updateUserById);
app.delete("/user/:id", UserController.deleteUserById);

//Location Endpoints
app.post("/location", LocationController.createLocation);

//Search Endpoints
app.get("/search/location", SearchController.searchLocations);

console.log('git action test');
module.exports = app;
