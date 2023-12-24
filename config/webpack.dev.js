const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')

const baseConfig = require('./webpack.base')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const OUTPUT_PATH = path.resolve(CONTEXT_PATH, 'dist')
const CONFIG_ENV = 'development'

module.exports = merge(baseConfig, {
  mode: CONFIG_ENV,
  entry: './src/index.tsx',
  output: {
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
      ignoreOrder: false
    }),
    new Dotenv({
      path: path.resolve(CONTEXT_PATH, '.env'),
      // webpack 5 should skip stub
      ignoreStub: true
    }),
    new Dotenv({
      path: path.resolve(CONTEXT_PATH, `.env.${CONFIG_ENV}`),
      // webpack 5 should skip stub
      ignoreStub: true
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 3000,
    open: true,
    // historyApiFallback: true
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  },
  optimization: {
    moduleIds: 'named'
  }
})
