#!/usr/bin/env node
const webpack = require('webpack');
const config = require('../config/dev');
const compiler = webpack(config);
const DevServer = require('webpack-dev-server');

const server = new DevServer(
  {
    open: true,
    hot: false,
    client: {
      overlay: true,
    },
    liveReload: true,
    port: process.env.PORT,
  },
  compiler
);

(async () => {
  await server.start();
})();
