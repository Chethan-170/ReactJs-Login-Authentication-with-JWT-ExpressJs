const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parrothink_demo_db_v1'
});

module.exports = pool