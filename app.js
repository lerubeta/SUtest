const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require("./controllers/UserController");


app.use(cors());
app.use(bodyParser.json());

//User Endpoints -- 
app.post("/user", UserController.createUser)


module.exports = app;
