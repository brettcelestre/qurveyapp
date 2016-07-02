var authCtrl = require('./authCtrl.js');

module.exports = function (app) {

  app.route('/login')
    .post(authCtrl.login)
  app.route('/signup')
    .post(authCtrl.signup)


};