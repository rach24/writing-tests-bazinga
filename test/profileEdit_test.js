const rp=require('request-promise');
const assert=require('assert');
var User=require('../model/users');

describe("editProfile",function(){
    var app,server;
beforeEach(function(done)
{ 
    app=require('../app.js');
    server=app.listen(8080);
    done();

});

afterEach(function(){
    User.remove({email:'rach@gmail.com'},function(err){
        if(err) {
            console.log(err);
            throw err;}
    });
    server.close();
    
    });
   describe("Feature 2: test of successful functionality ", function(){
    it("should allow user to edit profile", async function() {
        var cj = rp.jar();
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
            jar: cj
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
            jar: cj
          });
          
          setTimeout(function(){
          }, 20000);
        var result = await rp({
          followAllRedirects: true,
          method: "POST",
          uri: 'http://localhost:8080/profile',
          resolveWithFullResponse: true,
          form: {
            ph: "12345"},
          jar: cj
        });
        assert(result.body.search("12345") >= 0);
      }); 
    });
    describe("Feature 2: test of failure functionality ", function(){
        it("should not allow user to edit someone else's profile", async function() {
            var cj = rp.jar();
            setTimeout(function(){
            }, 20000);
          var result = await rp({
            followAllRedirects: true,
            method: "GET",
            uri: 'http://localhost:8080/profile',
            resolveWithFullResponse: true,
            jar: cj
          });
          assert(result.body.search("You can only see this after you have logged in.") >= 0);

        }); 
    });
});