var mongoose = require('mongoose');

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

module.exports = mongoose.model('Answer', AnswerSchema);