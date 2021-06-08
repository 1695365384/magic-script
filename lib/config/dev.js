const {merge} = require('webpack-merge');
const baseConfig = require('./base.config');
const path = require('path')
const webpack  = require('webpack')

module.exports = merge(baseConfig, {
    entry: [
        path.resolve(process.cwd(), 'src/app'),
        `webpack-hot-middleware/client?http://localhost:${process.env.PORT}`,
        'webpack/hot/only-dev-server',
    ],
    devtool: 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    // 抽离自己写的公共代码，例如 show.js这个被多个组件引用了，所以会单独成一个common.js
                    chunks: 'all', //
                    name: 'common', // 打包后的文件名，任意命名
                    minChunks: 3, //最小引用2次
                    minSize: 3000, // 只要超出0字节就生成一个新包
                    priority: 2,
                },
            },
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // 首次构建完成自动打开指定url
        open: true,
        openPage: `http://127.0.0.1:${process.env.PORT}`,
        host: 'localhost',
        // 可以接受来自任何 HOST 的请求
        disableHostCheck: true,
        // 任何请求都会返回 index.html 文件，这只能用于只有一个 HTML 文件的应用。
        historyApiFallback: true,
        // enable HMR
        hot: true,
        port: process.env.PORT,
        noInfo: false, // 使用进度条的方式替换打包信息
        // 控制台输出日志
        stats: {
            timings: false,
            colors: true,
            version: false,
            hash: false,
            chunks: false,
            chunkModules: true,
            children: false,
        },
        contentBase: baseConfig.output.path,
    },
})
