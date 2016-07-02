var routes = require('./routes.js');
var bodyParser = require('body-parser');
var request = require('request');



module.exports = function (app, express) {
  
  //routes for client
  var usersRouter = express.Router();
  var questionsRouter = express.Router();
  var answersRouter = express.Router();
  var authRouter = express.Router();

  app.use('/api/users', usersRouter);
  app.use('/api/questions', questionsRouter);
  app.use('/api/answers', answersRouter);
  app.use('/auth', authRouter);



  //parse json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //serve index
  app.use(express.static(__dirname + '/../../client'));

  // inject routes
  require('../users/usersRoutes.js')(usersRouter);
  require('../questions/questionsRoutes.js')(questionsRouter);
  require('../answers/answersRoutes.js')(answersRouter);
  require('../auth/authRoutes.js')(authRouter);
};