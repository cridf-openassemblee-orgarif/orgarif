const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base');
const port = require('./webpack.base').port;

// [doc] JS_BUNDLE_HOST is for mobile dev
const jsBundleHost = process.env['JS_BUNDLE_HOST'] || 'devorgarif';
module.exports = {
  mode: 'development',
  context: __dirname,
  // cf https://webpack.github.io/docs/configuration.html#devtool
  // finally https://github.com/s-panferov/awesome-typescript-loader
  // devtool: 'eval', // 18132ms
  devtool: 'source-map', // 17969ms
  // devtool: 'inline-source-map', // 18024ms
  // devtool: 'cheap-module-eval-source-map', // 18349ms
  entry: ['react-hot-loader/patch', '../src/index'],
  resolve: Object.assign(base.resolve, {
    alias: {
      joi: 'joi-browser',
    },
  }),
  output: {
    path: path.resolve('./bundles/'),
    filename: '[name].js',
    publicPath: `http://${jsBundleHost}:${port}/bundles/`,
  },
  module: {
    rules: base.rules(true),
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
