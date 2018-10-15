import { LangData } from 'external/redux/modules/locale'
import { AboutScene } from 'external/scenes/about'
import { ArticlesScene } from 'external/scenes/articles'
import { HomeScene } from 'external/scenes/home'
import { createMenuBuilder } from 'menu-system'
import { Route } from 'menu-system/route-item'

export type LangRoute = Route<any, any, LangData>

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