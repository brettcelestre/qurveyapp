var Question = require('./questionsModel.js');
var User = require('../users/usersModel.js');

module.exports = {
  allQuestions: function(req, res) {
    User.find({username: 'Second'}, function(err, User) {
      console.log(User);
      Question.find({user: User._id}, function(err, Question) {
        console.log(Question);
        res.send(Question); 
      });
    });
  },
  newQuestion: function(req, res) {

    // TODO CONNECT SESSION TO GET USER INFO FOR NEW QUESTION
    User.findOne({username: 'Second'}, function(err, User) {
      console.log(User);
      req.body.user = User._id;
    // END TODO
      var newQuestion = new Question(req.body);
      newQuestion.save(function(err, newQuestion) {
        if (err) {
          res.send(err);
          return console.error(err);
        }

        res.send(newQuestion);
      });
      
    });
  }
};