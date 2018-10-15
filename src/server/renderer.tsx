// import { Request, Response } from 'express'
// import { configureStore, ExternalRootStore } from 'external/redux'
// import { Langs, setMessages } from 'external/redux/modules/locale'
// import { CustomeRouteConfig, routes } from 'external/routes'
// import { Scenes } from 'external/scenes'
// import { Html } from 'external/scenes/html'
// import { getLang } from 'external/utils/locale'
// import { createMemoryHistory } from 'history'
// import React from 'react'
// import { renderToString } from 'react-dom/server'
// import { IntlProvider } from 'react-intl'
// import { Provider } from 'react-redux'
// import { StaticContext, StaticRouter } from 'react-router'
// import { matchRoutes } from 'react-router-config'
// import { Store } from 'redux'
// import { Subject, Subscription } from 'rxjs'

// const renderHTML = (markup: string, preloadedState: ExternalRootStore, lang: Langs) => {
//   const html = renderToString(<Html markup={markup} preloadedState={preloadedState} lang={lang} />)

//   return `<!doctype html> ${html}`
// }

// const loadRouteDepencies = (req: Request, store: Store<ExternalRootStore>, lang: Langs, stream: Subject<any>) => {
//   const currentRoute = matchRoutes<any>(routes, req.url)
//   const subscriptions: Subscription[] = []
//   const loadingFinished: boolean[] = []

//   store.dispatch(setMessages({ lang, messages: global[lang === 'ru' ? 'messagesRu' : 'messagesEn'] }))
//   currentRoute.map(({ route }) => {
//     const component = (route as CustomeRouteConfig).component
//     if (component.getInitialProps) {
//       const subscription = component.getInitialProps(
//         store,
//         lang,
//         req.path
//       )

//       subscriptions.push(subscription)
//     }
//   })

//   if (subscriptions.length === 0)
//     stream.next()

//   subscriptions.forEach((s, i) => {
//     loadingFinished.push(false)

//     s.add(() => {
//       loadingFinished[i] = true
//       if (loadingFinished.every(x => x)) {
//         stream.next()
//       }
//     })
//   })

//   return stream
// }

// export const handleRender = (req: Request, res: Response) => {
//   const history = createMemoryHistory({
//     initialEntries: [req.url],
//     initialIndex: 0
//   })

//   const store = configureStore(history)
//   const lang = getLang(req.url)

//   const stream = new Subject<{ notFound: boolean }>()

//   stream.subscribe(() => {
//     const context: StaticContext = {}

//     const markup = renderToString(
//       <Provider store={store}>
//         <IntlProvider
//           key={lang}
//           locale={lang}
//           messages={store.getState().locale.messages[lang]}
//           textComponent={React.Fragment}
//         >
//           <StaticRouter location={req.url} context={context}>
//             <Scenes />
//           </StaticRouter>
//         </IntlProvider>
//       </Provider>
//     )

//     const preloadedState = store.getState()

//     if (context.statusCode)
//       res.status(context.statusCode)

//     res.send(renderHTML(markup, preloadedState, lang))
//   })

//   loadRouteDepencies(req, store, lang, stream)
// }
