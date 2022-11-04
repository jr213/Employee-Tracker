const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employee_db",
    password: "yourpassword"
})

module.exports = db;