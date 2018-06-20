var mongoose = require('mongoose');
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./database/db');
require('./api/config/passport');

var routesApi = require('./api/routes/index');

var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res ){
    res.sendFile(path.join( __dirname, 'dist/index.html'));
});

app.use('/api',routesApi);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


var server = http.createServer(app);

server.listen(3000);
