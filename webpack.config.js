
var path    = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/client',
  entry: './app.js',
  
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js',
    publicPath: '/build/' //the server will listen in on this path and then proxy Webpack
  },
  module: {
    loaders: []
  }
};