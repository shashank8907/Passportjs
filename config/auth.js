
// Here you are exporting an object that key ensureAuthenticated and value as a function 
//To access that function we have to assess by obj.ensureAuthenticated 
module.exports = {
    //We should bring this file in and add this as a middleware to any route we want to be protected 
    ensureAuthenticated: function(req,res,next){
        //We have method attached to req obj isAuthenticated --passport 
        if(req.isAuthenticated()){
            //If so 
            next();
        }
        else{
            req.flash('error_msg', 'Please log in to view this resource');
            res.redirect('/users/login');
        }
    }
}