
angular.module('qurvey.services')

.service('SignUp', function($http) {
  
  // Sends accountInfo to /auth/signup/ route
  var signUp = function(data) {
    return $http({
      method: 'POST',
      url: '/auth/signup/',
      data: JSON.stringify(data)
      // data: data
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    signUp: signUp
  };
  
});
