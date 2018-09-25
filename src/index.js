import React from 'react'
import * as R from 'ramda'

class Component extends React.Component {
  componentWillMount () {
    R.pipe(
      R.toPairs,
      R.filter(([key, val]) => val.__isSubX__),
      R.forEach(([key, val]) => {
        this[`${key}Subscription`] = val.$.subscribe(() => this.forceUpdate())
      })
    )(this.props)
  }
  componentWillUnmount () {
    R.pipe(
      R.toPairs,
      R.filter(([key, val]) => val.__isSubX__),
      R.forEach(([key, val]) => {
        this[`${key}Subscription`].unsubscribe()
      })
    )(this.props)
  }
}

export {
  Component
}
