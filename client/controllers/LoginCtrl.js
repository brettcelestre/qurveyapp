

angular.module('qurvey.controllers')

.controller('LoginController', function($scope, $state, Login) {
  
  // Stores username and password
  $scope.username = '';
  $scope.password = '';
  // State for disabling Login button
  $scope.submitCheck = true;
  
  // Checks if username and password are filled out
  $scope.loginButtonCheck = function(){
    if ( $scope.username.length >= 1 && $scope.password.length >= 1) {
      // Enables Login button
      $scope.submitCheck = false;
    } else {
      // Enables Login button
      $scope.submitCheck = true;
    }
  };
  
  // Sends username and password to /auth/login
  $scope.userLogin = function(){
    // Creates login info object to send to API
    var userInfo = { 
      username: $scope.username,
      password: $scope.password
    };
    // Calls /auth/login POST with userInfo
    Login.login(userInfo)
      .then(function(data){
        console.log('then data: ', data);
        // If vaildUser is true, change state to questions
          // Change state to questions
          $state.go('questions');
        // Else
          // Display 'Invalid user error'
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
      
    // Clears input
    $scope.username = '';
    $scope.password = '';
  };

  $scope.signUp = function(){
    // Changes state to signup
    $state.go('signup');
  };

});