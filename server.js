var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require("mongoose");
var logger = require('morgan');
var passport = require('passport')
var session = require('express-session')
var env = require('dotenv').load();

var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/happy-hour-pal", function (err) {
	console.log(err || 'CONNECTED!');
});

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// For Passport 
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());

// var routes = require("");

app.use(routes(passport));

// require('./config/passport/passport.js')(passport, db.user);
