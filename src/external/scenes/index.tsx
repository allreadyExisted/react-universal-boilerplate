import { langs } from 'common/locale'
import 'common/theme/index.css'
import { externalRoutes } from 'external/routes'
import { Header } from 'external/scenes/@components/header'
import { NotFound } from 'external/scenes/not-found'
import { getLocaleUrl } from 'external/utils/location'
import React from 'react'
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom'

type ComponentProps = RouteComponentProps<{}>

class ScenesComponent extends React.PureComponent<ComponentProps> {
  render() {
    return (
      <>
        <Header />
        <main>
          <Switch>
            {this.renderRoutes()}
            <Route component={NotFound} />
          </Switch>
        </main>
      </>
    )
  }

  private renderRoutes = () => {
    const result: JSX.Element[] = []

    langs.forEach(lang => {
      externalRoutes._.children.forEach(route => {
        const path = getLocaleUrl(route, lang)

        result.push(
          <Route
            key={path}
            strict
            exact
            path={path}
            component={route.meta.component}
          />
        )
      })
    })

    return result
  }
}

// tslint:disable-next-line:variable-name
export const Scenes = withRouter(ScenesComponent)