//Then /user/login or /user/register goes to the user.js

const express = require('express');
const router = express.Router();
//To encrypt the password
const bcrypt = require('bcryptjs');
// We dont need to require mongoose here because of User
//User model
const User = require('../models/User');

//Login page
router.get('/login', (req, res) => {

    res.render("login");

});

//register page
router.get('/register', (req, res) => {

    res.render("register");

});

router.post('/register', (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;
    //Validation before we submit We can also use third party libraries for this
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            message: "Please fill in all fields"
        });
    }
    //Check passwords match
    if (password !== password2) {
        errors.push({
            message: "Passwords do not match"
        });
    }
    //Check passwords length
    if (password.length < 6) {
        errors.push({
            message: "Password should be atleast 6 characters"
        });
    }

    if (errors.length > 0) {
        //We have an issue 
        // With ejs or any templet engin you can pass in values along with rendering page
        // the below is es 6 
        //  We also need to pass the data because in the registration form
        // value="<%= typeof name != 'undefined' ? name : '' %>" 
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation passed
        //finde one where email = email
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                // user exists
                errors.push({
                    message: "Email is already registered   "
                })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                //New user
                //We have to crypt the password and store it in mongoDB
                //This will basically create the instance 
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //We have to save the instance 
                const saltRounds = 10;
                const myPlaintextPassword = newUser.password;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save().then(user => {
                            res.redirect('/users/login')
                        }).catch(err => {
                            console.log("error in save()")
                        })
                    });
                });


            }
        })

    }
});



module.exports = router;