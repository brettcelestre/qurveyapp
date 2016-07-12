var mongoose = require('mongoose');
var Question = require('../questions/questionsModel.js');
var User = require('../users/usersModel.js');

// schema for answer
var Schema = mongoose.Schema;
var AnswerSchema = new Schema({

  // text of answer
  text: {
    type: String,
    required: true
  },

  // index of response [a-e]
  responseIndex: {
    type: String,
    required: true
  },

  // user who answered question
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  // question that was answered by user
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Question'
  },

  // time answer was created
  createdAt: {
    type: Date,
    default: new Date()
  }

});

// pre save middleware to increment response total of question
AnswerSchema.pre('save', function(next) {

  // update question
  Question.update({_id: this.question}, {$inc: {["responses." + this.responseIndex]: 1}, $push: {answerObjs: this._id}})
  .exec(function() {
    next();
  });
});
// pre save middleware to add answerId to user list of questions answered
AnswerSchema.pre('save', function(next) {

  // update question
  User.update({_id: this.user}, {$push: {questionsAnswered: this._id}})
  .exec(function() {
    next();
  });
});

module.exports = mongoose.model('Answer', AnswerSchema);