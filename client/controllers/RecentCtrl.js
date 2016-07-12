
angular.module('qurvey.controllers')

// Functioning Unit Testing Controller declaration
// .controller('LoginController', ['$scope', function($scope, $state, Login) {

// Functioning Controller declaration
.controller('RecentController', function($scope, $state, Recent, Main) {
  
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
    
    // TODO ----------------------------------------------------- ***
    // Figure out a way to only invoke this function as many
    // times as needed. If cound is 3, don't check 4 & 5
    // console.log('COUNT: ', count);
    
    return count;
  };
  
  
  // TODO -------------------------------------------- ***
  // Disable a user to vote on a single question more than once
  

  $scope.loadRecent = function(){
    // GET req to /api/questions
    Recent.recent()
      .then(function(data) {
        console.log('data.data: ', data.data);
        // Pushes data into recentData array
        data.data.forEach(function(val){
          $scope.recentData.push(val);
        });
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();
  
  // Submits single answer to DB
  $scope.answer = function(text, z, questionID ) {
    
    // Gets current user
    Main.currentUser()
      .then(function(data){
        // Saves username
        var user = data.data.username;
        // Creates answerData object for Recent.submitAnswer
        var answerData = {
          text: text,
          responseIndex: z,
          user: user,
          question: questionID,
          createdAt: new Date(),
        };
        console.log('answerData: ', answerData);
        // Sends POST req to /api/answers
        Recent.submitAnswer(answerData)
          .then(function(data){
            console.log('Recent.submitAnswer: ', data);
            
            // TODO -------------------------------------------- ***
            // Update DOM immediately to reflect vote
              // I added the question ID to the parent div of all of
              // the options. I've passed this question ID into this
              // function. I need to then find that div, and find the
              // child div with the matching responseIndex, then 
              // increment that number up by 1
            
            // TODO -------------------------------------------- ***
            // Update button to indicate user voted that option
              // add css class md-primary
            
          })
          .catch(function(data){
            console.error('Error with login: ', data)
          });
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }
  
  
  // TODO -------------------------------------------- ***
  // Sets up Infinite Scrolling
  
  // this.infiniteItems = {
  //   numLoaded_: 0,
  //   toLoad_: 0,
  //   // Required.
  //   getItemAtIndex: function(index) {
  //     if (index > this.numLoaded_) {
  //       this.fetchMoreItems_(index);
  //       return null;
  //     }
  //     return index;
  //   },
  //   // Required.
  //   // For infinite scroll behavior, we always return a slightly higher
  //   // number than the previously loaded items.
  //   getLength: function() {
  //     return this.numLoaded_ + 5;
  //   },
  //   fetchMoreItems_: function(index) {
  //     // For demo purposes, we simulate loading more items with a timed
  //     // promise. In real code, this function would likely contain an
  //     // $http request.
  //     if (this.toLoad_ < index) {
  //       this.toLoad_ += 20;
  //       $timeout(angular.noop, 300).then(angular.bind(this, function() {
  //         this.numLoaded_ = this.toLoad_;
  //       }));
  //     }
  //   }
  // };
  
  // TODO -------------------------------------------- ***
  // Converts date to readable string
  $scope.convertDate = function(date){
    var newData = '',
        month = date.substring(4,6),
        day = date.substring(7,9);
        
    console.log('month: ', month);
    console.log('day: ', day);
    var mnths = { 
      
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    
    return newDate
  };

// Closing Function Controller declaration
});

// Closing Function Unit Testing Controller declaration
// }]);