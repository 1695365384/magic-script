const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
const path = require('path');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const happyThreadPool = HappyPack.ThreadPool({ size: 6 });
const postCss = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [['postcss-preset-env']],
    },
  },
};

module.exports = {
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.tsx', '.less', '.sass', '.scss', '.ts'],
    mainFields: ['jsnext:main', 'module', 'browser', 'main'],
  },
  plugins: [
    new HappyPack({
      id: 'babel',
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory=true'],
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        ExtractCssChunks.loader,
        { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
        postCss,
      ],
    }),
    new htmlWebpackPlugin({
      title: 'magic',
      template: 'src/public/index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      filename: 'index.html',
    }),
    new WebpackBar({
      name: `magic ${process.env.NODE_ENV}`,
      color: '#7fffbf',
    }),
    new ExtractCssChunks(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        include: /src/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.(tsx|ts)/,
        include: /src/,
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=css'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', ExtractCssChunks.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          ExtractCssChunks.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              implementation: require('less'),
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
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
        type: 'asset/inline', // inline ?????????????????????????????????
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
    ],
  },
  optimization: {
    /**
     * ??? optimization.runtimeChunk ????????? true ??? 'multiple'?????????????????????????????????????????? runtime ????????? chunk??????????????????????????????
     */
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    /**
     * ?????? optimization.emitOnErrors ??????????????????????????????????????? emit asset?????????????????????????????? asset ??? emit ??????????????????????????? emit ???????????????????????????????????????????????????
     */
    emitOnErrors: true,
    /**
     * ??????????????????,??????????????????????????????,????????????????????????
     */
    splitChunks: {
      chunks: 'all',
      minSize: 1024 * 10,
      maxSize: 1024 * 100,
      // minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      // maxInitialRequests: 30,
      cacheGroups: {
        default: {
          name: 'common',
          minSize: 0,
          minChunks: 2,
          priority: -20,
        },
        styles: {
          name: 'style',
          test: /\.s[ca]ss$|\.css$/,
          chunks: 'all',
          enforce: true,
        },
        antd: {
          name: 'antd',
          test: /node_modules\/antd/,
        },
        react: {
          name: 'react',
          test: /node_modules\/react/,
        },
        // 'react-dom': {
        //   name: 'react-dom',
        //   test: /node_modules\/react-dom/,
        // },
        redux: {
          name: 'redux',
          test: /node_modules\/redux/,
        },
      },
    },
  },
};
