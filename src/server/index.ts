import bodyParser from 'body-parser'
import 'common/locale'
import compression from 'compression'
import { config } from 'config'
import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { apiRouter } from 'server/api'
import { cache } from 'server/cache'
import { getLocales } from 'server/params'
import { handleRender } from 'server/renderer'
import { getMovedPermanent } from 'server/routes'
import {
  serveGzipped,
  shouldCompress
} from 'server/server-middlewares'
import { rootDir } from '../../webpack/tools'

const app = express()

getLocales()

// added gzip to js, css files
app.get(/\.js(?:\?.*|)$/i, serveGzipped('text/javascript'))
app.get(/\.css(?:\?.*|)$/i, serveGzipped('text/css'))

app.use(express.static(path.join(rootDir, './dist/static')))

// added gzip to headers
app.use(compression({ filter: shouldCompress }))

// added cookie to response
app.use(cookieParser())

// added api to send email
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', apiRouter)

// redirect if need
app.use((req, res, next) => {
  const pathname = req.originalUrl.endsWith('/')
    ? req.originalUrl.slice(0, -1)
    : req.originalUrl

  const movedPermanent = getMovedPermanent(pathname)

  if (movedPermanent) {
    res.redirect(301, movedPermanent + req.url.slice(req.path.length))
  } else {
    next()
  }
})

app.get('*', cache, handleRender)

app.listen(config.port, config.host, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening at http://${config.host}:${config.port}\n`)
})

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
})
