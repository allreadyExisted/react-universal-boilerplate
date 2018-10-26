import { T } from 'common/@components/t'
import { connect, DispatchProps } from 'common/redux/connect'
import { externalRoutes, LangRoute } from 'external/routes'
import { LL } from 'external/scenes/@components/locale-link'
import React from 'react'
import { RouterState } from 'react-router-redux'
import theme from '../../theme.css'

type ComponentProps =
  DispatchProps &
  RouterState

const { articles, about } = externalRoutes

class ListComponent extends React.PureComponent<ComponentProps> {
  render() {
    return <ul className={theme.list}>
    {this.renderItem(articles._, 'articles')}
    {this.renderItem(about._, 'about')}
  </ul>
  }

  private renderItem = (route: LangRoute, rid: string) => <li className={theme.item}>
    <LL
      route={route}
      className={theme.link}
      activeClassName={theme.active}
    >
      <T id={`ep.pages.${rid}.title`} />
    </LL>
  </li>
}

// tslint:disable-next-line:variable-name
export const List = connect<RouterState>(({ router: { location } }) =>
  ({ location }))(ListComponent)