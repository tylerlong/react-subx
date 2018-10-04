import React from 'react'
import SubX, { runAndMonitor } from 'subx'

class Component extends React.Component {
  constructor (props) {
    super(props)
    const clearSubscription = () => {
      if (this.__subscription__) {
        this.__subscription__.unsubscribe()
        delete this.__subscription__
      }
    }
    const render = this.render.bind(this)
    this.render = () => {
      clearSubscription()
      const { result, stream } = runAndMonitor(SubX.create(props), render)
      this.__subscription__ = stream.subscribe(event => this.forceUpdate())
      return result
    }
    if (this.componentWillUnmount) {
      const originalComponentWillUnmount = this.componentWillUnmount.bind(this)
      this.componentWillUnmount = () => {
        clearSubscription()
        originalComponentWillUnmount()
      }
    } else {
      this.componentWillUnmount = () => clearSubscription()
    }
  }
}

export { Component }
export default { Component }
