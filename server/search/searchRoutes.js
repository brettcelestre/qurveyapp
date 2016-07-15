// routes with /api/search prefix

var searchCtrl = require('./searchCtrl.js');

module.exports = function (app) {

  app.route('/')
    .post(searchCtrl.allResults)


};
