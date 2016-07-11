var User = require('./userModel.js');

// makes number of users using User model; outputs array of objects
var makeUsers = function(number) {

  // store users
  var users = [];

  // store traits in array
  traits = ['traditional', 'unconventional', 'disciplined', 'spontaneous', 'introverted', 'extroverted', 'guarded', 'warm', 'anxious', 'relaxed', 'splendid', 'sad', 'confused'];

  // make number of users
  for (var i = 0; i <= number; i++) {
  // create random array of traits
  var userTraits = [];
  while (userTraits.length !== 5) {
    // console.log(userTraits);
    // console.log('randtrait');
    // chose a random number
    var random = Math.floor(Math.random() * traits.length);
    var randomTrait = traits[random];
    // check if trait is in userTraits
    if (userTraits.indexOf(randomTrait) === -1) {
      userTraits.push(randomTrait);
    }
  }
  users.push(new User('robot' + i + '', 'pass', userTraits));
  // console.log('users', users)
  }
  return users;
};

module.exports = makeUsers;