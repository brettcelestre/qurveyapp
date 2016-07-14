// callbacks used by /seed routes

// models imported to interact with db
var makeUsers = require('./userFactory.js');
var User = require('../users/usersModel.js');
var Question = require('../questions/questionsModel.js');
var Answer = require('../answers/answersModel.js');
var Q = require('q');

module.exports = {

  // make 100 robot users with random traits using userFactory.js
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

  // make 10 robot questions
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

  // make ~800 robot answers
  sproutAnswers: function(req, res) {
    
    var userP = User.find({})
      .exec(function(err, us) {
        if (err) {
          Q.reject(err);
        } {
          Q.resolve(us);
        }
      });
    var questionP = Question.find({})
      .limit(10)
      .exec(function(err, qs) {
        if (err) {
          Q.reject(err);
        } {
          Q.resolve(qs);
        }
      });

    Q.all([userP, questionP])
      .then(function(results) {
        var users = results[0];
        var questions = results[1];
        for (var i = 0; i < users.length; i++) {
          for (var j = 0; j < questions.length; j++) {
            answerKey = {
              0: ['a', 'bleep'],
              1: ['b', 'bloop'],
              2: ['c', 'blorp']
            };
            var random = Math.floor(Math.random() * 4);
            if (random === 3) {
              continue;
            }
            if (users[i].traits.indexOf('traditional') !== -1) {
              console.log('trad')
              var text = answerKey[0][1];
              var index = answerKey[0][0];
            } else if (users[i].traits.indexOf('anxious') !== -1) {
              var text = answerKey[1][1];
              var index = answerKey[1][0];
            } else if (users[i].traits.indexOf('warm') !== -1) {
              var text = answerKey[2][1];
              var index = answerKey[2][0];
            } else {
              var text = answerKey[random][1];
              var index = answerKey[random][0];
            }
            var answerObj = {
              user: users[i]._id,
              question: questions[j]._id,
              text: text,
              responseIndex: index
            };
            newAnswer = new Answer(answerObj);
            newAnswer.save(function(err, a) {
              if(err) {
                console.error(err);
              } else {

              }
            });
          }
        }
        res.send('done');
      });

  }
};