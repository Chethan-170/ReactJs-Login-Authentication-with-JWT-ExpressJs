const JWTAuth = require('./../utils/auth');
const bcrypt = require('bcryptjs');
const { definedErrors, cookieExpiresIn } = require('./../constants');

const {
     getUserByID
} = require('./../models/auth');

const login = async (req, res)=>{
    if (typeof req.body == "object" && typeof req.body.username == "string" && typeof req.body.password == "string") {
        let { username, password } = req.body;
        try{
            let result = await getUserByID(username);
            if(result){
                const passwordMatched = await bcrypt.compare(password, result.password);
                if(passwordMatched){
                    const { employee_id, employee_name } = result;
                    let jwtToken = JWTAuth.generateKey({ employee_id, employee_name });
                    res.json({ ok: 0, user: { employee_id, employee_name }, jwtToken, cookieExpiresIn });
                }else res.json({ ok: -1, error:{...definedErrors.INVALID_CREDENTIALS} });
            }else res.json({ ok: -1, error:{...definedErrors.INVALID_CREDENTIALS} });
        }catch(err){
            console.log('MyError:',err);
            res.json({ ok: -1, error:{...definedErrors.CONNECTION_ERROR} });
        }
    }else res.json({ ok: -1, error:{...definedErrors.INVALID_CREDENTIALS} });
}

const validate = (req, res) => {
    if (typeof req.body == "object" && typeof req.body.jwtToken == "string") {
        let { jwtToken } = req.body;
        try {        
            user = JWTAuth.validateKey(jwtToken);
            res.json({ ok: 0, user: { ...user } });
        } catch (err) { 
            res.json({ ok: -1, error:{...definedErrors.JWT_TOKEN_ERROR} });
        }
    }else{
        res.json({ ok: -1, error:{...definedErrors.INVALID_CREDENTIALS} });
    }
}

module.exports = {
    login,
    validate
}