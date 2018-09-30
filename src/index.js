import React from 'react'
import * as R from 'ramda'
import { merge } from 'rxjs'

class Component extends React.Component {
  componentDidMount () {
    this.subscriptions = R.pipe(
      R.values,
      R.filter(val => val.__isSubX__),
      R.map(val => merge(val.$, val.stale$).subscribe(() => this.forceUpdate()))
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
