const webpack = require('webpack');
const path = require('path');

const port = 3300;
const excludes = ['./node_modules', './build', './bundles/'].map(e =>
  path.resolve(e)
);
const rules = (hotLoader /*boolean*/, tsconfigFile /*string | undefined*/) => {
  const finalTsconfigFile = tsconfigFile ? tsconfigFile : 'tsconfig.json';
  const awesomeTypescriptLoader =
    'awesome-typescript-loader?configFileName=' + finalTsconfigFile;
  const typescriptLoaders = hotLoader
    ? ['react-hot-loader/webpack', awesomeTypescriptLoader]
    : awesomeTypescriptLoader;
  return [
    {
      test: /\.tsx?$/,
      use: typescriptLoaders,
      exclude: excludes
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    }
  ];
};

// noinspection WebpackConfigHighlighting
module.exports = {
  excludes,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  rules,
  port
};
