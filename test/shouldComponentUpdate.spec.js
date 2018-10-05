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

class C extends React.Component {
  render () {
    return this.props.firstName
  }
  shouldComponentUpdate (nextProps, nextState) {
    expect(this.props).not.toBe(nextProps)
    expect(this.state).toBe(nextState)
    return true
  }
}

class B extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: 'Tyler'
    }
  }
  render () {
    return <div>
      <C firstName={this.state.firstName} />
      <button onClick={e => this.setState({ firstName: 'Peter' })}>Peter</button>
    </div>
  }
}

describe('shouldComponentUpdate', () => {
  test('Class A', () => {
    const renderer = TestRenderer.create(<A />)
    const button = renderer.root.find(el => el.type === 'button')
    button.props.onClick()
  })

  test('class B & C', () => {
    const renderer = TestRenderer.create(<B />)
    const button = renderer.root.find(el => el.type === 'button')
    button.props.onClick()
  })
})
