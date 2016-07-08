var mongoose = require('mongoose');
var Question = require('../questions/questionsModel.js');

// schema for answer
var Schema = mongoose.Schema;
var AnswerSchema = new Schema({

  // answer to question
  answer: {
    // test of answer
    text: {
      type: String,
      required: true
    },
    // index of response [a-e]
    responseIndex: {
      type: String,
      required: true
    }
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
  }

});

// post save middleware to increment response total of question
AnswerSchema.pre('save', function(next) {

  // update question
  Question.update({_id: this.question}, {$inc: {["responses." + this.answer.responseIndex]: 1}})
  .exec(function() {
    next();
  });
});

module.exports = mongoose.model('Answer', AnswerSchema);