const { merge } = require('webpack-merge');
const path = require('path');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');

const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  entry: [
    path.resolve(process.cwd(), 'src/app'),
    // Runtime code for hot module replacement
    'webpack/hot/dev-server.js',
    // Dev server client for web socket transport, hot and live reload logic
    'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    // 'webpack-hot-middleware/client?noInfo=false&reload=true'
  ],
  cache: {
    type: 'memory',
  },
  devtool: 'eval-source-map',
  plugins: [new webpack.NoEmitOnErrorsPlugin(), new webpack.HotModuleReplacementPlugin()],
});
