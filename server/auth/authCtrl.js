// callbacks used by /auth routes

// models imported to interact with db
var User = require('../users/usersModel.js');

module.exports = {

  // check if session exists, and updates seeion.user if it does,
  // otherwise redirect to '/'
  checkSession: function(req, res) {
    // console.log('checkSession ran | req.session: ', req.session);
    if (req.session.user) {
      User.findOne({username: req.session.user.username})
        .populate('questionsAnswered')
        .populate('questionsAsked')
        .exec(function(err, user) {
          if (err) {
            console.error(err);
          } else {
            req.session.user = user;
            res.send(req.session.user);
          }
        });
    } else {
      res.redirect('/');
    }
  },

  // login user to app
  login: function(req, res) {
    // login info 
    var username = req.body.username;
    var plainPassword = req.body.password;

    // query db for user
    User.findOne({username: username})
    .populate('questionsAnswered')
    .populate('questionsAsked')
      .exec(function(err, user) {
        if (!user) {
          res.status(404).send({error: 'user not found'});
        } else {
          return user.comparePasswords(plainPassword)
          .then(function(foundUser) {
            if (!foundUser) {
              res.status(404).send({error: 'password does not match'});
            } else {
              // console.log('user was found: ', user);
              req.session.regenerate(function() {
                req.session.user = user;
                res.send(user);
              });

            }
          });
        }
      });
  },

  // create new user and login
  signup: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (err) {
        res.send(err);
        return console.error(err);
      } else {
        req.session.regenerate(function() {
          req.session.user = user;
          res.status(201).send(user);
        });  
      }
    });
  },

  // logout, destroy session
  logout: function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  }
};