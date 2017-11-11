const webpack = require('webpack')
const {
  createConfig,
  babel,
  devServer,
  addPlugins,
  defineConstants,
  entryPoint,
  env,
  setOutput,
  sourceMaps
} = require('webpack-blocks')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = createConfig([
  babel(),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]),
  env('development', [
    entryPoint('./src/main.dev.js'),
    setOutput({
      path: './build/bundle.[hash].js',
      publicPath: '/'
    }),
    devServer(),
    devServer.proxy({
      '/api': { target: 'http://localhost:8888' }
    }),
    sourceMaps('eval')
  ]),
  env('production', [
    entryPoint('./src/main.dev.js'),
    setOutput('./build/bundle.[hash].js'),
    addPlugins([
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        }
      })
    ])
  ])
])
