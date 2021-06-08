const {merge} = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
    entry: path.resolve(process.cwd(), 'src/app'),
})
