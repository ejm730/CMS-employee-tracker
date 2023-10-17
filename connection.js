const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ejm730',
    password: '8415',
    database: 'employee_tracker'
}).promise();

module.exports = connection;
