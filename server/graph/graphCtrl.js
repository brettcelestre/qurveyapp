// callbacks used by /api/graph routes

// models imported to interact with db and graphMaker
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

  // graph for single question
  qGraph: function(req, res) {
    // console.log(req.body.question, 'req.body');
    Question.findOne({_id: req.body.question})
    .populate('answerObjs')
    .populate({path: 'answerObjs', populate: {path: 'user', select: 'traits'}})
    .exec(function (err, qs) {
      if (err) {
        console.error(err);
      } else {
        res.send(graphCtrl.graphMaker(qs.answerObjs, 'text', 'traits'));
      }
    });
  },

  // format db data to send to graph service
  graphMaker: function(data, key1, key2) {
    // instantiate new Graph
    var graph = new Graph();
    // list to pass to cytoscape
    var list = [];
    var nodeObj = {};
    // console.log(data);

    //iterate through data - should be array of objects
    for (var i = 0; i < data.length; i++) {
      var mainValue = data[i][key1];
      var otherValue = data[i]['user'][key2];

      //template obj for main node
      var node = {
        'group': 'nodes',
        'data': {
          'id': mainValue,
          'size': 50,
          'count': 1
        }
      };

      

      

      //check if it does not exist
      if (!graph.contains(mainValue)) {
        // create node
        graph.addNode(mainValue);

        nodeObj[mainValue] = node;
        // list.push(node);
      } else {
        // increment count
        nodeObj[mainValue].data.count++;
      }
      
      for (var j = 0; j < otherValue.length; j++) {

        //other node
        //template obj for other node
        var otherNode = {
          'group': 'nodes',
          'data': {
            'id': otherValue[j],
            'size': 10,
            'count': 1,
            'countid': otherValue[j] + ' ' + 1
          }
        };

        //template obj for edge

        var edge = {
          'data': {
            'id': mainValue + otherValue[j],
            'source': mainValue,
            'target': otherValue[j],
            'strength': 0
          }
        };

        if (!graph.contains(otherValue[j])) {
          // create node
          graph.addNode(otherValue[j]);
          // list.push(otherNode);
          nodeObj[otherValue[j]] = otherNode;
        } else {
          // increment count
          nodeObj[otherValue[j]].data.count++;
          nodeObj[otherValue[j]].data.countid = otherValue[j] + ' ' + nodeObj[otherValue[j]].data.count;
        }

        if (!graph.hasEdge(mainValue, otherValue[j])) {
          // create edge
          graph.addEdge(mainValue, otherValue[j]);
          // list.push(edge);
          nodeObj[edge.data.id] = edge;
        } else {
          // increment strength value of edge
          nodeObj[edge.data.id].data.strength++;
        }
      }
    }

    // turn nodeObj into list array
    for (var key in nodeObj) {
      list.push(nodeObj[key]);
    }
    return list;
  }
};

module.exports = graphCtrl;