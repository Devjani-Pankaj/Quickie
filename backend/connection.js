require('dotenv').config();
const mysql = require('mysql2');

// Credentials now come from environment variables instead of being
// hardcoded in source (this file used to have a real, committed DB
// password). Defaults match the original values so local dev setups
// that already have MySQL configured this way keep working unchanged.
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'quickie',
  password: process.env.DB_PASSWORD || '1234'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = connection;
