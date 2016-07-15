
angular.module('qurvey.services')

.service('Search', ['$http', 'Main', 'Graph', function($http, Main, Graph) {
  
  var temp = '';
  var searchResults = {
    term: [],
    data: []
  };
  
  // Sends POST req to /api/search with search term
  var search = function(data){
    // Assign searchTerm to temp string
    temp = data.search;
    return $http({
      method: 'POST',
      url: '/api/search/',
      data: JSON.stringify(data)
    }).then(function(data) {
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
          // Empties data/term arrays
          searchResults.data.pop();
          searchResults.term.pop();
          // Push this questions/term into searchResults
          searchResults.data.push(dataVal);
          searchResults.term.push(temp);
        });
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    search: search,
    searchResults: searchResults
  };
  
}]);