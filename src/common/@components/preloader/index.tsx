import { Loader } from 'common/ui/loader'
import React from 'react'
import theme from './theme.css'

export class PreLoader extends React.PureComponent {
  render() {
    return <Loader
      loading={true}
      className={theme.loader}
    />
  }
}