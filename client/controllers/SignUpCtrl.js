
angular.module('qurvey.controllers')

.controller('SignUpController', function($scope, $state, SignUp) {
  
  $scope.username = '';
  $scope.password = '';
  
  $scope.traits = {};
  $scope.tooManyTraits = false;
  
  // Checks if we should disable create account button
  $scope.createAccountButton = function(){
    // Check if 
    if ( 4 <= Object.keys($scope.traits).length && Object.keys($scope.traits).length <= 6 ) {
      document.getElementById('createAcccount').disabled = false;
    } else {
      document.getElementById('createAcccount').disabled = true;
    }
  };
  
  $scope.addTrait = function(val){
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
  
  $scope.createAccount = function(){
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
      .catch(function(data){
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