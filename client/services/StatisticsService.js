
angular.module('qurvey.services')

.service('Statistics', ['$http', function($http) {
  
  // Sends GET req to /api/stats/answer
  var answerStats = function(data) {
    console.log('Statistics Service data: ', data);
    return $http({
      method: 'POST',
      url: '/api/stats/answer',
      data: JSON.stringify(data)
    }).then(function(data) {
      return data;
    }, function(error) {
      return error;
    });
  };

  return {
    answerStats: answerStats
  };
  
}]);