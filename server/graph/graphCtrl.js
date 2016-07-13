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

  qGraph: function(req, res) {
    console.log(req.body.question, 'req.body');
    // var question = ;
    Question.findOne({_id: req.body.question})
    .populate('answerObjs')
    .populate({path: 'answerObjs', populate: {path: 'user', select: 'traits'}})
    .exec(function (err, qs) {
      if (err) {
        console.error(err);
      } else {
        // graphCtrl.graphMaker(qs.answerObjs, 'text', 'traits');
        res.send(graphCtrl.graphMaker(qs.answerObjs, 'text', 'traits'));
      }
    });
  },

  graphMaker: function(data, key1, key2) {
    // instantiate new Graph
    var graph = new Graph();
    // list to pass to cytoscape
    var list = [];
    console.log(data);

    //iterate through data - should be array of objects
    for (var i = 0; i < data.length; i++) {
      var mainValue = data[i][key1];
      var otherValue = data[i]['user'][key2];

      //template obj for main node
      var node = {
        'group': 'nodes',
        'data' : {
          'id': mainValue,
          'foo': 20
        }
      };

      

      

      //check if it does not exist
      if (!graph.contains(mainValue)) {
        // create node
        graph.addNode(mainValue);

        list.push(node);
      }
      
      for (var j = 0; j < otherValue.length; j++) {

        //other node
        //template obj for other node
        var otherNode = {
          'group': 'nodes',
          'data' : {
            'id': otherValue[j]
          }
        };

        //template obj for edge

        var edge = {
          'data': {
            'id': mainValue + otherValue[j] + i,
            'source': mainValue,
            'target': otherValue[j]
          }
        };

        if (!graph.contains(otherValue[j])) {
          // create node
          graph.addNode(otherValue[j]);
          list.push(otherNode);
        }
        // create edge
        graph.addEdge(mainValue, otherValue[j]);
        list.push(edge);
      }
    }

    return list;
  }
};

module.exports = graphCtrl;