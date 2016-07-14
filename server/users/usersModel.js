// model for User documents in db
// and any middleware used with this model

var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

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

  // salt for password hashing
  salt: String,

  // traits array
  traits: [String],

  // array of questions ASKED by this user
  questionsAsked: [{type: Schema.Types.ObjectId, ref: 'Question'}],

  // array of answers to questions answered by this user
  questionsAnswered: [{type: Schema.Types.ObjectId, ref: 'Answer'}],

  // date created
  createdAt: {
    type: Date,
    default: new Date()
  }
  
});

// use for login to check password
UserSchema.methods.comparePasswords = function (plainPassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(plainPassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

// on signup generate salt and hash plaintext password 
UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // override the plaintext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
