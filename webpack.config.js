'use strict';

const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const externals = require('webpack-node-externals');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'producton' : 'none',
  devtool: 'inline-source-map',
  entry: { server: './index.ts' },
  target: 'node',
  externals: [externals()],
  plugins: [
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
  ],
  resolve: {
    extensions: ['.ts'],
    modules: [
      'node_modules',
      'db',
      'src'
    ],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.ts?$/,
      exclude: /node_modules/,
      loader: 'happypack/loader?id=ts'
    }]
  }
}
