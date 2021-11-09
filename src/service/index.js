
const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const db_ptr = mysql.createConnection({
    host: 'address',
    user: 'root',
    password: 'password',
    database: 'dn_name',
    connectTimeout: 100000,
});

const testJSON = {
    questions: [
        [
            "terteg",
            ["a", "b", "c", "d"],
            "a"
        ],
        [
            "34892538",
            ["g", "p", "z", "w"],
            "w"
        ],
        [
            "ds8t34bvgjiedg4gdfgkdfgkdl;gke4tg0dfg",
            ["y", "1", "zvklsvj", "c"],
            "1"
        ]
    ]
};

app.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    res.json(testJSON);
});

db_ptr.connect();
db_ptr.query('SELECT 1 + 1 as s', (error, results, fields) => {
    console.log('hello');
    db_ptr.end();
});
app.listen(port, () => console.log("Listening on port", port));
