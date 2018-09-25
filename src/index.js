import React from 'react'
import * as R from 'ramda'

class Component extends React.Component {
  componentWillMount () {
    this.subscriptions = R.pipe(
      R.values,
      R.filter(val => val.__isSubX__),
      R.map(val => val.$$.subscribe(() => this.forceUpdate()))
    )(this.props)
  }
  componentWillUnmount () {
    R.forEach(subscription => subscription.unsubscribe(), this.subscriptions)
    delete this.subscriptions
  }
}

export {
  Component
}
