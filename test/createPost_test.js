const rp=require('request-promise');
const assert=require('assert');
var User=require('../model/users');
var Post = require('../model/posts');

describe("Create Post",function(){
    var app,server;
beforeEach(function(done){ 
    app=require('../app.js');
    server=app.listen(8080);
    done();
});

afterEach(function(){
    User.remove({email:'user@gmail.com'},function(err){
        if(err) {
            console.log(err);
            throw err;}
    });
    server.close();
    });
   describe("Feature 3: Test of successful functionality ", function(){
    it("should allow user to create post", async function() {
        var cj = rp.jar();
        await rp({
            followAllRedirects:true,
            method: "POST",
            uri: 'http://localhost:8080/signup',
            resolveWithFullResponse: true,
            form: {
                first_name: "user",
                last_name: "last",
                email: "user@gmail.com",
                password: "1",
                confirmPassword: "1",
                dob: "11/08/1993",
                gender: "M"
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
              email: "user@gmail.com",
              password: "1"
            },
            jar: cj
          });
          setTimeout(function(){
          }, 20000);
        
        var result = await rp({
            followAllRedirects: true,
            method: "POST",
            uri: "http://localhost:8080/create",
            resolveWithFullResponse: true,
            form: {
                user_post : "User has created a post",
                email: "user@gmail.com",
                hide: "Yes",  
            },
            jar: cj
          });
          assert(result.body.search("Post is successful") >= 0);
        }); 
      });
      describe("Feature 3: Test of failure functionality ",function(){
        it("Not allow user to submit blank post",async function(){
          var cj = rp.jar();
          await rp({
              followAllRedirects:true,
              method: "POST",
              uri: 'http://localhost:8080/signup',
              resolveWithFullResponse: true,
              form: {
                  first_name: "user",
                  last_name: "last",
                  email: "user@gmail.com",
                  password: "1",
                  confirmPassword: "1",
                  dob: "11/08/1993",
                  gender: "M"
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
                email: "user@gmail.com",
                password: "1"
              },
              jar: cj
            });
            setTimeout(function(){
            }, 20000);
          
          var result = await rp({
              followAllRedirects: true,
              method: "POST",
              uri: "http://localhost:8080/create",
              resolveWithFullResponse: true,
              form: {
                  user_post : "",   // post is blank
                  email: "user@gmail.com",
                  hide: "Yes",  
              },
              jar: cj
            });
            assert(result.body.search("Input Error") >= 0);    
        });
    }); 
     describe("Feature 4: Test of passing functionality ",function(){
            it("If hide is checked then hide is on",async function(){
              var cj = rp.jar();
              await rp({
                  followAllRedirects:true,
                  method: "POST",
                  uri: 'http://localhost:8080/signup',
                  resolveWithFullResponse: true,
                  form: {
                      first_name: "user",
                      last_name: "last",
                      email: "user@gmail.com",
                      password: "1",
                      confirmPassword: "1",
                      dob: "11/08/1993",
                      gender: "M"
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
                    email: "user@gmail.com",
                    password: "1"
                  },
                  jar: cj
                });
                setTimeout(function(){
                }, 20000);
              
              var result = await rp({
                  followAllRedirects: true,
                  method: "POST",
                  uri: "http://localhost:8080/create",
                  resolveWithFullResponse: true,
                  form: {
                      user_post : "The hide is on",
                      email: "user@gmail.com",
                      hide: "Yes",
                  },
                  jar: cj
                });
                assert(result.body.search("The hide is Yes") >= 0);    
            });
        });
    });
