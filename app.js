var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const signUpRouter = require('./routes/sign-up')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/log-in');
const messagesRouter = require('./routes/messages')
const session = require("express-session");
const passport = require("passport");
const initialize = require('./validators/passportConfig')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const methodOverride = require('method-override')
dotenv.config(); 

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


const maxAge = 1000 * 60 * 60 * 24 // 24 Hours in ms
  
  // Using this b/c I was not able to configure postgres session below
  // const memoryStore = new session.MemoryStore();
  app.use(session({
      // store: memoryStore,
      name: "sid", // custom session id name default is connect.sid
      csrfToken: uuidv4(),
      resave: false,
      saveUninitialized: false,
      secret: process.env.SECRET,
      cookie: {
        maxAge: maxAge, 
        httpOnly: true,
        sameSite: true, // same as 'strict'
        secure: false //IN_PROD //if production set to secure true else false
      }
    }));
  

// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
initialize(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign-up', signUpRouter);
app.use('/log-in', loginRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
