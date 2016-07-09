var User = require('../users/usersModel.js');

module.exports = {

  // check if session exists
  checkSession: function(res, req) {
    if (req.session.user) {
      res.send(req.session.user);
    } else {
      res.redirect('/');
    }
  },

  login: function(req, res) {
    // login info 
    var username = req.body.username;
    var plainPassword = req.body.password;

    // query db for user
    User.findOne({username: username})
      .exec(function(err, user) {
        if (!user) {
          res.status(404).send({error: 'user not found'});
        } else {
          return user.comparePasswords(plainPassword)
          .then(function(foundUser) {
            if (!foundUser) {
              res.status(404).send({error: 'password does not match'});
            } else {
              req.session.regenerate(function() {
                req.session.user = user;
                res.send(user);
              });
            }
          });
        }
      });
  },

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