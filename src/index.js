import React from 'react'
import SubX, { runAndMonitor } from 'subx'
import { buffer, debounceTime } from 'rxjs/operators'
import * as R from 'ramda'

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
      const bufferedStream = stream.pipe(buffer(stream.pipe(debounceTime(2))))
      this.__subscription__ = bufferedStream.subscribe(events => {
        if (R.all(event => event.type === 'STALE', events) && R.all(event => R.equals(R.path(event.path, props), event.cache), events)) {
          return
        }
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
