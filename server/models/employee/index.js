const mySQLConnection = require("../connection");

const getAllEmployees = (filters = [])=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let sql = "SELECT * FROM ?? WHERE ?? = ?";
            let placeholderValues = [
                'tbl_users',
                'is_deleted',
                0
            ];
            mySQLConnection.query(sql, placeholderValues, (err,result,fields)=>{
                if(err){
                    console.log('Here came101');
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        }catch(err){
            console.log('Here came102');
            reject(err);
        }        
    });
}

module.exports = {
    getAllEmployees
}