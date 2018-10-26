import { T } from 'common/@components/t'
import { Page } from 'external/scenes/@components/page'
import { SeoBlock } from 'external/scenes/@components/seo-block'
import React from 'react'

export class AboutScene extends React.PureComponent {
  render() {
    return <Page>
      <SeoBlock id="about" />
      <T id="ep.pages.about.title" wrapper="h1" />
    </Page>
  }
}