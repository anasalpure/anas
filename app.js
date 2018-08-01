const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('csurf')
const Helpers=require('./Helpers');

const app = express();

var cookie = cookieParser();
var parseForm = bodyParser.urlencoded({ extended: false })

const api = require('./api/users');
app.use('/api', api);


app.get('/remotedata', (req, res) => {
  let query = req.query.q ;
  query= query ? query : "anas";
  Helpers.search(query , (data)=>{  res.json(data) });
});

/**
 * CSRF Middleware
 */
//app.use(csrf()) //{ cookie: true }
var csrfProtection = csrf({ cookie: true });


app.get('/csrf', cookie, csrfProtection ,  (req, res)=> {
  console.log(req.csrfToken() );
  res.json({  csrfToken: req.csrfToken()  })
});

// we  use bodybarser as middleware 
app.post('/csrf_check', cookie , parseForm , csrfProtection ,  function (req, res) {
  //let data = parseJSON(req);
  res.json({  message : "asamdsn" })

})


/**
 * cookieParser 
 */
app.get('/coo', cookie ,  function(req, res) {
  console.log('Cookies: ', req.cookies);
  res.json({   message: 'cookie...',  })
});



/**
 * Set static folder
 */
  app.use(express.static('../build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });



const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server started on port '+port));