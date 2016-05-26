const path = require('path');

module.exports = {
  entry: [
    './src/index.react.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  debug: true,
  devtool: 'eval-source-map',
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    alias: {
      containers: path.resolve(__dirname, './src/containers'),
      config: path.resolve(__dirname, './server')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel' ],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/, loader: 'style-loader!css-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|jpe?g|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: []
};
