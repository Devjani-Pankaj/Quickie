require('dotenv').config();
const mysql = require('mysql2');

// Credentials come from environment variables instead of being hardcoded
// in source (this file used to have a real DB password committed).
// DB_PASSWORD has no default on purpose -- copy backend/.env.example to
// backend/.env and set it to your own local MySQL password.
if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD is not set. Copy backend/.env.example to backend/.env and fill it in.");
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'quickie',
  password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = connection;
