import React from 'react'
import { Animate } from 'react-move'

const ANI_HEIGHT = 2
const ANI_DURATION = 150

interface AnimationProps {
  opacity: number
  y: number
}

interface OwnProps {
  show: boolean | undefined
  y?: {
    from: number
    to: number
  }
  duration?: number
  children: (state: AnimationProps) => React.ReactElement<any>
}

export class FadeAnimation extends React.PureComponent<OwnProps> {
  render() {
    const { show, y, duration } = this.props
    return <Animate
      show={show ? true : false}

      start={{
        opacity: 0,
        y: y ? y.from : -ANI_HEIGHT
      }}

      enter={{
        opacity: [1],
        y: y ? [y.to] : [0],
        timing: { duration: duration ? duration : ANI_DURATION }
      }}

      update={{
        opacity: [1],
        y: y ? [y.to] : [0],
        timing: { duration: duration ? duration : ANI_DURATION }
      }}

      leave={{
        opacity: [0],
        y: y ? [y.from] : [-ANI_HEIGHT],
        timing: { duration: duration ? duration : ANI_DURATION }
      }}

      children={this.props.children as any}
    />
  }
}