
angular.module('qurvey.controllers')

.controller('SignUpController', function($scope, $state, SignUp) {
  
  // Stores username and password
  $scope.username = '';
  $scope.password = '';
  // Stores our traits
  $scope.traits = {};
  // State for disabling Create Account button
  $scope.submitCheck = true;
  
  $scope.showPass = function(){
    console.log('show password function');
    
  };
  
  // Checks if we should disable create account button
  $scope.createAccountButton = function(){
    // Check if our inputs are filled and traits selected
    if ( 4 <= Object.keys($scope.traits).length && 
        Object.keys($scope.traits).length <= 6 && 
        $scope.username.length >= 1 &&
        $scope.password.length >= 1 ) {
      // Enables Create Account button
      $scope.submitCheck = false;
    } else {
      // Disables Create Account button
      $scope.submitCheck = true;
    }
  };
  
  $scope.addTrait = function(val) {
    var btn = document.getElementById(val);
    // Checks if current button is already selected
    if ( btn.classList.contains('selected' )) {
       // Removes trait from traits list
       btn.className = 'trait-item';
       // Deletes trait from trait obj
       delete $scope.traits[val];
       // Checks if we should disable create account button
       $scope.createAccountButton();
    } else {
      // Adds selected class to btn
      btn.classList.add('selected');
      // Adds trait to trait obj
      $scope.traits[val] = true;
      // Checks if we should disable create account button
      $scope.createAccountButton();
    }
  };
  
  $scope.createAccount = function() {
    // Stores traits in an array
    var traits = [];
    for ( var key in $scope.traits ) {
      traits.push(key);
    }
    // Creates account info object
    var accountInfo = {
      username: $scope.username,
      password: $scope.password,
      traits: traits
    };
    // Sends accountInfo through /auth/signup
    SignUp.signUp(accountInfo)
      .then(function(data) {
        // Success message
          // Change State to Questions / or quick tour slides
        // Failure message
          // Display 'Username already taken'
      })
      .catch(function(data) {
        console.error('Error with login: ', data)
      });
    
    // Clears input models
    $scope.username = '';
    $scope.password = '';  
    
  };
  
  // Changes state back to login
  $scope.loginView = function() {
    $state.go('login');
  };
  
});

