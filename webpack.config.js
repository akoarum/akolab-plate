const webpack = require('webpack');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Notifier = require('node-notifier');
const config = require('./config');
const RELEASE = /release/.test(process.env.npm_lifecycle_event);

let modules = [];

/* ==============================================
 * CSSファイルのコンパイル
 * =========================================== */

const scss = config.scss.map((setting) => {
  let file = setting;
  file.module = {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize',
            'postcss-loader',
            'sass-loader'
          ]
        })
      }
    ]
  };
  file.plugins = [
    new ExtractTextPlugin(file.output.filename),
    new CompressionPlugin()
  ];
  return file;
});

modules = modules.concat(scss);


/* ==============================================
 * JSファイルのコンパイル
 * =========================================== */

const jsPlugin = [
  new FlowStatusWebpackPlugin({
    onSuccess: function(stdout) {
      console.log(stdout);
      Notifier.notify({ title: 'Flow', message: 'Flow is SUCCESS' });
    },
    onError: function(stdout) {
      console.log(stdout);
      Notifier.notify({ title: 'Flow', message: 'Flow is FAILED' });
    },
    restartFlow: false,
    failOnError: true,
    binaryPath: './node_modules/.bin/flow'
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    Promise: 'es6-promise'
  }),
  new CompressionPlugin()
];

if (RELEASE) {
  jsPlugin.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

const js = config.js.map((setting) => {
  let file = setting;
  file.module = {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:  [
            [
              "env",
              {
                "targets": {
                  "browsers": ["last 2 versions", "safari >= 7"]
                }
              }
            ],
            "stage-0",
            "flow"
          ],
          plugins: ['transform-flow-strip-types', 'babel-plugin-transform-object-assign']
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  };
  file.plugins = jsPlugin;
  return file;
});

modules = modules.concat(js);

module.exports = modules;
