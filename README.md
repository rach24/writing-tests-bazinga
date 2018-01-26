# CS 491 Secure Web Dev HomeWork 1 - a basic CRUD app
  We have created a basic CRUD app along the guidlines provided.

## Application
  We have followed the MVC architecture for this app. We have separated out the data,presentarion and business logic layers into 'model','views' and 'controllers' folders respectively. We have also created a single .js file to hold all the routes of this application for maintainability.

  ![Alt text](http://i67.tinypic.com/n52dzn.jpg "Optional title")

  We referred the threat models documentation share at- https://msdn.microsoft.com/en-us/library/ff648644.aspx, and as per our understaning we have cited the potential risks that the application might face
    
###Threat model

    1. Risk: User can sign-in with incorrect details
    Solution: we have used authentication on both server and client side. Eg- a user need to have a valid email address which matches with the corresponding password set during the registration.

    2. Risk: nasty user can use <script> during registration
    Solution: use of express validator for sanitization of inputs. However, sanitize is not working properly. Still debugging it.

    3. Risk: Any user can edit other user's profile
    Solution: Made use of express session to prevent users from editing anyone else's profiles

    4. Risk: Private posts can be seen by unauthorised users
    Solution: Used sessions to check if the user is a authentic user and then depending on post visibility rules render the post accessible or unaccessible 

    5. Risk: Any user can delete other user's post
    Solution: Used sessions to hold user id and used it to prevent other user's from deleting another user's posts

### Application design
    
    The design of our app is as follows:

     We have a registration page and a sign in page. All new users need to sign in before they can proceed.
    
     On logging in, user is taken to home page which shows the user's details.
    
     On the home pahe we have links to a) Edit Profile, b) create Post c) view Posts
    
     On clicking on view posts - URLs of all the posts are listed.
    
     On clicking on the post link the particular Post can be viewed.
    
     When on a particular Post page, the post can be deleted.


## Extra modules
    
    1. express generator : with view template pug
    2. express validator : we have used this middleware for server side input validation. From what we saw, the most helpful use of the                        filter API sanitize() with escape() to thwart XSS attacks.
    3. mongoose          : We have used MongoDB to store and Mongoose ODM to access application data.
                           Installing Mongoose adds all its dependencies, including the MongoDB database driver, but it does install MongoDB itself. There is no need to install mongoDb separately as we have used mLab's free cloud-hosted "sandbox" database for this application.
    4. nodemon           : Used to ease development as it will keep checking the code and will restart the server everytime code is     
                           saved. 
    5. session           : We have used this middleware to authenticate user by creating sessions and holding session info in cookies


## Working :
    
    Run the basic commands:
    1. npm install
    2. npm start


## Feature Implementation
    
    1. Task 1: Allows visitors to register a new account with some basic user information which is visible on a user profile page -
      Contributer: Sreetama Banerjee
    2. Task 2: Allows users to edit their own profile -
      Contributer: Rachita Gupta
    3. Task 3: Allows users to create new “posts” which each have their own unique URL -
      Contributer: Aakash Barve
    4. Task 4: Allows users to restrict their post visibility beyond “all visitors to the web app” -
      Contributer: Aakash Barve
    5. Task 5: Allows users to view posts by other users according to visibility rules -
      Contributer: Sreetama Banerjee
    6. Task 6: Allows users to delete their own posts -
      Contributer: Rachita Gupta

## References

    1. http://mongoosejs.com/docs/connections.html
    2. https://github.com/expressjs/session
    3. https://www.npmjs.com/package/express-session
    4. https://github.com/ctavan/express-validator
    5. https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose




