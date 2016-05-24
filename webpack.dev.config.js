var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.react.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'build'
  },
  debug: true,
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      containers: path.join(__dirname, './src/containers')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
  ]
};
