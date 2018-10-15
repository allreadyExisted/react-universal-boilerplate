import { connect, DispatchProps } from 'common/redux/connect'
import { PreLoader } from 'common/scenes/@components/preloader'
import { fetchLocale, LocaleStore } from 'external/redux/modules/locale'
import { getLang } from 'external/utils/locale'
import React from 'react'
import { IntlProvider } from 'react-intl'

interface StateProps {
  locale: LocaleStore
}

type ComponentProps =
  StateProps &
  DispatchProps

class BootstrapComponent extends React.Component<ComponentProps> {
  componentDidMount() {
    const { dispatch, locale: { messages, lang } } = this.props

    if (!messages[lang]) {
      dispatch(fetchLocale({ lang: getLang(window.location.pathname) }))
    }
  }

  render() {
    const { locale: { lang, messages } } = this.props
    const loading = !messages[lang]

    if (loading)
      return <PreLoader />

    return <IntlProvider
      key={lang}
      locale={lang}
      messages={messages[lang]}
      textComponent={React.Fragment}
    >
      {this.props.children}
    </IntlProvider>
  }
}

// tslint:disable-next-line:variable-name
export const Bootstrap =
  connect<StateProps>(({ locale }) => ({ locale }))(BootstrapComponent)