import { T } from 'common/scenes/@components/t'
import { Page } from 'external/scenes/@components/page'
import React from 'react'

export class AboutScene extends React.PureComponent {
  render() {
    return <Page>
      <T id="ep.pages.about.title" wrapper="h1" />
    </Page>
  }
}