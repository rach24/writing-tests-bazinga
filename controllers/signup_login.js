
var User=require('../model/users');
global.UserId;

// Display Home page on GET- sign in
exports.sign_in = function(req, res) {
    //console.log(req.session);
    /* from https://github.com/ctavan/express-validator 
       installation npm install express-validator
       to validate user input and sanitize against XSS */
    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.sanitize('password').escape();
    req.sanitize('first_name').escape();
    req.sanitize('last_name').escape();
    req.sanitize('dob').escape();
    

    //Run the express validators
    var errors = req.validationErrors();
    
        if (errors) {
            res.render('error', { message:'Input Error. Please refresh to get back to sign in page'});
           // console.log(errors)
        return;
        } 
        else
        {
            User.findOne({ 'email': req.body.email })
            .exec( function(err, found_user) {
                //console.log('found_user: ' + found_user);
                if (err) { return err; }
                
                if (found_user) { 
                    //User exists, check password
                    if(found_user.password==req.body.password)
                        {
                            
                            /** referred from: https://www.npmjs.com/package/express-session
                            *  to authenticate user by creating sessions and holding session info in cookies
                            */
                            req.session.email = req.body.email;
                            req.session.userid=found_user.id;
                            //  console.log(req.session);
                            // console.log(req.cookies);
                            
                            res.render('userview',{user:found_user});
                        }
                        else
                        {
                            res.render('error', { message:'password incorrect. Please go back to get back to sign in page'});
                            //console.log("password incorrect");
                        }
                }
                else
                {
                    res.render('error', { message:'Email doesnt exist. Please go back to get back to sign in page'});
                    //console.log(" email not registered. ");
                }
        });
    }
}

// Handle user registration on POST
exports.sign_up = function(req, res) {
   
    /* from https://github.com/ctavan/express-validator 
       installation npm install express-validator
       to validate user input and sanitize against XSS */

    req.checkBody('first_name','First name must not be emtpy').notEmpty();
    req.checkBody('last_name','Family name should not be empty').notEmpty();
    req.checkBody('email','Email is a mandatory field').notEmpty();
    req.checkBody('password','Passwords are a must').notEmpty();
    req.checkBody('confirmPassword','Password and confirm password should match').isEqual(req.body.password);
    req.checkBody('dob','Date invalid').notEmpty();
    req.checkBody('dob','Date invalid').isDate()
    req.sanitize('first_name').escape();
    req.sanitize('last_name').escape();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.sanitize('password').escape();
    req.sanitize('confirmPassword').escape();
    req.sanitize('dob').toDate();

    //Run the validators
    var errors = req.validationErrors();
    var date= new Date();
    // create new user object with sanitized input
    var user = new User(
        { first_name: req.body.first_name, 
          last_name: req.body.last_name, 
          dob: req.body.dob,
          email: req.body.email,
          password: req.body.password,
          gen: req.body.gender,
          address: "",
          status: "",
          phone_no: "",
          university: "",
          date_activated:date.getDate()
         });
         
      if (errors) {
          res.render('error', { message:'Input Error. Please refresh to get back to sign up page'});
          //console.log(errors)
      return;
      } 
      else {
        // Data from form is valid.
        //Check if Genre with same name already exists
        User.findOne({ 'email': req.body.email })
        .exec( function(err, found_user) {
             //console.log('found_user: ' + found_user);
             if (err) { return err; }
             
             if (found_user) { 
                 //User exists, error page
                 res.render('errorSignup', { message:'Email already exists.'});
                 //console.log("same email not allowed.");
             }
             else {
                 
                User.create(user,function (err,user) {
                    if (err) { return err; }
                       //successful - redirect to signin.
                       //console.log("user"+user);
                       res.redirect('/');
                    });
                 
             
          
           // }
         
      }
    });
}
  };



// go to sign up page
exports.sign_up_traverse = function(req, res) {
    res.render('signup');
};


//landing page
 
exports.index = function(req, res,err) {
        
        res.render('signin', { title: 'FriendsNearMe'});
 };

 //log out and session destroy
 exports.logout=function(req,res){
    /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 *  destroying cookie on log out and clearing cookie
 */
    req.session.destroy();
    res.clearCookie("connect.sid'");
    //console.log(req.session);
   // console.log(req.cookies);
    res.redirect('/');
 }