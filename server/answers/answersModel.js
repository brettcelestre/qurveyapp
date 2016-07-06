var mongoose = require('mongoose')

// schema for answer
var AnswerSchema = new mongoose.Schema({

  // answer
  answer: {
    type: String,
    required: true,
    unique: true
  },

  user: [UserSchema],

  
  
});