var Graph = require('./graphModel.js');
var User = require('../users/usersModel.js');
var Question = require('../questions/questionsModel.js');
var Answer = require('../answers/answersModel.js');

var graphCtrl = {

  // returns a graph of all answers, questions, users, and traits
  allGraph: function(req, res){

    // query all answers and populate them with questions and user traits 
    Answer.find({})
    .populate('user', 'traits')
    .populate('question', 'question')
    .exec(function(err, answers) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        var graph = graphCtrl.graphMaker(answers, 'text', 'question');
        res.send(graph);
      }
    });
  },

  qGraph: function(req, res){},

  graphMaker: function(data, key1, key2) {
    // instantiate new Graph
    var graph = new Graph();
    // list to pass to cytoscape
    var list = [];
    console.log(data);

    //iterate through data - should be array of objects
    for (var i = 0; i < data.length; i++) {
      var mainValue = data[i][key1];
      var otherValue = data[i][key2];

      //template obj for main node
      var node = {
        'group': 'nodes',
        'data' : {
          'id': mainValue
        }
      };

      //other node
      //template obj for other node
      var otherNode = {
        'group': 'nodes',
        'data' : {
          'id': otherValue
        }
      };

      //template obj for edge
      var edge = {
        'data': {
          'id': mainValue + otherValue + i,
          'source': mainValue,
          'target': otherValue
        }
      };

      //check if it does not exist
      if (!graph.contains(mainValue)) {
        // create node
        graph.addNode(mainValue);

        list.push(node);
      }
      
      if (!graph.contains(otherValue)) {
        // create node
        graph.addNode(otherValue);
        list.push(otherNode);
      }
      // create edge
      graph.addEdge(mainValue, otherValue);
      list.push(edge);
    }

    return list;
  }
};

module.exports = graphCtrl;