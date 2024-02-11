const webpack = require('webpack');
const path = require('path');

const PORT = 4001;

module.exports = {
  entry: {
    app: [
      './js/main.jsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  devServer: {
    port: PORT,
    hot: true,
    historyApiFallback: true,
    liveReload: true,
    watchFiles: ['src/**/*'],
    static: {
      directory: path.resolve(__dirname),
      watch: true,
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
};
