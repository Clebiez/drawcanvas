const webpack = require('webpack');

module.exports = {
  entry: {
    app: [__dirname + '/drawcanvas.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'drawcanvas.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: '/'
      }
    ]
  }
};
