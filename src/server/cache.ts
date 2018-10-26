import { NextFunction, Request, Response } from 'express'
import { LangRoute } from 'external/routes'
import { getLang } from 'external/utils/locale'
import mcache from 'memory-cache'
import { getCurrentRoute } from 'routes'
import { CACHE_PAGES_EXPIRE } from 'server/params'

export const cache = (req: Request, res: Response, next: NextFunction) => {
  const key = '__express__' + req.path
  const notFoundKey = '__express__404'
  const cacheBody = mcache.get(key)
  const notFoundBody = mcache.get(notFoundKey)
  const lang = getLang(req.path)

  const existRoute = getCurrentRoute(req.path, lang) as LangRoute | null

  const customeSend = (cacheKey: string, status: 404 | 200 = 200) => {
    const sendResponse = res.send
    res.send = (body) => {
      mcache.put(cacheKey, body, CACHE_PAGES_EXPIRE)
      res.send = sendResponse
      return res.status(status).send(body)
    }
    next()
  }

  if (existRoute) {
    if (cacheBody) {
      res.send(cacheBody)
      return
    } else {
      customeSend(key)
    }
  } else {
    if (notFoundBody) {
      res.status(404).send(notFoundBody)
      return
    } else {
      customeSend(notFoundKey, 404)
    }
  }
}
