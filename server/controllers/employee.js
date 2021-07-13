const employee_model = require('./../models/employee');
const JWTAuth = require('./../utils/auth');
const { definedErrors } = require('./../constants');

const getAllEmployees = async (req, res)=>{
    if (typeof req.body === "object" && req.body.operation === 'getallemployees'){
        const { jwtToken } = req.body;
        try{
            user = JWTAuth.validateKey(jwtToken);
            try{
                const result = await employee_model.getAllEmployees();
                res.json({ ok: 0, result });
            }catch(err){
                console.log('MyError:',err);
                res.json({ ok: -1, error:{...definedErrors.CONNECTION_ERROR} });
            }
        }catch(tokenErr){
            console.log('MyError:',tokenErr);
            res.json({ ok: -1, error:{...definedErrors.JWT_TOKEN_ERROR} });
        }
    }else res.json({ ok: -1, error:{...definedErrors.INVALID_CREDENTIALS} });
}

module.exports = {
    getAllEmployees
}