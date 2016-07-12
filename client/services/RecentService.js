
angular.module('qurvey.services')

.service('Recent', ['$http', function($http) {
  
  // Sends GET req to /api/questions
  var recent = function() {
    return $http({
      method: 'GET',
      url: '/api/questions',
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
    recent: recent,
    submitAnswer: submitAnswer
  };
  
}]);