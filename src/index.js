import React from 'react'
import { runAndMonitor } from 'subx'
import { buffer, debounceTime } from 'rxjs/operators'

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
      const { result, stream } = runAndMonitor(props, render)
      const bufferedStream = stream.pipe(buffer(stream.pipe(debounceTime(10))))
      this.__subscription__ = bufferedStream.subscribe(event => {
        clearSubscription()
        this.forceUpdate()
      })
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
    if (!this.shouldComponentUpdate) {
      this.shouldComponentUpdate = (nextProps, nextState) => {
        return nextState !== this.state
      }
    }
  }
}

export { Component }
export default { Component }
