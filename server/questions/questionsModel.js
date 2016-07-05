var mongoose = require('mongoose')

// schema for question
var QuestionSchema = new mongoose.Schema({

  // question string
  question: {
    type: String,
    required: true,
    unique: true
  },

  // user who asked the question
  // user: [UserSchema],

  // response options (answers)
  
});

module.exports = mongoose.model('Question', QuestionSchema);