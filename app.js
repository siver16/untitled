var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var search = require('./routes/search');
var add = require('./routes/add');
var add2 = require('./routes/add2');
var edit = require('./routes/edit');
var ejs = require('ejs');
var busboy = require('connect-busboy');
var register = require ('./routes/register');
var messages = require('./lib/messages');
var login = require('./routes/login');
var user = require('./lib/middleware/user');

var session = require('express-session');
var app = express();

// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(user);
app.use(messages);
app.use(busboy());
app.get('/login',login.form);
app.post('/login',login.submit);
app.get('/logout',login.logout);
app.use('/', routes);
app.use('/search',search);
app.use('/add',add);
app.use('/add2',add2);
app.use('/edit',edit);
app.use('/register',register);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
