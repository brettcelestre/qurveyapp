// routes with api/graph prefix

var graphCtrl = require('./graphCtrl.js');

module.exports = function(app) {

  app.route('/')
    .get(graphCtrl.allGraph)
    .post(graphCtrl.qGraph)

};