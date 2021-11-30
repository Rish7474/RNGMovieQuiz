
const express = require('express');
var multer = require('multer');
const cors = require('cors');
var upload = multer();
const app = express();
const port = 3000;
const mysql = require('mysql');
const db_ptr = mysql.createConnection({
});
db_ptr.connect();

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

InsertUser = (userId, fname, lname) => {
    console.log("INSERTING");
    sql_query = "INSERT INTO users (id, first_name, last_name, score) VALUES ("+userId+",'"+fname+"','"+lname+"', 0);";
    db_ptr.query(sql_query, (error, results, fields) => {
        console.log(error);
    });
};

DeleteUser = (userId) => {
    sql_query = 'DELETE FROM users WHERE Id =' + userId;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {});
};

UpdateUser = (userId, lname) => {
    sql_query = "UPDATE users SET last_name = '"+lname+"' WHERE Id = " + userId;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {});
}

app.use(express.urlencoded());
app.use(express.json());
app.use(upload.array());
app.use(cors());

app.listen(port, () => console.log("Listening on port", port));

app.get('/rng-gen', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(testJSON);
});

app.post('/add-user', (req, res) => {
    req_obj = JSON.parse(JSON.stringify(req.body));
    InsertUser(req_obj["userId"], req_obj["fname"], req_obj["lname"]);
    res.status(200);
})

app.post('/delete-user', (req, res) => {
    req_obj = JSON.parse(JSON.stringify(req.body));
    console.log(req_obj['userId']);
    DeleteUser(req_obj['userId']);
    res.status(200);
});

app.post('/update-user', (req, res) => {
    req_obj = JSON.parse(JSON.stringify(req.body));
    console.log(req_obj);
    UpdateUser(req_obj["userId"], req_obj["lname"]);
    res.status(200);
});
