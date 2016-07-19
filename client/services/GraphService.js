
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
        })
      .selector('node.countid')
        .css({
          // 'label': 'data(id)',
          'content': 'data(countid)'
        })
      .selector('.faded')
        .css({
          'opacity': 0.2
        }),

      zoom: 1,

      userZoomingEnabled: false,

      pan: { x: 0, y: 0 },

      layout: {
        name: 'concentric',
      }

    });
    cy.on('select', 'node', function(e) {
      var viewport = this._private.cy.container();
      angular.element(viewport).addClass('fullscreen');
      // cy({userZoomingEnabled: true});
      var node = this;
      var layoutDuration = 500;
      var layoutPadding = 0;
      // node position
      var npos = node.position();

      // connected nodes and edges
      var nhood = node.closedNeighborhood();
      var ohood = node.openNeighborhood();
      // all the other nodes
      var others = cy.elements().not(nhood);
      var w = window.innerWidth;
      var h = window.innerHeight;
        
      // node.position({
      //   x: 250,
      //   y: 250
      // });
      cy.batch(function() {
        nhood.addClass('highlighted').removeClass('faded').removeClass('countid');
        others.addClass('faded').removeClass('highlighted').removeClass('countid');
        ohood.addClass('countid');



        cy.stop().animate({
          fit: {
            eles: node,
            padding: layoutPadding
          }
        }, {
          duration: layoutDuration
        }).delay( layoutDuration, function() {
          nhood.layout({
            name: 'concentric',
            padding: layoutPadding,
            animate: true,
            animationDuration: layoutDuration,
            boundingBox: {
              x1: npos.x - w / 2,
              x2: npos.x + w / 2,
              y1: npos.y - h / 2,
              y2: npos.y + h / 2
            },
            fit: true,
            concentric: function( n ) {
              if ( node.id() === n.id() ) {
                return 2;
              } else {
                return 1;
              }
            },
            levelWidth: function() {
              return 1;
            },
            animate: true
          });
          // others.layout({name: 'grid', rows: 1});
        });
        
      });
      console.log('this nodes neighborhood', this._private.cy.container());
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