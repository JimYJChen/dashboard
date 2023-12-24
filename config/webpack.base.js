const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const CONTEXT_PATH = path.resolve(__dirname, '../')
const ENTRY_PATH = path.resolve(CONTEXT_PATH, 'src')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  context: CONTEXT_PATH,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        use: [
          {
            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentContext: ENTRY_PATH,
                localIdentHashSalt: 'cesarlai',
                exportLocalsConvention: 'camelCaseOnly',
                exportOnlyLocals: false
              }
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        include: ENTRY_PATH,
        exclude: path.resolve(CONTEXT_PATH, 'node_modules'),
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'static/[name].[contenthash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    // polyfill for process in web app
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/favicon.ico', to: './' }]
    }),
    new TsconfigPathsPlugin({
      configFile: path.resolve(CONTEXT_PATH, 'tsconfig.json')
    })
  ],
  resolve: {
    alias: {
      '@': ENTRY_PATH
    },
    modules: [ENTRY_PATH, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/')
    }
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true
  }
}
