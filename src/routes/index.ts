import { externalTree } from 'external/routes'
import { createMenuBuilder } from 'menu-system'

const builder = createMenuBuilder()

export const { routes, findRoute } = builder.build({
  ...externalTree
})