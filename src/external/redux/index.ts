import { ApiError } from 'common/api/error/api-error'
import { addApiErrors } from 'external/redux/modules/errors'
import { localeHandler, LocaleStore } from 'external/redux/modules/locale'
import { createBrowserHistory, History } from 'history'
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

export const history = createBrowserHistory()

// // Restore last visited location
// const lastUrl = userStore.load()[UserStoreKeys.LastLocationUrl]
// if (lastUrl) {
//   const lastMenuItem = menu.findItem(menu.items._index.fullpath + '/' + lastUrl)

//   if (lastMenuItem) {
//     const parser = document.createElement('a')
//     parser.href = document.referrer

//     if (
//       document.referrer &&
//       !parser.pathname.startsWith(menu.items._index.fullpath)
//     )
//       history.push(lastMenuItem.fullpath)
//   }
// }

// const saveLastLocation = () => {
//   const parts = location.pathname
//     .substring(1)
//     .split('/')
//     .slice(1)

//   userStore.save({ [UserStoreKeys.LastLocationUrl]: parts.join('/') })
// }

// history.listen(({ pathname }) => {
//   saveLastLocation()

//   // Navigate to top for menu items
//   const menuItem = menu.findItem(pathname, Adapt.is('desktop') ? 2 : 3)!
//   if (
//     menuItem.fullpath === pathname ||
//     pathname.startsWith(menu.items.support.history.chat.fullpath)
//   )
//     window.scrollTo(0, 0)
// })

// // Save on initial loading (manual navigation to page)
// const currentMenu = menu.findItem(location.pathname)
// if (currentMenu && currentMenu !== menu.items._index) saveLastLocation()

// /**
//  * Catch common global errors
//  */
// export const globalCatch = (error: any) => {
//   if (error instanceof ApiError && error.ajaxError) {
//     store.dispatch(showSystemErrorModal(new ServerError(error.ajaxError)))
//   }

//   if (error instanceof ServerError) {
//     store.dispatch(showSystemErrorModal(error))
//   }

//   throw error
// }

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

const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
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

export const store = configureStore(history, window.__INITIAL_DATA__)
