// main server file run in node or with nodemon to start server

var express = require('express');
var middleware = require('./config/middleware.js');
var mongoose = require('mongoose');

// make mongoose use q promises
mongoose.Promise = require('q').Promise;
var session = require('express-session');
// Connects mongodb to sessions
var MongoStore = require('connect-mongo')(session);




var app = express();

// connection to mongodb
mongoose.connect('mongodb://localhost/qurvey');


// use mongo to store sessions
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: "please don't tell",
  resave: true,
  saveUninitialized: true
}));

// SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log('qurvey is listening on ' + PORT);


// export for use by test
module.exports = app;