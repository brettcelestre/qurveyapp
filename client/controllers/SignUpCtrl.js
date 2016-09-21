
angular.module('qurvey.controllers')

.controller('SignUpController', function($scope, $state, SignUp) {
  
  // Stores username and password
  $scope.username = '';
  $scope.password = '';
  
  // Traits selected
  $scope.traits = [];
  // Trait Options
  $scope.traitOptions = ['Weird', 'Crazy', 'Splendid', 'Sneaky', 'Quiet', 'Blunt', 'Intellectual', 'Warm', 'Stressed', 'Imaginative', 'Sad', 'Confused'];
  // State for disabling Create Account button
  $scope.submitCheck = true;
  
  // Sets up a function to show password inside of input
  $scope.showPass = function(){
    console.log('show password function');
    // Change input type to 'text' instead of 'password'
  };
  
  // Checks if we should disable create account button
  $scope.createAccountButton = function(){
		// Resets user/pass back to strings if everything is deleted 
		if ( $scope.username === undefined ) {
		  $scope.username = '';
	  }
		if ( $scope.password === undefined ) {
			$scope.password = '';
		}
	 
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
	
	$scope.toggle = function (item, list) {
    // Makes sure no more than 6 traits selected
     if ( (list.length + 1) <= 6 || (list.indexOf(item) > -1)){
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
				$scope.createAccountButton();
      }
      else {
        list.push(item);
				$scope.createAccountButton();
			}
		}
  };
  
  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };
  
  $scope.createAccount = function() {
    // Creates account info object
    var accountInfo = {
      username: $scope.username,
      password: $scope.password,
      traits: $scope.traits
    };	
    // Sends accountInfo through /auth/signup
    SignUp.signUp(accountInfo)
      .then(function(data) {
        // Success message
        if ( data.statusText == 'Created' ) {
          // Change State to Questions / or quick tour slides
          $state.go('main.questions.top');
        // Failure message
        } else {
          // Display 'Username already taken'
          alert('sorry something went wrong');
        }
          
      })
      .catch(function(data) {
        console.error('Error with login: ', data);
      });
    // Clears input models
    $scope.username = '';
    $scope.password = '';  
  };
  
  // Changes state back to login
  $scope.loginView = function() {
    $state.go('home');
  };
  
});

