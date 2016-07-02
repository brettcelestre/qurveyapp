var usersCtrl = require('./usersCtrl.js');

module.exports = function (app) {

  app.route('/')
    .get(usersCtrl.allUsers)
    .post(usersCtrl.newUser)


};