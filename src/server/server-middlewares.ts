import compression from 'compression'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'

export const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

export const serveGzipped = (contentType: string) => (req: Request, res: Response, next: NextFunction) => {
  // does browser support gzip? does the file exist?
  const acceptedEncodings = req.acceptsEncodings()
  const file = req.url.split('?')
  if (
    acceptedEncodings.indexOf('gzip') === -1
    || !fs.existsSync(`./public${file[0]}.gz`)
  ) {
    next()
    return
  }

  // update request's url
  req.url = `${file[0]}.gz?${file[1]}`

  // set correct headers
  res.set('Content-Encoding', 'gzip')
  res.set('Content-Type', contentType)

  // let express.static take care of the updated request
  next()
}