const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const clientConfigDev = require('../webpack/client.dev')
const serverConfigDev = require('../webpack/server.dev')
const clientConfigProd = require('../webpack/client.prod')
const serverConfigProd = require('../webpack/server.prod')

const { publicPath } = clientConfigDev.output
const outputPath = clientConfigDev.output.path
const DEV = process.env.NODE_ENV === 'development'
const app = express()

let isBuilt = false

const done = () =>
  !isBuilt &&
  app.listen(3000, () => {
    isBuilt = true
    console.log('Build Complete')
  })

if (DEV) {
  const compiler = webpack([clientConfigDev, serverConfigDev])
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { color: true } }
  const devMiddleware = webpackDevMiddleware(compiler, options)

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  devMiddleware.waitUntilValid(done)
} else {
  webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../build/server.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })
}
