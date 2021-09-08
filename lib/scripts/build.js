const webpack = require('webpack');
const { merge } = require('webpack-merge');
const chalk = require('chalk');
const prodConfig = require('../config/build.js');

const compiler = webpack(merge(prodConfig, {}), (err, stats) => {
  // // 捕获 warning,
  // if (stats.hasWarnings()) {
  //   console.warn(info.warnings);
  // }
  // 输出 Log result...
  console.log(
    stats.toString({
      assets: true,
      chunks: true, // Makes the build much quieter
      colors: true, // Shows colors in the console
    })
  );
  if (stats.hasErrors()) {
    console.log(chalk.red(`Error occured in compile process. Please fix it before run webpack build!!!`));
    process.exit(1);
  } else {
    process.exit(0);
  }
});

compiler.run(() => {
  console.log('开始编译');
});
