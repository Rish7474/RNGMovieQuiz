
const express = require('express');
var multer = require('multer');
const cors = require('cors');
var upload = multer();
const app = express();
const port = 3000;
const mysql = require('mysql');
const db_ptr = mysql.createConnection({});
db_ptr.connect();
const kQuestionRefreshBatchSize = 5;
questions = [];

/* Fisher-Yates shuffle algorithm found on StackOverFlow.
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
*/
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

GenerateQuestionBatch = () => {
    sql_query = "CALL get_question()";
    questionBatch = {
        questions: []
    };
    for (let i = 0; i < kQuestionRefreshBatchSize; i++) {
        db_ptr.query(sql_query, (error, results, fields) => {
            data = results[0][0];
            prompt = `Which movie/tv show was ${data["actor"]} in?`;
            answerChoices = shuffle([data["ans"], data["ians1"], data["ians2"], data["ians3"]]);
            questions.push([
                prompt,
                answerChoices,
                data["ans"]]);
            if (questions.length >= kQuestionRefreshBatchSize) {
                questions.shift();
            }
        });
    }
    questionBatch["questions"] = questions;
    return questionBatch;
};

InsertUser = (userId, fname, lname) => {
    sql_query = "INSERT INTO users (id, first_name, last_name, score) VALUES (" + userId + ",'" + fname + "','" + lname + "', 0);";
    db_ptr.query(sql_query, (error, results, fields) => { });
};

DeleteUser = (userId) => {
    sql_query = 'DELETE FROM users WHERE Id =' + userId;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => { });
};

UpdateUser = (userId, lname) => {
    sql_query = "UPDATE users SET last_name = '" + lname + "' WHERE Id = " + userId;
    db_ptr.connect();
    db_ptr.query(sql_query, (error, results, fields) => { });
}

app.use(express.urlencoded());
app.use(express.json());
app.use(upload.array());
app.use(cors());

app.listen(port, () => console.log("Listening on port", port));

app.get('/rng-gen', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(await GenerateQuestionBatch());
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
