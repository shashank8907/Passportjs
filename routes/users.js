//Then /user/login or /user/register goes to the user.js

const express = require('express');
const router = express.Router();

//Login page
router.get('/login', (req, res) => {

    res.render("login");

});

//register page
router.get('/register', (req, res) => {

    res.render("register");

});

router.post('/register', (req, res) => {

    console.log(req.body);
    res.send("Hey");
});



module.exports = router;