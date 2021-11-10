
const express = require('express');
var multer = require('multer');
const cors = require('cors');
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

InsertUser = (userId, fname, lname) => {
    console.log("INSERTING");
    sql_query = "INSERT INTO users (id, first_name, last_name, score) VALUES ("+userId+",'"+fname+"','"+lname+"', 0);";
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {
        console.log(error);
        console.log("DONE");
        db_ptr.end();
    });
};

DeleteUser = (userId) => {
    sql_query = 'DELETE FROM users WHERE Id =' + userId;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {
        db_ptr.end();
    });
};

UpdateUser = (userId, lname) => {
    sql_query = "UPDATE users SET last_name = '"+lname+"' WHERE Id = " + userId;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => {
        db_ptr.end();
    });
}

FetchUserById = async (userId) => {
    sql_query = "SELECT 1 + 1 as s";
    ans = null;
    db_ptr.connect();
    db_ptr.query(sql_query, async (error, results, fields) => {
        ans = results[0].s;
        db_ptr.end();
        return await ans;
    });
   // console.log(ans);
    //sql_query = 
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

app.get('/search-user', (req, res) => {
    console.log(req.query.userid);
    res.setHeader("Access-Control-Allow-Origin", "*");
    FetchUserById(req.query.userid).then(result => console.log(result.data));
   // res.json(FetchUserById(req.query.userid));
});
