
angular.module('qurvey.services')

.service('Graph', ['$http', function($http) {
  

  var makeGraph = function(data, id) {
    var cy = cytoscape({

      container: document.getElementById('graph_' + id), // container to render in

      // elements: data,
      elements: data.data,

      style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'background-color': '#666',
          'content': 'data(id)',
          'text-valign': 'center',
          'text-outline-width': 2,
          'color': 'white',
          'text-background-opacity': 1,
          'text-background-color': 'grey',
          'text-background-shape': 'roundrectangle',
          'text-outline-color': '#999',
          'font-size': '18',
          'width': 'mapData(size, 0, 100, 5, 200)',

          'height': 'mapData(size, 0, 100, 5, 200)'
        })
      .selector('edge')
        .css({
          'width': 'mapData(strength, 0, 40, 2, 40)',
          'line-color': 'mapData(strength, 0, 40, grey, blue)',
          'curve-style': 'bezier'
        }),

      zoom: 1,

      userZoomingEnabled: false,

      pan: { x: 0, y: 0 },

      layout: {
        name: 'concentric',
      }

    });
    cy.on('click', 'node', function(e) {
      console.log('this nodes count', this._private.data.count);
    });
    return cy;

  };
  
  // Sends POST req to /api/graph question _id
  var getGraph = function(questionID) {
    return $http({
      method: 'POST',
      url: '/api/graph',
      data: JSON.stringify({question: questionID})
    }).then(function(data) {
      // Sends data and question id through makeGraph
      return makeGraph(data, questionID);
    }, function(error) {
      return error;
    });
  };

  return {
    getGraph: getGraph,
    makeGraph: makeGraph
  };
  
}]);