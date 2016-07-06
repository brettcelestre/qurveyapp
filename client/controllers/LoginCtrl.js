

angular.module('qurvey.controllers')

.controller('LoginController', function($scope, $state, Login) {
  
  $scope.username = '';
  $scope.password = '';
  
  $scope.validPassword = false;
  
  // 
  $scope.userLogin = function(username, password){
    // Clears input
    $scope.username = '';
    $scope.password = '';
    // Creates login info object to send to API
    var userInfo = { 
      username: username,
      password: password
    };
    // Calls /auth/login POST with userInfo
    Login.login(userInfo)
      .then(function(data){
        console.log('then data: ', data);
        // If vaildUser is true, change state to questions
        $state.go('questions');
        // Else
        // Display 'Invalid user error'
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  };

  $scope.signUp = function(){
    // Changes state to signup
    $state.go('signup');
  };

});