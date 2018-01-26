const rp=require('request-promise');
const assert=require('assert');
var User=require('../model/users');

describe("Registration",function(){
var app,server;
before(function(done)
{
    app=require('../app.js');
    server=app.listen(8080);
    var user = new User(
    {
     first_name:'Sree',
     last_name:'B',
     dob:'12/13/1992',
     email:'abc@gmail.com',
     password:'a',
     gen:'M',
     address:'',
     status:'',
     phone_no:'',
     university:''
    });

   User.create(user,function (err,user) {
        if (err) { return err; }
      });

    setTimeout(function(){
    done();}, 1000);
});



after(function(){
  User.remove({email:'abc@gmail.com'},function(err){
  if(err) {
     console.log(err);
     throw err;}});

  server.close();
});

describe("Feature 1: test of successful functionality ", function(){
    
    it("should allow seeing a newly registered user to login", async function() {
        var cj = rp.jar();
        var result = await rp({
            followAllRedirects: true,
            method: "POST",
            uri: 'http://localhost:8080/home',
            resolveWithFullResponse: true,
            form: {
                email: "abc@gmail.com",
                password: "a"
                },
            jar: cj
        });

        assert(result.body.search("You have logged in using abc@gmail.com.") >= 0);
        }); 
    });

    describe("Feature 1: test of failure functionality ", function(){
        it("should not allow user to sign up with existing email id",async function(){
        var cj=rp.jar();
        var result = await rp({
            followAllRedirects:true,
            method: "POST",
            uri: 'http://localhost:8080/signup',
            resolveWithFullResponse: true,
            form: {
                first_name: "Alpha",
                last_name: "Beta",
                email: "abc@gmail.com",
                password: "q",
                confirmPassword: "q",
                dob: "12/12/1992",
                gender: "M"
            },
            jar: cj
          });

        assert(result.body.search("Email already exists.")>=0);

      });

  }); 

});