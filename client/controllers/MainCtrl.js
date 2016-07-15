
angular.module('qurvey.controllers')

.controller('MainController', function($scope, $state, Main, Graph, Search) {
  
  // Stores search term from nav bar search input
  $scope.searchTerm = '';
  // Stores current users name to display in nav bar
  $scope.currentUser = '';
  
  // Loads 'main.question' view in ui-view 'content'
  $scope.questions = function() {
    $state.go('main.questions');
  };
  
  // Redirects to 'profile' view
  $scope.profile = function() {
    $state.go('profile');
  };

  // Logs user out and redirects to /login
  $scope.logout = function() {
    // Calls /auth/logout and removes users session
    Main.logout()
      .then(function(){
        // Redirects to 'login' view
        $state.go('login');
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  };
  
  // Checks current session for username
  $scope.currentUsername = function(){
    // Calls /auth/checkSession
    // This updates MainService.js's userObject with all of the users data
    Main.currentUser()
      .then(function(data){
        // Updates currentUser which displays in the nav bar
        $scope.currentUser = data.data.username;
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  // Invoked on load
  }();
  
  // Function to submit a search, currently disabled
  $scope.search = function() {
    // Converts search term to lower case
    var searchLowerCase = $scope.searchTerm.toLowerCase();
    // Sets Main.searchTerm to current search input
    Search.search({search: searchLowerCase})
      .then(function(data){
        console.log('Search Complete --------------');
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
    // Changes state to search-results
    $state.go('search-results');
    
    // Submit $scope.searchTerm with GET req
    //$scope.searchTerm
    
    /*
    // Invoke Search service
    Main.search({search: $scope.searchTerm})
      .then(function(data){
        console.log('Search results: ', data);
        
        // Iterates over our questions data
        data.data.forEach(function(dataVal){
          // Set userAnswered to false
          dataVal.userAnswered = false;  
          dataVal.classes = {
            a: 'md-raised',
            b: 'md-raised',
            c: 'md-raised',
            d: 'md-raised',
            e: 'md-raised'
          }
          // Cleans up createdAt string
          dataVal.createdAt = dataVal.createdAt.substring(0,10);
          // Hides 'already voted' warning
          dataVal.alreadyVotedWarning = true;
          // Iterate over this users previous answers
          Main.userObject.questionsAnswered.forEach(function(userVal) {
            // Check if this user has answered this question
            if ( userVal.question === dataVal._id ) {
              // If the user has answered this question, set userAnswered to true
              dataVal.userAnswered = true;
              // Store responseIndex in userAnswer
              dataVal.userAnswer = userVal.responseIndex;
              // Applies appropriate class
              dataVal.classes[userVal.responseIndex] = 'md-raised md-primary';
          // Push this questions into searchData
          $scope.searchData.push(dataVal);
              // Sends POST req to  /api/graph
              // What is returned is a graph data set for this question id
              // Graph.getGraph(dataVal._id)
              //   .then(function(graphData){
              //     // The data is appended to the DOM inside of the service
              //   })
              //   .catch(function(data){
              //     console.error('Error with login: ', data)
              //   });
            }
          });
          console.log('$scope.searchData: ', $scope.searchData);
          
          // $state.go('search-results');
        })
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
    */
  };  

  // Redirects to 'settings' view, currently disabled
  // $scope.settings = function() {
  //   $state.go('settings');
  // };
  
});