var path = require('path');
var webpack = require('webpack');

// Webpack plugins
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
      contentBase: './dist'
  },
  plugins: [
    new WebpackNotifierPlugin()
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /\.css$/,
        loader: 'stylelint-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        enforce: "pre",
        test: /.jsx?$/,
        loader: 'eslint-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader'
        ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loader: "json",
        include: path.join(__dirname, 'data.json')
      }
    ]
  }
};
