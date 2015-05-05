"use strict";

//Include our node modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//App variables
var PORT = 8000;

//Start app
var app = express();

//Body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middleware to handle building body data
app.use (function(req, res, next) {
  var data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) { 
     data += chunk;
  });

  req.on('end', function() {
      req.body = data;
      next();
  });
});

//Connect to the database
mongoose.connect('mongodb://localhost/tipsapp');

//Verify connection to mongo server
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Successfully connected to DB");
});

//Models
var Tip = require('./api/models/tips.js');

//Routers
var TipRouter = require('./api/routers/tips.js');
app.use('/', TipRouter);

//Run our app on the specified port
app.listen(PORT);
console.log('Tips API server running');
