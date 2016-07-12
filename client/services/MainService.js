
angular.module('qurvey.services')

.service('Main', ['$http', function($http) {
  
  var userID = '';
  
  // Sends GET req to /auth/checkSession to retrieve current user data
  var currentUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/checkSession/'
    }).then(function(data) {
      userID = data.data.username;
      return data;
    }, function(error) {
      return error;
    });
  };
  
  var logout = function() {
    return $http({
      method: 'GET',
      url: '/auth/logout/'
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    userID: userID,
    currentUser: currentUser,
    logout: logout
  };
  
}]);