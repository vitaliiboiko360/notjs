const webpack = require('webpack');
const path = require('path');

const WSPORT = 8008;
const PORT = 4001;

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
    watchFiles: ['cli/**/*'],
    static: {
      directory: path.resolve(__dirname),
      watch: true,
    },
    proxy: [{
      '/ws': {
        target: `ws://localhost:${WSPORT}`,
        ws: true // important
      },
    }]
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
      }
    ],
  },
  devtool: 'source-map',
  plugins: [],
};
