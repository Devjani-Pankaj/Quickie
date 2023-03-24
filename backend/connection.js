const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'Quickie',
  password : '2809'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = connection;

