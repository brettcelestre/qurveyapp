
angular.module('qurvey.services')

.service('Graph', ['$http', function($http) {
  

  var makeGraph = function(data, id) {
    return cytoscape({

      container: document.getElementById('graph_' + id), // container to render in

      // elements: data,
      elements: data.data,

      style: cytoscape.stylesheet()
      .selector('node')
        .css({
          'background-color': '#666',
          'label': 'data(id)',
          // 'width': 'mapData(foo, 3, 7, 10)',
          'width': 'mapData(foo, 0, 100, 5, 200)',

          'height': 'mapData(foo, 0, 100, 5, 200)'
        })
      .selector('edge')
        .css({
          // 'width': 3,
          'width': 'mapData(strength, 70, 100, 2, 6)',
          'line-color': 'grey',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        })
      .selector('.big')
        .css({
          'background-color': 'blue',
          'width': 10,
          'height': 10
        })
      .selector('.med')
        .css({
          'width': 5,
          'height': 5
        })
      .selector('.small')
        .css({
          'width': 3,
          'height': 3
        }),
    // [ // the stylesheet for the graph
    //   {
    //     selector: 'node',
    //     style: {
    //       'background-color': '#666',
    //       'label': 'data(id)'
    //     }
    //   },


    //   {
    //     selector: 'edge',
    //     style: {
    //       // 'width': 3,
    //       'line-color': 'green',
    //       'target-arrow-color': '#ccc',
    //       'target-arrow-shape': 'triangle',
    //       'curve-style': 'bezier'
    //     }
    //   },
    //   {
    //     selector: '.big',
    //     style: {
    //       'width': 10,
    //       'height': 10
    //     }
    //   },
    //   {
    //     selector: '.med',
    //     style: {
    //       'width': 5,
    //       'height': 5
    //     }
    //   },
    //   {
    //     selector: '.small',
    //     style: {
    //       'width': 3,
    //       'height': 3
    //     }
    //   }
    // ],

      zoom: 1,
      pan: { x: 0, y: 0 },

      layout: {
        name: 'concentric'
        // rows: 1
        // circle: true
      }

    });
  };
  // Sends POST req to /api/graph question _id
  var getGraph = function(questionID) {
    console.log(questionID, 'qID');
    return $http({
      method: 'POST',
      url: '/api/graph',
      data: JSON.stringify({question: questionID})

    }).then(function(data) {
      // console.log(req.body, 'getGraph req.body');
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