const mongoose = require("mongoose");
require('dotenv').config()

let mongoDB = process.env.MONGODB;

module.exports = mongoose.connect(mongoDB);