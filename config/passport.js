 const LocalStrategy = require('passport-local').Strategy; 
 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');

 //Load User model
 
 const User = require('../models/User');  
 


 //We should export strategy that we want to create 
 //We are not including passport with require because we are going to pass it in from app.js file
 module.exports = function (passport) { 
     passport.use(
         new LocalStrategy({usernameField: 'email'}, (email,password,done)=>{
            //Check if there is a user with that email
            User.findOne({email:email})
            .then(user =>  {
                //Here we'll get an user or null
                if(!user){
                    return done(null,false,"That email is not registered");
                }

                //Match the password --use bcrypt
                bcrypt.compare(password, user.password,(err, isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        //user is passed
                        return done(null,user);
                    }else{
                        return done(null,false,"password incorrect");
                    }
                });
            })
            .catch()
         })
     );

     //Methods for serializing the user and deserializing the user 
     //For maintaining the user session
     passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        User.findById(id, (err, user)=> {
          done(err, user);
        });
      });
 }