const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config/webpack.config.dev');
const port = require('../config/webpack.base').port;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  stats: 'minimal',
  // si non précisé, webpack tente des GET de /sockjs-node sur port 8080
  port: port,
}).listen(port, 'devorgarif', function (err, result) {
  if (err) {
    /*oklog*/ console.log(err);
  }
  /*oklog*/ console.log('Dev server listening at devorgarif:' + port);
});
