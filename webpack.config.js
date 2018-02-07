const path = require('path');
const getRepositoryName = require('git-repo-name').sync;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const SETTINGS = require('./settings');

const production = process.env.NODE_ENV === 'production';

const loaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: path.join(__dirname, 'src'),
    exclude: /node_modules/,
  },
];

const pluginBase = [
  new HtmlWebpackPlugin({ template: 'template.ejs' }),
  new BundleAnalyzerPlugin({ analyzerMode: production ? 'static' : 'disabled' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
    },
  }),
];

const developmentPlugins = [
  //...pluginBase,
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new OpenBrowserPlugin({ url: `http://localhost:${SETTINGS.PORT}` }),
];

const productionPlugins = [
  ...pluginBase,
  new LodashModuleReplacementPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      sequences: true,
      booleans: true,
      loops: true,
      unused: false,
      warnings: false,
      drop_console: true,
      unsafe: true,
    },
  }),
];

module.exports = {
  devtool: production ? false : 'eval',

  entry: production
    ? path.join(__dirname, 'src/index')
    : [
        `webpack-dev-server/client?http://localhost:${SETTINGS.PORT}`,
        'webpack/hot/only-dev-server',
        path.join(__dirname, './src/index'),
      ],

  output: {
    path: SETTINGS.PUBLIC_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  module: { loaders },
  plugins: production ? productionPlugins : developmentPlugins,
};
