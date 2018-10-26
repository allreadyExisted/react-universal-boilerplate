import 'intl'
// tslint:disable-next-line:ordered-imports
import 'common/locale'
import { App } from 'external/app'
import 'polyfills/to-blob.js'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.hydrate(<App />, document.getElementById('app'))
