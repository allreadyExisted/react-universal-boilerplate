import { T } from 'common/@components/t'
import { Page } from 'external/scenes/@components/page'
import { SeoBlock } from 'external/scenes/@components/seo-block'
import React from 'react'

export class ArticlesScene extends React.PureComponent {
  render() {
    return <Page>
      <SeoBlock id="articles" />
      <T id="ep.pages.articles.title" wrapper="h1" />
    </Page>
  }
}