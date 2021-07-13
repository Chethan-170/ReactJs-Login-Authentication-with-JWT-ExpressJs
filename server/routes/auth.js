const express = require('express');
const router = express.Router();
const { 
    login,
    validate
} = require('./../controllers/auth');

// router.post('/login', login);
router.route('/login').post(login);
router.route('/validate').post(validate);
router.route('/*').all((req,res)=>{
    res.status(404).send('');
});

module.exports = router;