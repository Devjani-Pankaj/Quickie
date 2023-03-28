const express = require("express");
const app = express();
const port = 3000;
const mysql = require("./connection").con
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require("http");
var fs = require("fs");

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/getlogin', (req, res) => {
    console.log(req.query);
});

app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.get("/login", (req, res) => {
    let qry = "select * from login ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }

    });

});

app.post("/login", (req, res) => {
    mysql.query("SELECT * from login where username=? and password=?", [req.body.username, req.body.password], (err, results) => {
        if (err) throw err
        else {
            if (results.length == 1)
            {
                res.send({ "status": true })            
                    // res.redirect("/login_mode");
            }
            else
                res.send({ "status": false })
        }

    });

});

app.post("/register", (req, res) => {
    var registration = req.body.registration
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var email = req.body.email
    var phone = req.body.phone
    var password = req.body.password
    var username = req.body.username
    var dob = req.body.dob

    mysql.query("Insert into user(user_id,Firstname,Lastname,Dob,username,Email,password,Phone) values(?,?,?,?,?,?,?,?)",[registration,firstname,lastname,dob,username,phone,email,password,phone],(err, results) => {
        if (err) throw err
        else {
            res.send({"status": "Inserted into database"})
        }

    });

});



// pankaj code

app.post('/getregistration', (req, res) => {
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

app.post("/registration", (req, res) => {
    mysql.query("SELECT * from user where user_name=? and user_password=?", [req.body.username, req.body.password], (err, results) => {
        if (err) throw err
        else {
            if (results.length == 1)
            {
                res.send({ "status": true })
                
                    
                    res.redirect("/registration_module");
                
            }
            else
                res.send({ "status": false })
        }

    });

});

app.post("/register", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var Firstname =req.body.Firstname
    var Lastname =req.body.Lastname
    // var 
    mysql.query("Insert into user()")
})

app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});



