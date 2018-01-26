const rp=require('request-promise');
const assert=require('assert');
var User=require('../model/users');
var Post = require('../model/posts');
var Post_Id;
describe("View Posts",function(){
   var app,server;
   beforeEach(function(done){
    app=require('../app.js');
    server=app.listen(8080);
    var user = new User(
    {
     first_name:'Sreetama',
     last_name:'Banerjee',
     dob:'12/13/1992',
     email:'sreetama.banerjee@gmail.com',
     password:'a',
     gen:'F',
     address:'',
     status:'',
     phone_no:'',
     university:''
    });
    User.create(user,function (err,user) {
        if (err) { return err; }
      });

    setTimeout(function(){}, 1000);

    var post= new Post({
        user_post: 'This is a test post',
        email: 'sreetama.banerjee@gmail.com',
        hide: 'Yes'
     });
    Post.create(post,function(err,postdetail){
        if(err) throw err;
        else 
         Post_Id=postdetail.id;
     });

    setTimeout(function(){
        done();}, 1000);

});

   afterEach(function(){
    User.remove({},function(err){
    if(err) {
     console.log(err);
     throw err;}});
    
    Post.remove({},function(err){
        if(err) throw err;
     });
    
    server.close();
    });

   describe("Feature 5: test of successful functionality",function(){
       it("Should allow an authorised i.e. logged in user, to view a post with restricted visibility", async function(){
           var cookie_jar=rp.jar();
           await rp({
            followAllRedirects:true,
            method: "POST",
            uri: 'http://localhost:8080/signup',
            resolveWithFullResponse: true,
            form: {
                first_name: "Rachita",
                last_name: "B",
                email: "rach@gmail.com",
                password: "q",
                confirmPassword: "q",
                dob: "10/12/1992",
                gender: "F"
            },
            jar: cookie_jar
         });

            setTimeout(function(){
            }, 20000);

           await rp({
            followAllRedirects: true,
            method: "POST",
            uri: 'http://localhost:8080/home',
            resolveWithFullResponse: true,
            form: {
              email: "rach@gmail.com",
              password: "q"
             },
            jar: cookie_jar
           });
           
           setTimeout(function(){
            }, 20000);

           var result = await rp({
            followAllRedirects: true,
            method: "GET",
            uri: 'http://localhost:8080/viewposts/detail/'+Post_Id,
            resolveWithFullResponse: true,
            jar: cookie_jar
            });
           assert(result.body.search(Post_Id) >= 0);
        }); 
       });
    describe("Feature 5: test of failure functionality",function(){
        it("Should not let unauthorised User view a post that has a visibility restriction set to beyong all application users.", async function(){
            cookie_jar=rp.jar();
            var result = await rp({
                followAllRedirects: true,
                method: "GET",
                uri: 'http://localhost:8080/viewposts',
                resolveWithFullResponse: true,
                jar: cookie_jar
            });
            assert(result.body.search(Post_Id)<0);
        })
    });

  
});