import { connect, DispatchProps } from 'common/redux/connect'
import { LangData } from 'external/redux/modules/locale'
import { LangRoute } from 'external/routes'
import { getLocaleUrl } from 'external/utils/location'
import React from 'react'
import { Omit } from 'react-redux'
import { NavLink, NavLinkProps } from 'react-router-dom'

type ComponentProps =
  DispatchProps &
  StateProps &
  OwnProps

interface OwnProps extends Omit<NavLinkProps, 'to'> {
  route: LangRoute
}

interface StateProps extends LangData {}

class LLComponent extends React.Component<ComponentProps> {
  render() {
    const { route, lang, children, dispatch, ...props } = this.props
    const to = getLocaleUrl(route, lang)
    return <NavLink to={to} {...props}>
      {children}
    </NavLink>
  }
}

export const LL = connect<StateProps>(({ locale: { lang } }) =>
  ({ lang }))(LLComponent)