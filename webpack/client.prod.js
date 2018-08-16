const path = require('path')
const webpack = require('webpack')

const res = p => path.resolve(__dirname, p)

const entry = res('../client/index.js')
const output = res('../public/assets/js')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  mode: 'production',
  entry: [entry],
  output: {
    path: output,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/public/'
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
  resolve: { extensions: ['.js', '.css'] },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
}
