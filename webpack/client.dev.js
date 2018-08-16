const path = require('path')
const webpack = require('webpack')
const writeFilePlugin = require('write-file-webpack-plugin')

const res = p => path.resolve(__dirname, p)

const entry = res('../client/index.js')
const output = res('../public/assets/js')

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    entry
  ],
  output: {
    path: output,
    filename: '[name].js',
    chunkFilename: '[name].js',
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
  resolve: {
    extensions: ['.js', '.css']
  },
  plugins: [
    new writeFilePlugin(),
    // new extractCssChunks(),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
