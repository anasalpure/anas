const router = require('express').Router();
const verifyToken = require ('../middleware/Auth_JWT');
const jwt = require('jsonwebtoken');
const secretkey = require('../config').PRIVATE_KEY;

/*
 * basr_URL : /api
 */

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to  API 2'
  });
});
/**
 * this url is protected
 * @verifyToken is middleware
 */

router.post('/posts', verifyToken, (req, res) => { 
  res.json({
    message: 'Post created...',
  });
});


router.post('/login', (req, res) => {
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com',
    admin:1
  }

  jwt.sign({user}, secretkey , (err, token) => {
    res.json({
      token
    });
  });
});


module.exports = router;
