const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const PugPlugin = require('pug-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const replaceExt = require('replace-ext')
const projectConfig = require('./project.config')

const { srcPath, buildPath, templatePath } = projectConfig
const templateFiles = fs.readdirSync(path.resolve(__dirname, templatePath))

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : 'source-map',

  output: {
    path: path.join(__dirname, buildPath)
  },

  entry: {
    ...templateFiles.reduce((acc, templateFile) => {
      const templateName = templateFile.split('.pug')[0]
      const templateFilePath = `${templatePath}/${templateFile}`
      acc[templateName] = templateFilePath
      return acc
    }, {})
  },

  devServer: {
    static: path.join(__dirname, buildPath),
    compress: true,
    port: 9000,
    hot: true
  },

  optimization: {
    minimizer: [new TerserJSPlugin(), new CssMinimizerPlugin()]
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },

      {
        test: /\.pug$/,
        loader: PugPlugin.loader
      },

      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader']
      },

      {
        test: /\.svg|eot|ttf|woff|woff2$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]'
        }
      },

      {
        test: /[\\/]images[\\/].+\.(png|svg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]'
        }
      }
    ]
  },

  plugins: [
    new ESLintPlugin(),
    new PugPlugin({
      js: {
        // output name of a generated JS file
        filename: devMode
          ? 'assets/js/[name].js'
          : 'assets/js/[name].[contenthash].js'
      },
      css: {
        // output name of a generated CSS file
        filename: devMode
          ? 'assets/css/[name].css'
          : 'assets/css/[name].[contenthash:8].css'
      }
    })
  ]
}

if (devMode) {
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:9000/',
        files: [
          {
            match: ['**/*.pug']
          }
        ]
      },
      {
        reload: false
      }
    )
  )
}
