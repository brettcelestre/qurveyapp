var mongoose = require('mongoose');

// schema for question
var Schema = mongoose.Schema;
var QuestionSchema = new Schema({

  // question string
  question: {
    type: String,
    required: true,
    unique: true
  },

  // user who asked the question
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  // response options (answers)
  answers: {
    a: {
      type: String,
      required: true
    },
    b: {
      type: String,
      required: true
    },
    c: {
      type: String,
      required: true
    },
    d: {
      type: String,
      default: null
    },
    e: {
      type: String,
      default: null
    }
  },

  // number of responses - correspond with answers
  responses: {
    a: {
      type: Number,
      default: 0
    },
    b: {
      type: Number,
      default: 0
    },
    c: {
      type: Number,
      default: 0
    },
    d: {
      type: Number,
      default: 0
    },
    e: {
      type: Number,
      default: 0
    }
  }

});

module.exports = mongoose.model('Question', QuestionSchema);