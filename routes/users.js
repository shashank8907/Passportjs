//Then /user/login or /user/register goes to the user.js

const express = require('express');
const router = express.Router() ;

//Login page
router.get('/login',(req,res)=>{

    res.send("Login");

});

//register page
router.get('/register',(req,res)=>{

    res.send("Register");

});
module.exports= router;