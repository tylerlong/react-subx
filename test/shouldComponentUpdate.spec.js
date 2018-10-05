/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

class A extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: 'Tyler'
    }
  }
  render () {
    return <div>
      {this.state.firstName}
      <button onClick={e => this.setState({ firstName: 'Peter' })}>Peter</button>
    </div>
  }
  shouldComponentUpdate (nextProps, nextState) {
    expect(this.props).toBe(nextProps)
    expect(this.state).not.toBe(nextState)
    return true
  }
}

describe('shouldComponentUpdate', () => {
  test('default', () => {
    const renderer = TestRenderer.create(<A />)
    const button = renderer.root.find(el => el.type === 'button')
    button.props.onClick()
  })
})
