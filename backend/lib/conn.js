const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'papertrail',
});

module.exports = connection;
