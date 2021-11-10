
const express = require('express');
var multer = require('multer');
var upload = multer();
const app = express();
const port = 3000;
const mysql = require('mysql');
const db_ptr = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
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

InsertUser = (userId) => {
    console.log("INSERTING");
    sql_query = 'INSERT INTO users VALUES (' + userId + ', fname, lname, 0)';
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {
        db_ptr.end();
    });
};

DeleteUser = (userId) => {
    sql_query = 'DELETE FROM users WHERE Id =' + user_id;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {
        console.log(results);
        db_ptr.end();
    });
};

UpdateUser = (userId) => {

}

app.use(express.urlencoded());
app.use(express.json());
app.use(upload.array());

app.listen(port, () => console.log("Listening on port", port));

app.get('/rng-gen', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(testJSON);
});

app.post('/add-user', (req, res) => {
    req_obj = JSON.parse(JSON.stringify(req.body));
    InsertUser(req_obj["userId"]);
    res.status(200);
})

app.delete('/delete-user', (req, res) => {
    console.log(req.body.userId);
    DeleteUser(req.body.userId);
    res.status(200);
});

app.post('/update-user', (req, res) => {
    console.log(req.body.userId);
    UpdateUser(req.body.userId);
    res.status(200);
})

// db_ptr.connect();
// db_ptr.query('SELECT 1 + 1', (error, results, fields) => {
//     console.log(results);
//     db_ptr.end();
// });

