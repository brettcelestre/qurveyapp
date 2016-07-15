// configure express server with parser, static server, and routes

var bodyParser = require('body-parser');


// export to be used by server.js
module.exports = function (app, express) {
  
  // parse json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // serve index
  app.use(express.static(__dirname + '/../../client'));
  
  // routes for client

  // Instantiate routers
  var usersRouter = express.Router();
  var questionsRouter = express.Router();
  var answersRouter = express.Router();
  var authRouter = express.Router();
  var graphRouter = express.Router();
  var seedRouter = express.Router();
  var searchRouter = express.Router();

  // Set up routes for each router
  app.use('/api/users', usersRouter);
  app.use('/api/questions', questionsRouter);
  app.use('/api/answers', answersRouter);
  app.use('/auth', authRouter);
  app.use('/api/graph', graphRouter);
  app.use('/api/seed', seedRouter);
  app.use('/api/search', searchRouter);

  // Require and inject routes
  require('../users/usersRoutes.js')(usersRouter);
  require('../questions/questionsRoutes.js')(questionsRouter);
  require('../answers/answersRoutes.js')(answersRouter);
  require('../auth/authRoutes.js')(authRouter);
  require('../graph/graphRoutes.js')(graphRouter);
  require('../seed/seedRoutes.js')(seedRouter);
  require('../search/searchRoutes.js')(searchRouter);

};