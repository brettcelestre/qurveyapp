
angular.module('qurvey.services')

.service('Ask', ['$http', function($http) {
  
  // Sends POST req to /api/questions/ask with new question data
  var ask = function(data) {
    console.log('Ask Service ask function ran: ');
    return $http({
      method: 'POST',
      url: '/api/questions/ask',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    ask: ask,
  };
  
}]);