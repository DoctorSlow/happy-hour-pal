// var db = require("./models");
var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require("mongoose");
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var routes = require("./routes");
var env = require('dotenv').load();

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// For Passport 
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// app.use(routes(passport));
app.use(routes);
// require('./config/passport/passport.js')(passport, db.user);


// Connect to the deployed or local Mongo DB
var MongoDB = process.env.MONGODB_URI || "mongodb://localhost/nytreact";

mongoose.connect(MongoDB, function (err) {
	console.log(err || 'CONNECTED!');
});