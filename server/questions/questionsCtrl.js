var Question = require('./questionsModel.js');
var User = require('../users/usersModel.js').model;
module.exports = {
  allQuestions: function(req, res) {
    res.send('allQuestions');
  },
  newQuestion: function(req, res) {
    console.log(req.body);
    User.findOne({}, function(err, User) {
      console.log(User);
      req.body._user = User._id;
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
}