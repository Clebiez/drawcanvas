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
        use: ['babel-loader?presets=env'],
        include: '/'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        drop_console: true
      }
    })
  ]
};
