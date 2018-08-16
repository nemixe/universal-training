const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const writeFilePlugin = require('write-file-webpack-plugin')

const res = p => path.resolve(__dirname, p)

const nodeModule = res('../node_modules')
const entry = res('../server/renderer.js')
const output = res('../build')

const externals = fs
  .readdirSync(nodeModule)
  .filter(x => !/\.bin|react-u`niversal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

externals['react-dom/server'] = 'commonjs react-dom/server'

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  mode: 'development',
  entry: ['regenerator-runtime/runtime.js', entry],
  output: {
    path: output,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals,
  resolve: { extensions: ['.js', 'css'] },
  plugins: [
    new writeFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
