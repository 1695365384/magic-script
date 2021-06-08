const pwd = process.cwd()
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar');
const resolveApp = require('../utils/resolveApp')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const threadLoader = {
    loader: require.resolve('thread-loader'),
};


const copyWebpackPluginPatterns = [
    {
        from: resolveApp('src/public/magic.png', true),
        to: 'assets/img',
    },
    {
        from: resolveApp('src/public/favicon.ico', true),
        to: 'assets/img',
    },
];


function isMiniCss() {
    return process.env.NODE_ENV !== "production"
        ? "style-loader"
        : MiniCssExtractPlugin.loader
}

module.exports = {
    mode: process.env.NODE_ENV,
    cache: true,
    output: {
        path: path.resolve(pwd, 'dist'),
        filename: '[name].[chunks].js',
        chunkFilename: '[name].[chunks].js',
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css", ".tsx", ".less", ".sass", ".scss", ".ts", "..."],
        alias: {
            "@&": resolveApp('src'),
        },
        mainFields: ['browser', 'module', 'main'],
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'magic',
            template: 'src/public/index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            },
            filename: 'index.html'
        }),
        new WebpackBar({
            name: `magic ${process.env.NODE_ENV}`,
            color: '#7fffbf'
        }),
        new MiniCssExtractPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             // 从public中复制文件
        //             from: resolveApp('src/public'),
        //             // 把复制的文件存放到dis里面
        //             to: resolveApp('dist')
        //         }
        //
        //     ],
        // })
        new CopyWebpackPlugin({
            patterns: copyWebpackPluginPatterns
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    }
                },
                    threadLoader,
                ]
            },
            {
                test: /\.css$/,
                include: [
                    /node_modules\/antd\/dist/,
                    /src/
                ],
                use:[
                    isMiniCss(),
                    threadLoader,
                    "css-loader",
                ]
            },
            {
                test: /\.less$/,
                include: [
                    /node_modules\/antd\/dist/,
                    /src/
                ],
                use: [
                    threadLoader,
                    // Creates `style` nodes from JS strings
                    isMiniCss(),
                    // Translates CSS into CommonJS
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        }
                    },
                ]
            },
            {
                test: /\.(s[ac]ss)$/,
                exclude: /node_modules/,
                use: [
                    threadLoader,
                    "css-loader",
                    // Creates `style` nodes from JS strings
                    isMiniCss(),
                    // Translates CSS into CommonJS
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|webp)$/,
                // emits a separate file and exports the URL.
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|eot|svg|AFM)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg/,
                type: 'asset/inline'  // inline 的时候不需要指定文件名
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset',
                // automatically choose between resource and inline by following a default condition
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                mimetype: 'application/font-woff',
            },

        ]
    }
}
