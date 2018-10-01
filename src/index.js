import React from 'react'
import SubX, { runAndMonitor } from 'subx'

class Component extends React.Component {
  constructor (props) {
    super(props)
    const render = this.render.bind(this)
    this.render = () => {
      if (this.subscription) {
        this.subscription.unsubscribe()
        delete this.subscription
      }
      const { result, stream } = runAndMonitor(SubX.create(props), render)
      this.subscription = stream.subscribe(event => this.forceUpdate())
      return result
    }
  }
}

export { Component }
