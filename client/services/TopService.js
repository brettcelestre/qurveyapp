
angular.module('qurvey.services')

.service('Top', ['$http', function($http) {
  
  // Sends GET req to /api/questions
  var top = function() {
    console.log('Top.top() ran ---------------------------');
    return $http({
      method: 'GET',
      url: '/api/questions/top',
      // data: data
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };
  
  // Sends POST req to /api/answers
  var submitAnswer = function(data) {
    return $http({
      method: 'POST',
      url: '/api/answers',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };
  
  
  // /api/answers

  return {
    top: top,
    submitAnswer: submitAnswer
  };
  
}]);