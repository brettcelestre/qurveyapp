// routes with api/seed prefix


var seedCtrl = require('./seedCtrl.js');

module.exports = function(app) {

  app.route('/plant')
    .get(seedCtrl.plantUsers)
  app.route('/grow')
    .get(seedCtrl.growQuestions)
  app.route('/sprout')
    .get(seedCtrl.sproutAnswers)
};