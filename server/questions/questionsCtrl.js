// callbacks used by /questions routes

// models imported to interact with db
var Question = require('./questionsModel.js');
var User = require('../users/usersModel.js');

module.exports = {

  // return all questions in db
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

  // add question to db
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
  },

  // return questions sorted by most votes; limit 25
  topQuestions: function(req, res) {
    Question.find({})
    .sort({'totalVotes': -1})
    .limit(25)
    .populate('user', 'username')
    .exec(function(err, Questions) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.send(Questions);
      }
    });
  }
};