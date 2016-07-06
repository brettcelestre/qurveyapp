
angular.module('qurvey.controllers')

.controller('SignUpController', function($scope, $state, SignUp) {
  
  $scope.username = '';
  $scope.password = '';
  
  $scope.traits = [];
  
  $scope.addTrait = function(val){
    var btn = document.getElementById(val);
    if ( btn.classList.contains('selected' )) {
       // Removes trait from traits list
       btn.className = 'trait-item';
    } else {
      // Adds selected class to btn
      btn.classList.add('selected');
    }
    
    $scope.traits.push(val);
  };
  
  $scope.createAccount = function(){
    console.log('createAccount ran');
    
    var accountInfo = {
      username: $scope.username,
      password: $scope.password,
      traits: $scope.traits
    };
    
    SignUp.signUp(accountInfo)
      .then(function(data) {
        // Success message
        // Change State to Questions / or quick tour slides    
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
    
    $scope.username = '';
    $scope.password = '';  
    
  };
  
  $scope.loginView = function() {
    $state.go('login');
  };
  

});