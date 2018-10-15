import React from 'react'
import theme from './theme.css'

export class Page extends React.PureComponent {
  render() {
    const { children } = this.props
    return <section className={theme.container}>
      {children}
    </section>
  }
}