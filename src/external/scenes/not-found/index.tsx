import { T } from 'common/@components/t'
import { Page } from 'external/scenes/@components/page'
import { SeoBlock } from 'external/scenes/@components/seo-block'
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
    return <Page>
    <SeoBlock id="not-found" />
    <T id="ep.pages.not-found.title" wrapper="h1" />
  </Page>
  }
}

// tslint:disable-next-line:variable-name
export const NotFound = withRouter(NotFoundComponent)