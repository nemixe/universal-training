const webpack = require('webpack')
const path = require('path')

const res = p => path.resolve(__dirname, p)
const entry = res('../server/renderer.js')
const output = res('../build')

module.exports = {
  name: 'server',
  target: 'node',
  devtool: 'source-map', // create file map to make source debuggable
  mode: 'production',
  entry: [entry],
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
  resolve: {
    extensions: ['.js', '.css']
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(), // unknown
    new webpack.optimize.OccurrenceOrderPlugin(), // unknown
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1 // limit chunks to 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production') // define variable NODE_ENV
      }
    }),
    new webpack.HashedModuleIdsPlugin() // unknown
  ]
}
