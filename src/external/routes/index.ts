import { RootStore } from 'external/redux'
import { LangData, Langs } from 'external/redux/modules/locale'
import { AboutScene } from 'external/scenes/about'
import { ArticlesScene } from 'external/scenes/articles'
import { HomeScene } from 'external/scenes/home'
import { createMenuBuilder } from 'menu-system'
import { Route } from 'menu-system/route-item'
import React from 'react'
import { Store } from 'redux'
import { Subscription } from 'rxjs'

interface GetInitialPropsFnArgs {
  store: Store<RootStore>
  lang: Langs
  location: string
}

export type GetInitialPropsFn = (args: GetInitialPropsFnArgs) => Subscription

export interface StaticMethods {
  getInitialProps?: GetInitialPropsFn
}

export type RouteComponentType = (
  React.ComponentType<{}> & StaticMethods
) | (
  React.ComponentClass<{}, any> & StaticMethods
)

export abstract class ClassStaticMethods {
  static getInitialProps?: GetInitialPropsFn
}

interface RouteMeta {
  component: RouteComponentType
}

export type LangRoute = Route<RouteMeta, any, LangData>

const builder = createMenuBuilder()

export const externalTree = builder.tree(({ route, arg }) => ({
  lang: arg({
    children: {
      home: route({
        meta: {
          component: HomeScene
        },
        path: '/'
      }),
      articles: route({
        meta: {
          component: ArticlesScene
        }
      }),
      about: route({
        meta: {
          component: AboutScene
        }
      })
    }
  })
}))

export const externalRoutes = builder.build(externalTree).routes.lang