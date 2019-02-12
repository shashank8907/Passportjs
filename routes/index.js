//Any thing that is / or /homepage or /dashboard goes to index.js
//Any thing that is related to to display other than login/reg 

const express = require('express');
const router = express.Router() ;
const { ensureAuthenticated } = require('../config/auth');


//Welcome page
router.get('/',(req,res)=>{
    res.render('welcome');
});

router.get('/dashboard',ensureAuthenticated, (req,res)=>{
    res.render('dashboard');
});

module.exports= router;