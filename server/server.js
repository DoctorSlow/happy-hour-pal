
require('dotenv').config()

// Dependencies
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require("mongoose");
const logger = require('morgan');
const passport = require('./passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const routes = require("./routes");
const env = require('dotenv').load();

// const db = require("./models");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
	console.log("Static file server running");
	app.use(express.static("./client/build"));
}

app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/happy-hour-pal", function (err) {
	console.log(err || 'CONNECTED!');
});

//Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ==== if its production environment!
// if (process.env.NODE_ENV === 'production') {
// 	const path = require('path')
// 	console.log('YOU ARE IN THE PRODUCTION ENV')
// 	app.use('/static', express.static(path.join(__dirname, '../build/static')))
// 	app.get('/', (req, res) => {
// 		res.sendFile(path.join(__dirname, '../build/'))
// 	})
// }

/* Express app ROUTING */
app.use('/auth', require('./auth'));
app.use('/', routes);

// ====== Error handler ====
app.use(function (err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// Start the API server
app.listen(PORT, function () {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});