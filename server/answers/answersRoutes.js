var answersCtrl = require('./answersCtrl.js');

module.exports = function (app) {

  app.route('/')
    .get(answersCtrl.allAnswers)
    .post(answersCtrl.newAnswer)


};
