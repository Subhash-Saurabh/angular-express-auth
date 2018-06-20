var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var profile = require('../profile');
var login = require('../login');
var register = require('../register');

// profile
router.get('/profile', auth, profile.profileRead);

// authentication
router.post('/register', register.register);
router.post('/login', login.login);

module.exports = router;