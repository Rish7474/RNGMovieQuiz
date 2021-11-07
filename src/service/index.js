import Express from "express";

const app = Express();
const port = 3000;

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


app.listen(port, () => console.log("Listening on port", port));
