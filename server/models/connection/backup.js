const mysql = require('mysql');
const mySQLConnectionConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parrothink_demo_db_v1',
    multipleStatements: true
});

const mySQLConnection = ()=>{
    return new Promise((resolve, reject)=>{
        mySQLConnectionConfig.connect((err)=>{
            if(err) reject(err);
            else resolve(mySQLConnectionConfig);
        });
    })
}

module.exports = mySQLConnection;