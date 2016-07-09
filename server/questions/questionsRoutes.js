var questionsCtrl = require('./questionsCtrl.js');

module.exports = function (app) {

  app.route('/')
    .get(questionsCtrl.allQuestions)
  app.route('/ask')
    .post(questionsCtrl.newQuestion)


};