var express = require('express');
var middleware = require('./config/middleware.js');


var app = express();

//SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log('qurvey is listening on ' + PORT);



module.exports.app = app;