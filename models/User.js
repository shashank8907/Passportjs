//We create a schema which basically consists of all different fields the we wan4t for a user 
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required:true
    },

    email:{
        type: String,
        required:true
    },

    password:{
        type: String,
        required:true
    },

    date:{
        type: Date,
        default:Date.now
    }


})

//put the UserSchema in a variable and export it 
                //To create a mode from our schema model name, Schema
const User = mongoose.model('User',UserSchema); 

module.exports = User;//Export this object so we can use it in other files