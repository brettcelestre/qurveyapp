var Question = require('./questionsModel.js');
var User = require('../users/usersModel.js');

module.exports = {
  allQuestions: function(req, res) {
    Question.find({})
    .populate('user', 'username')
    .exec(function(err, Questions) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(Questions);
      }
    });
  },
  newQuestion: function(req, res) {

    var qInfo = req.body;
    qInfo.user = req.session.user._id;
    var newQuestion = new Question(qInfo);
    newQuestion.save(function(err, newQuestion) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(newQuestion);
      }
    });
  }
};