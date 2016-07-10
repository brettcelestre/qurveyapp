
angular.module('qurvey.controllers')

// Functioning Unit Testing Controller declaration
// .controller('LoginController', ['$scope', function($scope, $state, Login) {

// Functioning Controller declaration
.controller('RecentController', function($scope, $state, Recent) {
  
  // recentData stores data from loadRecent() and is displayed with ng-repeat
  $scope.recentData = [];
  
  // Returns amount of answer options
  $scope.questionCount = function(questions) {
    var count = 0;
    for ( var key in questions ) {
      if ( questions[key].length >= 2 ){
        count++;
      }
    }
    
    // Figure out a way to only invoke this function as many
    // times as needed. If cound is 3, don't check 4 & 5
    // console.log('COUNT: ', count);
    
    return count;
  };

  $scope.loadRecent = function(){
    // GET req to /api/questions
    Recent.recent()
      .then(function(data) {
        // Pushes data into recentData array
        data.data.forEach(function(val){
          $scope.recentData.push(val);
        });
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();

// Closing Function Controller declaration
});

// Closing Function Unit Testing Controller declaration
// }]);