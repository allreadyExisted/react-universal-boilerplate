import { externalRoutes } from 'external/routes'
import { LL } from 'external/scenes/@components/locale-link'
import React from 'react'
import theme from '../../theme.css'

export class Logo extends React.PureComponent {
  render() {
    return <LL
      route={externalRoutes.home._}
      className={theme.logo}
    >
      <span className={theme.part1}>MY</span>
      <span className={theme.part2}>FE</span>
    </LL>
  }
}