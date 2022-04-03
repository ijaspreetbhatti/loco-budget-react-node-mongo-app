const express = require('express');

let server;

const app = express();

const mongoConnection = require("./connection.js");

mongoConnection
    .then(() => {
        console.log("Loco Budget MongoDB Connected!");
        server = app.listen(
            process.env.PORT || 8080,
            () => console.log("Site is active on 8080. Visit http://localhost:8080/.")
        );
    });

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Routes = require('./routes/Routes.js');

app.use('/api/v1', Routes);