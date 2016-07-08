var mongoose = require('mongoose');
var User = require('../users/usersModel.js');

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
  },

  // array of Answer._id
  answerObjs: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
});

// pre save middleware to add question to user's array of questions
QuestionSchema.post('save', function(doc) {
  console.log('in Q pre save');

  // update question
  User.update({_id: doc.user}, {$push: {questionsAsked: doc._id}})
  .exec(function() {
    return;
  });
});

module.exports = mongoose.model('Question', QuestionSchema);