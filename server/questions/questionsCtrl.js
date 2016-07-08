var Question = require('./questionsModel.js');
var User = require('../users/usersModel.js');

module.exports = {
  allQuestions: function(req, res) {
    Question.find({})
    .populate('user')
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

    // TODO CONNECT SESSION TO GET USER INFO FOR NEW QUESTION
    // END TODO
    var newQuestion = new Question(req.body);
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