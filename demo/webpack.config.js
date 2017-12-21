'use strict';

/***********************************************************************************************************************************************
 * CONTINUUM DEMO - WEBPACK CONFIG
 ***********************************************************************************************************************************************
 * @description
 */
const html = require('html-webpack-plugin');
const Server = require('json-server');
const path = require('path');
const dotenv = require('dotenv-webpack');
const webpack = require('webpack');

/**
 * Webpack Config``
 * @param  {[type]} env [description]
 * @return {[type]}     [description]
 */
module.exports = function(env={}) {
  const server = Server.create();
  const router = Server.router(path.join(__dirname, '.data', 'db.json'));
  const middlewares = Server.defaults({noCors: true});

  server.use(middlewares);
  
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    res.header('Access-Control-Expose-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  });

  server.use(router);
  server.listen(env.API && env.API.split(':')[2] || 9000);

  return {
    entry: [path.join(__dirname, 'index.js')],
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist')
    },
    devtool: '#source-map',
    devServer: {
      port: env.port || 9001,
      contentBase: path.join(__dirname)
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.(js|jsx)$/, loader: "babel-loader" },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.(scss|sass)?$/, use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        },
      ]
    },
    node: {
      __dirname: true,
      net: "empty",
      dns: "empty",
      fs: "empty"
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '~': path.join(__dirname),
        'continuum': path.join(process.cwd(), 'src')
      }
    },
    plugins: [
      new html({template: path.join(__dirname, 'index.html')}),
      new webpack.DefinePlugin({
        'process.env': {
          API: JSON.stringify(env.API || '')
        }
      }),
      new dotenv()
    ]
  }
}
