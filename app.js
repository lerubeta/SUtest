const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

module.exports = app;
