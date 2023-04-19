const express = require("express");
const app = express();
const port = 3001;
const mysql = require("./connection").con
const connection = require("./connection").con
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require("http");
var fs = require("fs");

app.use(cors())

// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.urlencoded());

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
            if (results.length == 1) {
                console.log(results)
                res.send({
                    "status": true,
                    "data": results
                })
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

    mysql.query("Insert into user(user_id,Firstname,Lastname,Dob,username,Email,password,Phone) values(?,?,?,?,?,?,?,?)", [registration, firstname, lastname, dob, username, email, password, phone],
        (err, results) => {
            if (err) throw err
            else {
                
                res.redirect(`/logindata/?userid=${registration}&username=${username}&password=${password}`)
                console.log("user table inserted")
            }

        });

});


app.get('/logindata', (req, res) => {
    
    console.log(req.query)
    mysql.query("Insert into login(user_id,username,password) values(?,?,?)",[req.query.userid,req.query.username,req.query.password],
    (err, results) => {
        if (err) throw err
        else {
            console.log('Data inserted to login table as well.');
            res.send({'status':'data inserted in login table.'});
        }
        
        });


})

//To get delivery items list
app.get("/deliveryList", (req, res) => {
    console.log("Delivery List successfully loaded")
    mysql.query("SELECT * FROM quickie.order", (err, results) => {
        //console.log(results)
        if (err) {
            res.send({
                status: false,
                data: "Some error occured our side"
            })
        }
        else {
            res.send({
                status: true,
                data: results
            })
        }
    })
})

//To get coins count
app.get("/coinsAmount", (req, res) => {
    console.log("coinsAmount func called properly")
    //console.log(req.query.user_id)
    //console.log(`SELECT coins FROM quickie.user where user_id = ${req.query.user_id}`)
    mysql.query(`SELECT coins FROM quickie.user where user.user_id = ${req.query.user_id}`, (err, results) => {
        if (err) {
            res.send({
                status: false,
                data: "Some error occured our side"
            })
        }
        else {
            console.log(results)
            res.send({
                status: true,
                data: results[0].coins
            })
        }
    })
})

//To get items list from backend
app.get("/itemsList", (req, res) => {
    console.log("called itemsList");
    items = req.query.items;
    if(items.substring(items.length-1)===","){
        items = items.substring(0, items.length-1)
    }
    console.log("items from itemslist",items)
    mysql.query(`SELECT * FROM quickie.item where iditem in (${items})`, (err, results) => {
        console.log(results)
        if (err) {
            console.log(items);
            res.send({
                status: false,
                data: err
            })
        } else {
            res.send({
                status: true,
                data: results
            })
        }
    })
})
app.get("/userprofile", (req, res) => {
    console.log("called userprofile");
    
    mysql.query(`SELECT * FROM quickie.user where user_id = ${req.query.user_id}`, (err, results) => {
        console.log(results)
        if (err) {
            console.log(items);
            res.send({

                status: false,
            })
        } else {
            res.send({
                status: true,
                data: results
            })
        }
    })
})
//cart
app.post('/cart', (req, res) => {
    let iditem = req.body.iditem;
    let price = req.body.price;
    let user_id = req.body.user_id;
    console.log(price);
    console.log(iditem);
    connection.query('select * from cart where iditem = ? and user_id = ? ',[iditem, user_id],function(err,results){
        if(results.length>0)
        {
            connection.query('update cart set quantity = ?  where iditem = ? and user_id = ? ',[req.body.qty,iditem, user_id],function(err,results){
                if(err)throw err;
                res.send({"status":true});
        })
        }
        else{
            mysql.query ('Insert into cart values (?,?,?,?) ',[iditem,req.body.qty,price, user_id],function(error,results){
                if(error) throw error;
                res.send({"status":true});
             });
        }
    })
    
  });


  //confirm order
  app.post('/order', (req,res)=>{
    mysql.query ("insert into order values")
  })
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

app.post("/contact", (req, res) => {
    mysql.query("Insert into contact values(?,?,?)",[req.body.name,req.body.email,req.body.comment], (err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
})

/*
app.post("/register", (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var Firstname = req.body.Firstname
    var Lastname = req.body.Lastname
    // var 
    mysql.query("Insert into user()")
})*/


// Menu
app.post("/getCategory",(req,res)=>{
    console.log(req.body.category)
    let qry = "select * from item where category_id='"+req.body.category+"'";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.send(results);
        }
    });
})

app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});
//cart
app.post('/cart', (req, res) => {
    console.log("cart called")
    let iditem = req.body.iditem;
    mysql.query('select * from cart where iditem = ? ',[iditem],function(err,results){
        if(results.length>0)
        {
            mysql.query('update cart set quantity = quantity+1 where iditem = ?',[iditem],function(err,results){
                if(err) throw err;
                res.send({"status":true});
        })
        }
        else{
            mysql.query ('Insert into cart(iditem) values (?) ',[iditem],function(error,results){
                if(error) throw error;
                res.send({"status":true});
             });
        }
    })
    
  });
app.get("/cartItems", (req,res)=>{
    
    mysql.query(`select * from item join cart where cart.iditem=item.iditem and user_id = ${req.query.user_id}`, (err, results)=> {
      if(err) throw err;
      res.send({
        status: true,
        results:results
      });
    })
  })

app.post("/confirmOrder", (req, res) => {
    console.log("properly calling confirm order web service")
    mysql.query(`INSERT INTO quickie.order (order_id, user_id, date, time, place, items) VALUES (${req.query.order_id}, ${req.query.user_id}, "${req.query.date}", "1000-01-01 06:40:00", "${req.query.place}", "${req.query.items}")`, (err, results) => {
        if(err) {
            res.send({
                status: false,
                data: err
            })
        } else {
            res.send({
                status: true,
                message: "Succesfully added order"
            })
        }
    })
})

app.get("/sufficientCoins", (req, res) => {
    console.log("Sufficient coins web service called")
    console.log(req.query.user_id)
    mysql.query(`SELECT coins FROM quickie.user where user_id = ${req.query.user_id}`, (err, results) => {
        if(err) {
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true,
                data: results
            })
        }
    })
})

app.post("/emptyCartItems", (req, res) => {
    console.log("emptyCartItems web service is called")
    mysql.query(`Delete FROM quickie.cart where user_id = ${req.body.user_id}`, (err, results) => {
        if(err) {
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true,
                data: `Cart items deleted for user_id ${req.body.user_id}`
            })
        }
    })
})

app.post("/updateCoins", (req, res) => {
    let user_id = req.body.user_id
    let totalCost = req.body.totalCost
    mysql.query(`UPDATE quickie.user SET coins = coins-${totalCost} WHERE (user_id = ${user_id})`, (err, results) => {
        if(err) {
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true,
                data: "updated coins successfully"
            })
        }
    })
})

app.post("/incrementCoins", (req, res) => {
    let user_id = req.body.user_id
    let totalCost = req.body.totalCost
    mysql.query(`UPDATE quickie.user SET coins = coins+${totalCost} WHERE (user_id = ${user_id})`, (err, results) => {
        if(err) {
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true,
                data: "updated coins successfully"
            })
        }
    })
})

app.post("/updateOrderStatus", (req, res) => {
    let order_id1 = req.body.order_id
    console.log("ORDER ID ID",order_id1)
    mysql.query(`UPDATE quickie.order SET status = 1 WHERE (order_id = ${order_id1})`, (err, results) => {
        if(err) {
            res.send({
                status: false
            })
        } else {
            res.send({
                status: true,
                data: "updated order status successfully"
            })
        }
    })
})

