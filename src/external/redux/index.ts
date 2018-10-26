import { ApiError } from 'common/api/error/api-error'
import { isBrowser } from 'common/utils'
import { addApiErrors } from 'external/redux/modules/errors'
import { localeHandler, LocaleStore } from 'external/redux/modules/locale'
import { History } from 'history'
import {
  routerMiddleware,
  routerReducer,
  RouterState
} from 'react-router-redux'
import { Action, applyMiddleware, compose, createStore } from 'redux'
import { combineHandlers, handlerMiddleware } from 'redux-handler'
import { actionSanitizer } from 'redux-handler/utils'

interface HandlersStore {
  locale: LocaleStore
}

interface OtherStore {
  router: RouterState
}

export type RootStore = HandlersStore & OtherStore

const reducer = combineHandlers<HandlersStore>({
  locale: localeHandler
}).buildReducer<OtherStore>({
  router: routerReducer
})

const composes = (h: History) => [
  applyMiddleware(
    handlerMiddleware({
      errorHandler: (error, { type }): Action | void => {
        if (error instanceof ApiError) {
          return addApiErrors({
            id: type,
            errors: error.errors,
            ajaxError: error.ajaxError
          })
        }

        // Unhandled API error:
        throw error
      }
    }),
    routerMiddleware(h)
  )
]

const composeEnhancers: typeof compose = isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionSanitizer,
      stateSanitizer: (state: RootStore) =>
        // tslint:disable-next-line:no-object-literal-type-assertion
        ({ ...state, locale: { messages: 'HIDDEN' as any } } as RootStore)
    })
  : compose

export const configureStore = (h: History, initialData?: any) => initialData
  ? createStore(reducer, initialData, composeEnhancers(...composes(h)))
  : createStore(reducer, composeEnhancers(...composes(h)))
