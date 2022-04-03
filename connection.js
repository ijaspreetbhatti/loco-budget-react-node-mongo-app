const mongoose = require("mongoose");

let mongoDB = `mongodb+srv://teamloon:teamloon@cluster0.pm1me.mongodb.net/loco-budget?retryWrites=true&w=majority`;

module.exports = mongoose.connect(mongoDB);