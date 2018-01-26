var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var flash = require('connect-flash');



//At this point we have just imported the module; we haven't actually used its routes yet 
var index = require('./index');

var app = express();




//setting up mongo DB
var mongoose=require('mongoose');
mongoose.Promise = require('bluebird');
var mongoDB='mongodb://Sree:Anshree22@ds157614.mlab.com:57614/sree_node_demo';
mongoose.connect(mongoDB,{
  useMongoClient : true
});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'DB connection error'));

/*/delete users
mongoose.connection.collections['users'].drop( function(err) {
  //console.log('collection dropped');
});

//delete posts
mongoose.connection.collections['posts'].drop( function(err) {
  //console.log('collection dropped');
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//setting up custom validations
//validator before it gets parsed
app.use(expressValidator({
  customValidators: {
    isEqual: (value1, value2) => {
      return value1 === value2
    },
    isDate: (value1)=> {
      return !isNaN(Date.parse(value1));
    }
  }
}));
app.use(cookieParser());
/** referred from: https://www.npmjs.com/package/express-session
 *  to authenticate user by creating sessions and holding session info in cookies
 */
app.set('trust proxy',1) // trust 1st proxy
app.use(expressSession({
  cookieName: 'session',
  secret:'kanich',
  saveUninitialized: false,
  resave:false}));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
