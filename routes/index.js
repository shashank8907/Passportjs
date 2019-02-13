//Any thing that is / or /homepage or /dashboard goes to index.js
//Any thing that is related to to display other than login/reg 

const express = require('express');
const router = express.Router() ;
//Here are importing an object that has key value pair of a function
//Here below code is same as  ensureAuthenticat = require('../config/auth').ensureAuthenticated
const { ensureAuthenticated } = require('../config/auth');


//Welcome page
router.get('/',(req,res)=>{
    res.render('welcome');
});

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard',{name:req.user.name});

});

module.exports= router;