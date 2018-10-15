import cn from 'classnames'
import { Spinner } from 'common/ui/spinner'
import React from 'react'
import theme from './theme.css'

interface OwnProps {
  loading: boolean | undefined
  children?: React.ReactNode
  className?: string
  minHeight?: boolean
}

export class Loader extends React.PureComponent<OwnProps> {
  render() {
    const { className, loading, minHeight, children} = this.props
    return <div
      className={cn(theme.loader, className, {
        [theme.isLoading]: loading,
        [theme.minHeight]: minHeight
      })}
    >
      <div className={theme.component}>
        {children}
      </div>
      <Spinner show={loading} />
    </div>
  }
}