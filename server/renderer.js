import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames, clearChunks } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { StaticRouter } from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import Routes from '../client/Routes'

export default ({ clientStats }) => (req, res) => {
  clearChunks()
  const context = {}

  const template = (
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(Routes)}
    </StaticRouter>
  )

  const app = ReactDOM.renderToString(template)
  const chunkNames = flushChunkNames()

  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  return res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>react-universal-component-boilerplate</title>
          ${styles}
        </head>
        <body>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
  )
}
