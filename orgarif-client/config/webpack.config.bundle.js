const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const base = require('./webpack.base');

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: ['whatwg-fetch', '../src/index'],
  resolve: base.resolve,
  output: {
    path: path.resolve('./build/'),
    chunkFilename: '[name].[chunkhash].bundle.js',
    filename: 'app.[chunkhash].js',
    publicPath: '/res/',
  },
  module: {
    rules: base.rules(false),
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new webpack.HashedModuleIdsPlugin(),
    new AssetsPlugin(),
  ],
};
