// webpack.config.js
const path = require('path')
const fs = require('fs')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const PugPlugin = require('pug-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const projectConfig = require('./project.config')

const { buildPath, templatePath } = projectConfig
const devMode = process.env.NODE_ENV === 'development'

const templateFiles = fs
  .readdirSync(path.resolve(__dirname, templatePath))
  .filter((f) => f.endsWith('.pug'))

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : 'source-map',

  entry: templateFiles.reduce((acc, file) => {
    const name = file.replace(/\.pug$/, '')
    acc[name] = `${templatePath}/${file}`
    return acc
  }, {}),

  output: {
    path: path.join(__dirname, buildPath),
    clean: true
  },

  // (optional) disable cache while stabilizing HMR; re-enable later
  // cache: { type: 'filesystem' },
  cache: false,

  devServer: {
    static: path.join(__dirname, buildPath),
    compress: true,
    port: 9000,
    hot: true, // Webpack injects HMR runtime automatically
    liveReload: true,
    watchFiles: [
      'src/**/*.pug',
      'src/**/*.js',
      'src/**/*.sass',
      'src/**/*.scss',
      'src/**/*.css'
    ]
  },

  optimization: {
    minimize: !devMode,
    minimizer: ['...', new CssMinimizerPlugin()]
  },

  performance: { maxEntrypointSize: 512000, maxAssetSize: 512000 },

  module: {
    rules: [
      {
        // JS
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }
      },

      { test: /\.pug$/, loader: PugPlugin.loader },

      // Styles (no style-loader)
      {
        test: /\.(s[ac]ss)$/i,
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['css-loader', 'postcss-loader']
      },

      {
        // Fonts
        test: /\.(eot|ttf|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: devMode
            ? 'assets/fonts/[name][ext]'
            : 'assets/fonts/[name].[contenthash:8][ext]'
        }
      },

      {
        // Images
        test: /[\\/]images[\\/].+\.(png|svg|jpe?g|gif|mov|mp4|ico|webmanifest|xml)$/i,
        type: 'asset/resource',
        generator: {
          filename: devMode
            ? 'assets/img/[name][ext]'
            : 'assets/img/[name].[hash:8][ext]'
        }
      }
    ]
  },

  plugins: [
    new ESLintPlugin({
      extensions: ['js'],
      emitWarning: true,
      failOnWarning: false,
      failOnError: false
    }),

    new PugPlugin({
      js: {
        filename: devMode
          ? 'assets/js/[name].js'
          : 'assets/js/[name].[contenthash].js'
      },
      css: {
        filename: devMode
          ? 'assets/css/[name].css'
          : 'assets/css/[name].[contenthash:8].css'
      }
    })
  ]
}
