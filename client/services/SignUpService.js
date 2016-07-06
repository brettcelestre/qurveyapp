
angular.module('qurvey.services')

.service('SignUp', function($http) {
  
  var signUp = function(data) {
    console.log('SignUp service: login = ', data)
    return $http({
      method: 'POST',
      url: '/auth/singup/',
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
