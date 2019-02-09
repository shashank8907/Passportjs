//Any thing that is / or /homepage or /dashboard goes to index.js
//Any thing that is related to to display other than login/reg 

const express = require('express');
const router = express.Router() ;

router.get('/',(req,res)=>{

    res.render('welcome');

});
module.exports= router;