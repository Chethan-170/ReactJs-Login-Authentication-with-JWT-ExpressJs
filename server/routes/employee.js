const express = require('express');
const router = express.Router();
const employee = require('./../controllers/employee'); 

router.route('/getAll').post(employee.getAllEmployees);
router.route('/*').all((req,res)=>{
    res.status(404).send();
});

module.exports = router;