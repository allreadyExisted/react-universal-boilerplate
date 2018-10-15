import { LangSwitcher } from 'external/scenes/@components/header/@componenst/lang-switcher'
import { List } from 'external/scenes/@components/header/@componenst/list'
import { Logo } from 'external/scenes/@components/header/@componenst/logo'
import React from 'react'
import theme from './theme.css'

export class Header extends React.PureComponent {
  render() {
    return <header className={theme.header}>
      <nav className={theme.nav}>
        <List />
        <Logo />
        <LangSwitcher />
      </nav>
    </header>
  }
}