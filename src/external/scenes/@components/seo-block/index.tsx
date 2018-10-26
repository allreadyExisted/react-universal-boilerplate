import { T } from 'common/@components/t'
import React from 'react'
import Helmet from 'react-helmet'

interface Props {
  id:
    'home' |
    'about' |
    'articles' |
    'not-found'
}

export class SeoBlock extends React.PureComponent<Props> {
  render() {
    const { id } = this.props
    return <T id={`ep.pages.${id}.title`}>
      {title => <Helmet title={title} />}
    </T>
  }
}