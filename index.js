const express = require("express");
const fs = require('fs');
const mysql = require("mysql");
const { callbackify } = require("util");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const json = fs.readFileSync('credentials.json', 'utf8');
const credentials = JSON.parse(json);

const connection = mysql.createConnection(credentials);
connection.connect(error => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
});

app.listen(5000, () => {
    console.log("running on post 5000!")
});

connection.end();