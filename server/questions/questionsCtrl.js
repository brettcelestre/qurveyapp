var Question = require('./questionsModel.js');
module.exports = {
  allQuestions: function(req, res) {
    res.send('allQuestions');
  },
  newQuestion: function(req, res) {
    console.log(req.body);
    var newQuestion = new Question(req.body);
    newQuestion.save(function(err, newQuestion) {
      if (err) {
        return console.error(err);
      }

    });
    res.send(newQuestion);
  }
}