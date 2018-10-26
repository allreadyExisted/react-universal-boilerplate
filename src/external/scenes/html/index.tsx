import { isDev } from 'common/utils'
import { RootStore } from 'external/redux'
import { LangData } from 'external/redux/modules/locale'
import React from 'react'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

export interface HtmlProps extends LangData {
  markup: string
  preloadedState: RootStore
}

export class Html extends React.Component<HtmlProps> {
  render() {
    const head = Helmet.rewind()
    const { markup, preloadedState, lang } = this.props

    return <html lang={lang} prefix="og: http://ogp.me/ns#">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {!isDev && <link rel="stylesheet" href={`/external.css?v=${BUILD_HASH}`} />}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${serialize({}, { isJSON: true })};`
          }}
          charSet="UTF-8"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_DATA__=${serialize(preloadedState, { isJSON: true })};`
          }}
          charSet="UTF-8"
        />
        <script src={`/vendors.js?v=${BUILD_HASH}`} />
        <script src={`/external.js?v=${BUILD_HASH}`} />
      </body>
    </html>
  }
}