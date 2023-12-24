const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')

const baseConfig = require('./webpack.base')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const OUTPUT_PATH = path.resolve(CONTEXT_PATH, 'dist')
const CONFIG_ENV = 'production'

module.exports = merge(baseConfig, {
  mode: CONFIG_ENV,
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    path: OUTPUT_PATH,
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve(CONTEXT_PATH, '.env'),
      // webpack 5 should skip stub
      ignoreStub: true
    }),
    new Dotenv({
      path: path.resolve(CONTEXT_PATH, `.env.${CONFIG_ENV}`),
      // webpack 5 should skip stub
      ignoreStub: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css',
      ignoreOrder: false
    })
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  devtool: 'source-map'
})
