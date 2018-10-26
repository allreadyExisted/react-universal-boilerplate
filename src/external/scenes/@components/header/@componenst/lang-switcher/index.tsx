import cn from 'classnames'
import { connect, DispatchProps } from 'common/redux/connect'
import { fetchLocale, Langs, LocaleStore, setLang } from 'external/redux/modules/locale'
import { LangRoute } from 'external/routes'
import { DEFAULT_ROOT_URL, getLocaleUrl } from 'external/utils/location'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { getCurrentRoute } from 'routes'
import theme from '../../theme.css'

interface StateProps {
  locale: LocaleStore
}

type ComponentProps =
  RouteComponentProps<{}> &
  DispatchProps &
  StateProps

class LangSwitcherComponent extends React.PureComponent<ComponentProps> {
  render() {
    return <div className={theme.langSwitcher}>
      {this.renderItem('ru')}
      {' | '}
      {this.renderItem('en')}
    </div>
  }

  private renderItem = (lang: Langs) => {
    const currentLang = this.props.locale.lang
    return <a
      className={cn(theme.langLink, {
        [theme.activeLang]: currentLang === lang
      })}
      onClick={e => this.setLang(e, lang)}
    >
      {lang}
    </a>
  }

  private setLang = (e: React.SyntheticEvent<{}>, lang: Langs) => {
    e.preventDefault()
    const { locale: { messages }, history: { location: { pathname }, push }, dispatch } = this.props

    const currentRoute = getCurrentRoute(pathname, lang) as LangRoute | null

    const switchedUrl = currentRoute
      ? getLocaleUrl(currentRoute, lang)
      : DEFAULT_ROOT_URL

    push(switchedUrl)

    if (messages[lang])
      dispatch(setLang({ lang }))
    else
      dispatch(fetchLocale({ lang }))
  }
}

// tslint:disable-next-line:variable-name
export const LangSwitcher = withRouter(
  connect<StateProps>(({ locale }) => ({ locale }))(LangSwitcherComponent)
)