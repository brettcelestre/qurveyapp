// routes with api/questions prefix

var statisticsCtrl = require('./statisticsCtrl.js');

module.exports = function (app) {

  app.route('/answer')
    .post(statisticsCtrl.answerStatistics)
  app.route('/usersAnswersQuestions')
    .post(statisticsCtrl.userAnswersQuestions)

};