import { Langs } from 'external/redux/modules/locale'
import { externalTree } from 'external/routes'
import { createMenuBuilder } from 'menu-system'

const builder = createMenuBuilder()

export const { routes, findRoute } = builder.build({
  ...externalTree
})

export const getCurrentRoute = (path: string, lang: Langs) =>
  (path === '/' || path === `/${lang}/home`)
    ? routes.lang.home._
    : findRoute(path)