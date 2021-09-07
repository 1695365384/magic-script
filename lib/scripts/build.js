const webpack = require('webpack');
const { merge } = require('webpack-merge');
const chalk = require('chalk');
const prodConfig = require('../config/build.js');

const compiler = webpack(merge(prodConfig, {}), (err, stats) => {
  if (err) {
    throw new Error(err);
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
    console.log(chalk.red(`Error occured in compile process. Please fix it before run webpack build!!!`));
    process.exit(1);
  }
  // 捕获 warning,
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
  // 输出 Log result...
  console.log(
    stats.toString({
      assets: false,
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console
    })
  );

  if (stats.hasErrors()) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});

compiler.run(() => {
  console.log('开始编译');
});
