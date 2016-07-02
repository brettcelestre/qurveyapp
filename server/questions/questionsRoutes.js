var questionsCtrl = require('./questionsCtrl.js');

module.exports = function (app) {

  app.route('/')
    .get(questionsCtrl.allQuestions)
    .post(questionsCtrl.newQuestion)


};