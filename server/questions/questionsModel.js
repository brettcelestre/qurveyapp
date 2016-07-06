var mongoose = require('mongoose');

var Schema = mongoose.Schema;
// schema for question
var QuestionSchema = new Schema({

  // question string
  question: {
    type: String,
    required: true,
    unique: true
  },

  // user who asked the question
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  // response options (answers)
  answer1: String,
  answer2: String,
  answer3: String,
  answer4: String,
  answer5: String


  
});

module.exports = mongoose.model('Question', QuestionSchema);