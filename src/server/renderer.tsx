import { Request, Response } from 'express'
import { configureStore, RootStore } from 'external/redux'
import { Langs, setMessages } from 'external/redux/modules/locale'
import { LangRoute } from 'external/routes'
import { Scenes } from 'external/scenes'
import { Html, HtmlProps } from 'external/scenes/html'
import { getLang } from 'external/utils/locale'
import { createMemoryHistory } from 'history'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { Store } from 'redux'
import { getCurrentRoute } from 'routes'
import { Subject, Subscription } from 'rxjs'

const renderHTML = (props: HtmlProps) => {
  const html = renderToString(<Html {...props} />)

  return `<!doctype html> ${html}`
}

interface LoadRouteArgs {
  req: Request
  store: Store<RootStore>,
  lang: Langs,
  stream: Subject<{}>
}

const loadRouteDepencies = ({ req, store, lang, stream }: LoadRouteArgs) => {
  const currentRoute = getCurrentRoute(req.path, lang) as LangRoute | null
  const subscriptions: Subscription[] = []
  const loadingFinished: boolean[] = []

  store.dispatch(setMessages({
    lang,
    messages: global.locales[lang]
  }))

  if (currentRoute) {
    const component = currentRoute.meta.component
    if (component.getInitialProps) {
      const subscription = component.getInitialProps({
        store,
        lang,
        location: req.path
      })

      subscriptions.push(subscription)
    }
  }

  if (subscriptions.length === 0)
    stream.next()

  subscriptions.forEach((s, i) => {
    loadingFinished.push(false)

    s.add(() => {
      loadingFinished[i] = true
      if (loadingFinished.every(x => x)) {
        stream.next()
      }
    })
  })

  return stream
}

export const handleRender = (req: Request, res: Response) => {
  const history = createMemoryHistory({
    initialEntries: [req.url],
    initialIndex: 0
  })

  const store = configureStore(history)
  const lang = getLang(req.url)

  const stream = new Subject()

  stream.subscribe(() => {
    const context: any = {}

    const markup = renderToString(
      <Provider store={store}>
        <IntlProvider
          key={lang}
          locale={lang}
          messages={store.getState().locale.messages[lang]}
          textComponent={React.Fragment}
        >
          <StaticRouter location={req.url} context={context}>
            <Scenes />
          </StaticRouter>
        </IntlProvider>
      </Provider>
    )

    const preloadedState = store.getState()

    if (context.statusCode)
      res.status(context.statusCode)

    res.send(renderHTML({ markup, preloadedState, lang }))
  })

  loadRouteDepencies({ req, store, lang, stream })
}
