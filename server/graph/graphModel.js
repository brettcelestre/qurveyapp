// Instantiate a new graph
var Graph = function() {

  this._nodes = {};
};

// ------------------------
// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {

  if (node) {
    this._nodes[node] = this._nodes[node] || { edges: [] };
  }
};

// ------------------------
// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {

  return !(this._nodes[node] === undefined);
};

// ------------------------
// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {

  if (this.contains(node)) {
    //   Removes edges between node to be deleted and all other connected nodes.
    for (var targetNode in this._nodes[node].edges) {
      this.removeEdge(node, targetNode);
    }
    delete this._nodes[node];
  }
};

// ------------------------
// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {

  return this._nodes[fromNode].edges.indexOf(toNode) !== -1;
};

// ------------------------
// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {

  // If either node doesn't currently exist, return null
  // if (fromNode === undefined || toNode === undefined) return null;
  // // Otherwise, add an edge to each node pointing to the other.
  // if (this._nodes[fromNode].edges.indexOf(toNode) === -1) { this._nodes[fromNode].edges.push(toNode) };
  // if (this._nodes[toNode].edges.indexOf(fromNode) === -1) { this._nodes[toNode].edges.push(fromNode) };
  this._nodes[fromNode].edges.push(toNode);
  this._nodes[toNode].edges.push(fromNode);
};

// ------------------------
// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {

  // Remove "toNode" from "fromNode's" edges array.
  var spliceIndex = this._nodes[fromNode].edges.indexOf(toNode);
  if (spliceIndex !== -1) { this._nodes[fromNode].edges.splice(spliceIndex, 1) };

  // Remove "fromNode" from "toNode's" edges array.
  spliceIndex = this._nodes[toNode].edges.indexOf(fromNode);
  if (spliceIndex !== -1) { this._nodes[toNode].edges.splice(spliceIndex, 1) };
};

// ------------------------
// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {

  for (var node in this._nodes) {
    cb(node);
  }
};

module.exports = Graph;