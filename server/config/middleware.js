//var routes = require('./routes.js');
var bodyParser = require('body-parser');
var request = require('request');



module.exports = function (app, express) {
  
  //routes for client
  var userRouter = express.Router();
  var questionRouter = express.Router();


  //parse json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //serve index
  app.use(express.static(__dirname + '/../../client'));
};