
const secretkey = require('../config').PRIVATE_KEY;
const jwt = require('jsonwebtoken');

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space [Bearer <access_token>]
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const Token = bearer[1]; //<access_token>
      // verify the token
      console.log(Token);
  
      jwt.verify(Token, secretkey , (err, authData) => {
          if(err) {
              console.log(err);
             res.sendStatus(403);
          } else {
             // Next middleware
             console.log(authData);
             next();
          }
      });
     
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

  module.exports = verifyToken;
  