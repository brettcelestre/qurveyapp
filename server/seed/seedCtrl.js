var makeUsers = require('./userFactory.js');
var User = require('../users/usersModel.js');
var Question = require('../questions/questionsModel.js');
var Answer = require('../answers/answersModel.js');

module.exports = {

  plantUsers: function(req, res) {
    var users = makeUsers(100);
    for (var i = 0; i < users.length; i++) {
      var newUser = new User(users[i]);
      newUser.save(function(err, user) {
        if (err) {
          res.send(err);
          return console.error(err);
        } else {
        }
      });
    }
    res.send('done');
  },

  growQuestions: function(req, res) {
    var users = [];
    User.find({})
    .limit(10)
    .exec(function(err, users) {
      if (err) {
        console.error(err);
      } else {
        users = users;
        for (var i = 0; i < users.length; i++) {
          var qInfo = {
            question: 'bleep, bloop, blorp, ' + i + '',
            answers: {
              a: 'bleep',
              b: 'bloop',
              c: 'blorp'
            },
            user: users[i]._id
          };
          newQuestion = new Question(qInfo);
          newQuestion.save(function(err, q) {
            if (err) {
              console.error(err);
            } else {
            }
          });
        }
        res.send('done');
      }
    });
  },

  sproutAnswers: function(req, res) {
    var users = [];
    var questions = [];
    User.find({})
    .exec(function(err, us) {
      if (err) {
        console.error(err);
      } else {
        users = us;
        Question.find({})
        .exec(function(err, qs) {
          if (err) {
            console.error(err);
          } else {
            questions = qs;
            for (var i = 1; i < users.length; i++) {
              for (var j = 0; j < questions.length; i++) {
                var choiceOptions = [['a', 'bleep'], ['b', 'bloop'], ['c', 'blorp']];
                var choice = choiceOptions[Math.floor(Math.random() * 3)];
                var aInfo = {
                  user: users[i],
                  question: questions[j],
                  responseIndex: choice[0],
                  text: choice[1]
                };
              }
            }
          }
        })
      }
    });
    res.send('done');
  }
};