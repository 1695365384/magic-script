const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('../config/build.js');

const cfg = {
  plugins: [new BundleAnalyzerPlugin()],
};

const compiler = webpack(merge(config, cfg));

compiler.run((err, stats) => {
  if (!err) {
    console.log(stats);
  }
});
