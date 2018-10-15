import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

type ComponentProps = RouteComponentProps<{}>

class NotFoundComponent extends React.Component<ComponentProps> {
  componentWillMount() {
    const { staticContext } = this.props
    if (staticContext) {
      staticContext.statusCode = 404
    }
  }

  render() {
    return <h1>404</h1>
  }
}

// tslint:disable-next-line:variable-name
export const NotFound = withRouter(NotFoundComponent)