// model for Question documents in db
// and any middleware used with this model

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
  
  // question search string
  questionSearch: {
    type: String,
    default: ''
  },

  // user who asked the question
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
      default: ''
    },
    d: {
      type: String,
      default: ''
    },
    e: {
      type: String,
      default: ''
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
    },

    // neutral keeps track of people who elect not to choose one of the provided responses
    neutral: {
      type: Number,
      default: 0
    }
  },

  // array of Answer._id
  answerObjs: [{type: Schema.Types.ObjectId, ref: 'Answer'}],

  // total votes
  totalVotes: {
    type: Number,
    default: 0
  },

  // timestamp when created
  createdAt: {
    type: Date,
    default: new Date()
  }
});

QuestionSchema.pre('save', function(next) {
  // Saves a lowercase version of the question for searching
  var lowercase = this.question.toLowerCase();
  // Updates questionSearch property with lowercase question
  this.questionSearch = lowercase;
  next();
});

// pre save middleware to add question to user's array of questions
QuestionSchema.post('save', function(doc) {

  // update question
  User.update({_id: doc.user}, {$push: {questionsAsked: doc._id}})
  .exec(function() {
    return;
  });
});

module.exports = mongoose.model('Question', QuestionSchema);