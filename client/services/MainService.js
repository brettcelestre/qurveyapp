
angular.module('qurvey.services')

.service('Main', ['$http', '$mdDialog', function($http, $mdDialog) {
  
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

  var confirmAnswer = function(answerText) {
    console.log($mdDialog, 'mdDialog');
        
    //Call the confirm() function to configure the confirmation dialog
    var confirm = $mdDialog.confirm()
        .title('Confirm Your Answer')
        .content('Are you sure you want to choose ' + answerText + '?')
        .ariaLabel('Answer')
        .ok('Answer')
        .cancel('Cancel');
    return $mdDialog.show(confirm);
  };


  return {
    confirmAnswer: confirmAnswer,
    userObject: userObject,
    currentUser: currentUser,
    logout: logout
  };
  
}]);