#!/usr/bin/env node
const webpack = require('webpack');
const config = require('../config/dev');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = require('express')();

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        // enable HMR
        stats: {
            colors: true,
            chunkModules: true,
            chunks: true,
            timings: true,
            version: false,
            hash: false,
            children: false,
            assets: false,
        },
    })
);

app.use(require('express').static(config.output.path));
app.use(
    require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    })
);

app.listen(process.env.PORT, function() {
    console.log('server is running', `http://localhost:${process.env.PORT}`);
});
