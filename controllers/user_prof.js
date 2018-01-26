/**User profile view  */

const Edit = require("../model/users");

exports.profileEditView = function(req, res) {
    /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 * checking if valid looged in user
 */
    if (req.session && req.session.email  && req.session.userid)
         res.render('useredit');
    else
      res.render('errorSignup', { message:'You can only see this after you have logged in.'});
};


exports.profileUpdate = function(req, res) {
//console.log("in function");
if(req.body.uni==""&&req.body.ph==""&&req.body.addr==""&&req.body.status=="")
    {
        //console.log("cannot update empty");
        res.render('error', { message:'Atleast one of the fields should be entered for profile to be updated. Please refresh to continue.'});
    }
    else
    {
        req.sanitize('ph').escape();
        req.sanitize('addr').escape();
        req.sanitize('uni').escape();
        req.sanitize('status').escape();

        var errors= req.validationErrors();
        if (errors) {
            res.render('error', { message:'Input Error. Please refresh to get back to profile update page'});
            //console.log(errors)
        return;
        } 
        else
        {       
            Edit.findById(req.session.userid, function(err, edit) {  
                // Handle any possible database errors
                if (err) {
                    res.status(500).send(err);
                } else {
                    // Update each attribute with any possible attribute that may have been submitted in the body of the request
                    // If that attribute isn't in the request body, default back to whatever it was before.
                    edit.address = req.body.addr || edit.address;
                    edit.status = req.body.status || edit.status;
                    edit.phone_no = req.body.ph || edit.phone_no;
                    edit.university = req.body.uni || edit.university;
            
                    // Save the updated document back to the database
                    edit.save(function(err, edit) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.render('userview',{user:edit});
                    });
                }
            });
        } 
       }  
     }

     exports.homeview=function(req,res){
          /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 * checking if valid looged in user
 */
         if(req.session && req.session.email  && req.session.userid){
            Edit.findById(req.session.userid,function(err,user){
            res.render('userview',{user:user});
         }) } 
         else  
         res.render('errorSignup', { message:'You can only see this after you have logged in.'});    
     }



