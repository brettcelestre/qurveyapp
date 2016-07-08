var mongoose = require('mongoose');

// schema for user
var Schema = mongoose.Schema;
var UserSchema = new Schema({

  // username
  username: {
    type: String,
    required: true,
    unique: true
  },

  // password
  password: {
    type: String,
    required: true
  },

  // traits array
  traits: [String],

  // array of questions ASKED by this user
  questionsAsked: [{type: Schema.Types.ObjectId, ref: 'Question'}],

  // array of questions answered by this user
  questionsAnswered: [{type: Schema.Types.ObjectId, ref: 'Question'}]
  
});

module.exports = mongoose.model('User', UserSchema);
