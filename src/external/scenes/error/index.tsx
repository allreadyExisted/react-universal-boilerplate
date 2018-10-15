import React from 'react'
import theme from './theme.css'

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    return this.state.hasError ? (
      <div className={theme.error}>
        <div className={theme.content}>
          <div className={theme.smile}>:(</div>
          <div className={theme.text}>Something goes wrong</div>
        </div>
      </div>
    ) : (
      this.props.children
    )
  }
}
