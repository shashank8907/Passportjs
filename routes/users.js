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
    const {name, email, password, password2} = req.body;
    //Validation before we submit We can also use third party libraries for this
    let errors = [];
    
    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({message:"Please fill in all fields"});
    }
    //Check passwords match
    if(password !== password2){
        errors.push({message:"Passwords fdo not match"});
    }
    //Check passwords length
    if(password.length < 6){
        errors.push({message:"Password should be atleast 6 characters"});
    }

    if(errors.length > 0){
        //We have an issue 
        // With ejs or any templet engin you can pass in values along with rendering page
        res.render('register',{
         errors,
            
        }); 
    }else{
        res.send('pass');
    }
});



module.exports = router;