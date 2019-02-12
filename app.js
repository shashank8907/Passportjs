const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();

//DB config
//object.key
const db= require('./config/keys').MongoURI;

//Connect to mongo
//useNewUrlParser:true if we do this we dont get any complaints from the console
mongoose.connect(db,{useNewUrlParser:true}).then(()=>{console.log('mongoDB connected...')}).catch(err => console.log(err));

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');//setting our view engin to ejs

//Body parser -- part of express
app.use(express.urlencoded({extended:false})); //This way we can get the data from the form through request.body 


//Routes
app.use("/",require("./routes/index"));
app.use("/users",require("./routes/users"))


const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server started on port: ${PORT}`)); 