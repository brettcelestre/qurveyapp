var Answer = require('./answersModel.js');
var Question = require('../questions/questionsModel.js');
var User = require('../users/usersModel.js');


module.exports = {
  allAnswers: function(req, res) {
    Answer.find({})
    .populate('user', 'traits')
    .populate('question', 'question')
    .exec(function(err, Answers) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(Answers);
      }
    });
  },
  newAnswer: function(req, res) {
    var newAnswer = new Answer(req.body);
    newAnswer.save(function(err, newAnswer) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(newAnswer);
      }
    });
  }
};