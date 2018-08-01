var express = require('express')
  , passport = require('passport')
  , flash = require('connect-flash')
  , utils = require('./utils')
  , csrf = require('csurf')
  // setup route middlewares
  ,csrfProtection = csrf({ cookie: true })
  , methodOverride = require('method-override')
  , bodyParser = require("body-parser")
  , parseForm = bodyParser.urlencoded({ extended: false })
  , cookieParser = require('cookie-parser')
  , cookieSession = require('cookie-session')
  , LocalStrategy = require('passport-local').Strategy
  , RememberMeStrategy = require('../..').Strategy;


var app = express();

app.use(csrf());
app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));
app.use(express.logger());
app.use(express.static(__dirname + '../build'));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(flash());
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));
app.use(app.router);
app.use(csrf());

app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});