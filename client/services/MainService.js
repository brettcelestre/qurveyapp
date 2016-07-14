
angular.module('qurvey.services')

.service('Main', ['$http', function($http) {
  
  // Stores users data, is used for profile view and filtering feed data
  var userObject = {
    username: '',
    userID: '',
    traits: [],
    questionsAnswered: [],
    questionsAsked: []
  };
  
  // Sends GET req to /auth/checkSession to retrieve current user data
  var currentUser = function() {
    return $http({
      method: 'GET',
      url: '/auth/checkSession/'
    }).then(function(data) {
      // Below stores users data into userObject
      userObject.username = data.data.username;
      userObject.userID = data.data._id;
      userObject.traits = data.data.traits;
      userObject.questionsAnswered = data.data.questionsAnswered;
      userObject.questionsAsked = data.data.questionsAsked;
      return data;
    }, function(error) {
      return error;
    });
  };
  
  // Sends GET req to /auth/logout/
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
    userObject: userObject,
    currentUser: currentUser,
    logout: logout
  };
  
}]);