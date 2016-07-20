
angular.module('qurvey.controllers')

// Functioning Unit Testing Controller declaration
// .controller('LoginController', ['$scope', function($scope, $state, Login) {

// Functioning Controller declaration
.controller('TopController', function($scope, $state, Top, Main, Graph) {
  
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

  // GET's all questions from /api/questions
  $scope.loadTop = function(){

    // Updates the current users data
    Main.currentUser()
      .then(function(){
        
        // GET req to /api/questions
        Top.top()
          .then(function(data) {
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
                  // Sends POST req to  /api/graph
                  // What is returned is a graph data set for this question id
                  Graph.getGraph(dataVal._id)
                    .then(function(graphData){
                      // The data is appended to the DOM inside of the service
                    })
                    .catch(function(data){
                      console.error('Error with login: ', data)
                    });
                }
              });
              // Push this question into recentData
              $scope.recentData.push(dataVal);
            });
          })
          .catch(function(data){
            console.error('Error with login: ', data)
          });
      })
      .catch(function(data){
        console.error('Error with login: ', data)
      });
  }();
  
  // Submits single answer to database
  $scope.answer = function(text, z, questionID, userAnswer, dataID ) {
    
    // Check to see if the user has already answered this question
    // This disables a user to vote on a single question more than once
    if ( userAnswer ) {
      console.log('This user has already answered this question');
      // TODO -------------------------------------------- ***
      // Notify user they've already voted on this question
      // The below code attempts to trigger the warning message for the selected
      // question.
      
      // Iterates over recentData
      // $scope.recentData.forEach(function(val) {
        // Finds exact question
        // if ( val._id === questionID ) {
          // console.log('val.alreadyVotedWarning: ', val.alreadyVotedWarning);
          // Shows 'Already voted' message
          // $scope.$apply(function(){
          //   val.alreadyVotedWarning = true;
          // });
          // console.log('val.alreadyVotedWarning after: ', val.alreadyVotedWarning);
        // }
      // });
      
    // If the user has not answered this question
    } else if ( !userAnswer ) {
      Main.confirmAnswer(text).then(function(result) {
        // console.log(result, 'confirm')
        if (result) {
          // Gets current user
          Main.currentUser()
            .then(function(data){
              // Saves username
              var user = data.data.username;
              // Creates answerData object for Recent.submitAnswer
              var answerData = {
                // Answer's text
                text: text,
                // responseIndex = letter a-e chosen
                responseIndex: z,
                // Username string
                user: user,
                // Question ID
                question: questionID,
                // Creates a new date for this answer
                createdAt: new Date(),
              };
              // Sends POST req to /api/answers
              Top.submitAnswer(answerData)
                .then(function(data){
                  // Sends POST req to /api/graph with the question id
                  Graph.getGraph(answerData.question)
                    .then(function(graphData){
                      // Graph is appended to the DOM inside of GraphService.js
                    })
                    .catch(function(data){
                      console.error('Error with login: ', data)
                    });
                  })
                  .then(function(data){
                    // Updates the counter after submitting vote
                    // Iterates over recentData
                    $scope.recentData.forEach(function(val) {
                      // Finds exact question
                      if ( val._id === questionID ) {
                        // Increments chosen response by 1
                        val.responses[z] += 1;
                        // Marks question as answered, disabled users ability to vote twice
                        val.userAnswered = true;
                        val.userAnswer = z;
                        // Update button to indicate user voted that option
                        val.classes[z] = 'md-raised md-primary';
                      }
                    });
                  })
                  .catch(function(data){
                    console.error('Error with login: ', data)
                  });
            })
            .catch(function(data){
              console.error('Error with login: ', data)
            }); 
        }
      });
    }
  };

  // TODO -------------------------------------------- ***
  // Not currently being used
  // Converts date to readable string
  $scope.convertDate = function(date){
    // Parses current date string
    var newDate = '',
        month = date.substring(4,6),
        day = date.substring(7,9);
        
    // console.log('month: ', month);
    // console.log('day: ', day);
    // Sets up a months object
    var mnths = { 
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    // TODO
    // Create a new readable string with current string data
    return newDate
  };
  
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
  

// Closing Function Controller declaration
});

// Closing Function Unit Testing Controller declaration
// }]);