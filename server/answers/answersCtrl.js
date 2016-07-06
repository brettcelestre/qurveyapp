var Answer = require('./answersModel.js');
var Question = require('../questions/questionsModel.js');
var User = require('../users/usersModel.js');


module.exports = {
  allAnswers: function(req, res) {
    Answer.find({})
    .populate('user')
    .populate('question')
    .exec(function(err, Answers) {
      res.send(Answers);   
    });
  },
  newAnswer: function(req, res) {
    // TODO get question that has been aswered
    Question.findOne({}, function (err, Question) {
      req.body.question = Question._id;
      // TODO get user that aswered question -- Session obj?
      User.findOne({}, function(err, User) {
        req.body.user = User._id;
        // END TODOS
        var newAnswer = new Answer(req.body);
        newAnswer.save(function(err, newAnswer) {
          if (err) {
            res.send(err);
            return console.error(err);
          }

          res.send(newAnswer);
        });
      });
    });
    // res.send('newAnswer');
  }
};