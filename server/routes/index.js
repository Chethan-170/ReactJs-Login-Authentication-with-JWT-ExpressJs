const express = require('express');
const router = express.Router();
const mySQLConnection = require('./../models/connection');
const pool = require('./../models/connection');

router.get('/', (req, res)=>{
    res.send('hi');    
});
module.exports = router;