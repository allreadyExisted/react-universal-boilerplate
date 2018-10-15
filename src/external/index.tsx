import 'intl'
// tslint:disable-next-line:ordered-imports
import 'common/locale'
import { App } from 'external/app'
import React from 'react'
import ReactDOM from 'react-dom'
import '../polyfills/to-blob.js'

ReactDOM.render(<App />, document.getElementById('root'))
