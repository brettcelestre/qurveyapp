// routes with /auth prefix

var authCtrl = require('./authCtrl.js');

module.exports = function (app) {

  app.route('/login')
    .post(authCtrl.login)
  app.route('/signup')
    .post(authCtrl.signup)
  app.route('/checkSession')
    .get(authCtrl.checkSession)
  app.route('/logout')
    .get(authCtrl.logout)


};