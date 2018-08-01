//var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');


// setup route middlewares
var csrfProtection = csrf()
var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express()
/*
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
*/
// parse cookies
// we need this because "cookie" is true in csrfProtection
//app.use(cookieParser())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    //res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  req.session
  console.log(req.csrfToken() );
  res.json({ csrfToken: req.csrfToken() })
})

app.post('/process', parseForm  ,  function (req, res) {
  console.log(req.session , req.session.id)
  res.send('data is being processed')
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server started on port '+port));