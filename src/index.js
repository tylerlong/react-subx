import React from 'react'
import SubX, { runAndMonitor } from 'subx'

class Component extends React.Component {
  constructor (props) {
    super(props)
    const render = this.render.bind(this)
    this.render = () => {
      if (this.__subscription__) {
        this.__subscription__.unsubscribe()
        delete this.__subscription__
      }
      const { result, stream } = runAndMonitor(SubX.create(props), render)
      this.__subscription__ = stream.subscribe(event => this.forceUpdate())
      return result
    }
  }
}

export { Component }
export default { Component }
