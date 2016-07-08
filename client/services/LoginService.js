
angular.module('qurvey.services')

.service('Login', ['$http', function($http) {
  
  // Sends POST req to /auth/login with username and password
  var login = function(data) {
    return $http({
      method: 'POST',
      url: '/auth/login/',
      data: JSON.stringify(data)
      // data: data
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    login: login,
  };
  
}]);