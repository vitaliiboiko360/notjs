const webpack = require('webpack');
const path = require('path');

const PORT = 4000;

module.exports = {
  entry: {
    app: [
      './js/main.jsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: './js/',
    filename: 'bundle.js',
  },
  devServer: {
    port: PORT,
    hot: true,
    liveReload: true,
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
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
  devtool: 'source-map',
  plugins: [],
};
