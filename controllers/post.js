var Post=require('../model/posts');
var User=require('../model/users');
var hidevar;

exports.createPost= function(req, res) {
     /** referred from: https://www.npmjs.com/package/express-session
     *  to authenticate user by creating sessions and holding session info in cookies
     * checking if valid looged in user
     */
    if (req.session && req.session.email  && req.session.userid)
            res.render('createpost',{message:""}); 
    else
        res.render('errorSignup', { message:'You can only see this after you have logged in.'});

};

exports.submitPost = function(req,res){
    req.checkBody('user_post','Post cannnot be empty').notEmpty();
    req.sanitize('user_post').escape();


// run the validators
var errors = req.validationErrors();
if (errors) {
    res.render('error', { message:'Input Error. Try creating post again'});
    //console.log(errors)
return;}
    else{
  
User.findById(req.session.userid,function(err,user){
    
    var post = new Post(
        { user_post: req.body.user_post,
          email: user.email,
          hide: req.body.hide
        });
    //console.log(post);
                ///console.log("in create part");
                  Post.create(post,function (err,post) {
                      if (err) {console.log(err); return err; }

                         //console.log(req.session);
                         //console.log("post"+post)
                         res.render('createpost',{message:"Post is successful. want to do another?The hide is "+post.hide})
                         
                        });
});
}
}

exports.ViewPost=function(req,res){
     /** referred from: https://www.npmjs.com/package/express-session
     *  to authenticate user by creating sessions and holding session info in cookies
     * checking if valid looged in user
     */
    if(req.session && req.session.email && req.session.userid)
    {
        Post.find({}, 'user_post email ').exec(function (err, list_posts) {
         if (err) { return next(err); }
         res.render('viewpost', { title: 'All posts Visible to this user', post_list: list_posts,note:'Disclaimer: Some authors have set their post settings as - visibility restricted beyond all visitors to the web app - i.e. logged in users. If you can View view the post you are a valid logged in User. Cheers!!'});
        });
    }
    else
    {
        Post.find({'hide':'No'},'user_post email').exec(function(err, list_posts){
            if(err){return next(err);}
            res.render('viewpost',{title: 'All posts Visible to this user', post_list: list_posts,note:'Disclaimer: Some authors have set their post settings as - visibility restricted beyond all visitors to the web app - i.e. logged in users. As you are not a valid logged in User you cant view those posts.You can only see them after you have logged in.'});
        });
    }
}

exports.ViewPostDetail=function(req,res){
    var id=req.originalUrl.split("/");
    
    //console.log(req.session);
    Post.findById(id[3],function(err,post){
        if (err) { return next(err); }
    //check post settings
    if(post.hide=="Yes")     
    {
         /** referred from: https://www.npmjs.com/package/express-session
         *  to authenticate user by creating sessions and holding session info in cookies
         * checking if valid looged in user
         */
      if(req.session && req.session.email && req.session.userid)
        {
         //console.log(post);
         res.render('postdetail', { post: post, note:'Disclaimer : As per Post Author this post visibility is restricted beyond all visitors to the web app - i.e. logged in users. If you can View this message you are a valid logged in User. Cheers!!' });
        }
        else
        res.render('errorSignup', { message:'As per Post Author this post visibility is restricted beyond all visitors to the web app - i.e. logged in users. You can only see this after you have logged in.'}); 
    }
    else 
    {
        //console.log(post);
        res.render('postdetail', { post: post, note:'Disclaimer : As per Post Author, there is no visibility restriction on this post.' });
      }   
    
  })
}
// json = {'username':1 , 'pwd' : 2}
exports.DeletePost=function(req,res){
  /** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 * checking if valid looged in user
 */
if(req.session && req.session.email && req.session.userid)
   {
    Post.findOne({'_id':req.body.id,'email':req.session.email},function(err,post){
        if(err) throw err;
        if(post)
        {
        //console.log(post);
        Post.findByIdAndRemove(req.body.id,function(err){
        if(err){
            throw err;
        }
        //console.log(req.session);
        res.redirect('/viewposts');
    });
}
else
 res.render('errorSignup',{message:'Cannot delete'});   }
    
);}
else
res.render('errorSignup',{message:'Cannot delete'})
}
