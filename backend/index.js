const express = require("express");
const app = express();
const port = 3000;
const mysql = require("./connection").con
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/getlogin', (req, res) => {
    console.log(req.query);
});

app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.get("/user", (req, res) => {
    let qry = "select * from user ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }

    });

});

app.post("/login", (req, res) => {
    mysql.query("SELECT * from user where user_name=? and user_password=?", [req.body.username, req.body.password], (err, results) => {
        if (err) throw err
        else {
            if (results.length == 1)
            {
                res.send({ "status": true })
                res.redirect('/login_mode');
            }
            else
                res.send({ "status": false })
        }

    });

});

app.post("/register", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    mysql.query("Insert into user()")
})

app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});