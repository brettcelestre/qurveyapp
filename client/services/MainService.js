
angular.module('qurvey.services')

.service('Main', ['$http', function($http) {
  
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
      // for ( var key in data.data.questionsAnswered ) {
      //   userObject.questionsAnswered.push( data.data.questionsAnswered[key] );  
      // }
      userObject.questionsAsked = data.data.questionsAsked;
      // for ( var key in data.data.questionsAsked ) {
      //   userObject.questionsAsked.push( data.data.questionsAsked[key] );  
      // }
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
    userObject: userObject,
    currentUser: currentUser,
    logout: logout
  };
  
}]);