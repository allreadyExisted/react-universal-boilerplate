import { T } from 'common/@components/t'
import { Page } from 'external/scenes/@components/page'
import { SeoBlock } from 'external/scenes/@components/seo-block'
import React from 'react'

export class HomeScene extends React.PureComponent {
  render() {
    return <Page>
      <SeoBlock id="home" />
      <T id="ep.pages.home.title" wrapper="h1" />
    </Page>
  }
}