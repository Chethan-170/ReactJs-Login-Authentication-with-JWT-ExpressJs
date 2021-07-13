const mySQLConnection = require("../connection");

const getUserByID = (userid = "") =>{
    return new Promise( async (resolve, reject)=>{
        try{
            if(userid === ""){
                resolve(false);
            }else{
                var sql = "SELECT ??, ??, ?? FROM ?? WHERE ?? = ? AND ?? = ?";
                var placeholderValues = [
                    'employee_id',
                    'employee_name', 
                    'password',
                    'tbl_users', 
                    'employee_id', 
                    userid,
                    'is_deleted',
                    '0'
                ];
                mySQLConnection.query(sql, placeholderValues, (err,result,fields)=>{
                    if(err){
                        console.log('Here came101');
                        reject(err);
                    }
                    else{
                        resolve(result[0]);
                    }
                });
            }
        }catch(err){
            console.log('Here came102');
            reject(err);
        }
    });
}
module.exports = {
    getUserByID
}