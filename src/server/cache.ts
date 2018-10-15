// import { NextFunction, Request, Response } from 'express'
// import { getLang } from 'external/utils/locale'
// import mcache from 'memory-cache'
// import { CACHE_PAGES_EXPIRE } from 'server/params'
// import { routes } from 'routes';

// export const cache = (req: Request, res: Response, next: NextFunction) => {
//   const key = '__express__' + req.path
//   const notFoundKey = '__express__404'
//   const cacheBody = mcache.get(key)
//   const notFoundBody = mcache.get(notFoundKey)
//   const lang = getLang(req.path)

//   const activeRoute = routes.findRoute()
//   // const activeRoute = allRoutes.find(route => req.path === route.paths[lang])

//   const customeSend = (cacheKey: string, status?: 404) => {
//     const sendResponse = res.send
//     res.send = (body) => {
//       mcache.put(cacheKey, body, CACHE_PAGES_EXPIRE)
//       res.send = sendResponse
//       return status
//         ? res.status(status).send(body)
//         : res.send(body)
//     }
//     next()
//   }

//   if (activeRoute) {
//     if (cacheBody) {
//       res.send(cacheBody)
//       return
//     } else {
//       customeSend(key)
//     }
//   } else {
//     if (notFoundBody) {
//       res.status(404).send(notFoundBody)
//       return
//     } else {
//       customeSend(notFoundKey, 404)
//     }
//   }
// }
