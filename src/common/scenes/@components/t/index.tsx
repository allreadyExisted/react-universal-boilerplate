import React from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'

export type WrapperNode = 'span' | 'div' | 'h1'

interface OwnProps extends FormattedMessage.MessageDescriptor {
  children?: (text: string) => React.ReactNode
  values?: { [key: string]: any }
  wrapper?: WrapperNode
  className?: string
  html?: boolean
}

const checkFormat = (id: string) => {
  if (!/^(([a-z0-9]){1,}(\.|\-|\.\@|!|~)){1,}[a-z0-9]{1,}$/.test(id)) {
    throw new TypeError(`Message id "${id}" do't match localization id format.`)
  }
}

/**
 * Represents formatted text
 *
 * Naming convention:
 * - [path] = [route|@component|"@global"]
 * - Fields: `[path].field.[field-name]`
 * - FieldError: `[path].field.[field-name]![error]`
 * - Values: `[path]~[value]`
 */
export class T extends React.PureComponent<OwnProps> {
  render() {
    const { html, id, wrapper, className, ...props } = this.props

    if (process.env.NODE_ENV !== 'production')
      checkFormat(id)

    const rid = id

    return html
      ? <FormattedHTMLMessage
        {...props}
        id={rid}
        children={
          (
            props.children ||
            ((text: string) => this.renderWrapper(text))
          ) as any
        }
      />
      : <FormattedMessage {...props as any} id={rid} />
  }

  private renderWrapper = (text: string) => {
    const { wrapper, className } = this.props
    const props = {
      dangerouslySetInnerHTML: {
        __html: text
      },
      className
    }

    switch (wrapper) {
      case 'div':
        return <div {...props} />
      case 'h1':
        return <h1 {...props} />
      default:
        return <span {...props} />
    }
  }
}