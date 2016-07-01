
angular.module('MainCtrl', [])

.controller('MainController', function($scope, Main, $interval, $location) {
  
  $scope.username = 'Username';
  $scope.password = 'Password';
  
  $scope.validPassword = false;
  
  
  
  // Listen to any server-side stateView changes via the socket, and update $scope.voteObj accorgingly
  // Main.socket.on('stateViewChange', function(data) {
  //   // console.log('Main socket from MainController: ', data);
  //   // Update the voter object to reflect the new data
  //   $scope.voteObj = data;
  //   // Change the route as appropriate
  //   Main.updateView(data.stateView);
  //   // This line seems to be needed to make sure all clients update appropriately:
  //   $scope.$apply();
  // });

  // When '+' is clicked on view 1, $scope.voteObj.totalVotes is incremented  
  // $scope.incNumOfVoters = function() {
  //   // Set max number of voters to 15 for now.  This may change..
  //   if ($scope.voteObj.totalVotes < 15) {
  //     $scope.voteObj.totalVotes += 1;
  //   }
  // };


});