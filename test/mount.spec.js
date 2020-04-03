/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

class A extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showB: true
    }
  }

  render () {
    return (
      <div>
        {this.state.showB ? <B /> : ''}
        <button onClick={e => this.setState({ showB: !this.state.showB })} />
      </div>
    )
  }
}

const history = []
class B extends React.Component {
  constructor (props) {
    super(props)
    history.push('B constructor')
  }

  componentDidMount () {
    history.push('B did mount')
  }

  componentWillUnmount () {
    history.push('B will unmount')
  }

  render () {
    return 'Hello'
  }
}

describe('Mount', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<A />)
    const button = renderer.root.find(el => el.type === 'button')
    button.props.onClick()
    button.props.onClick()
    button.props.onClick()
    expect(history).toEqual([
      'B constructor',
      'B did mount',
      'B will unmount',
      'B constructor',
      'B did mount',
      'B will unmount'
    ])
  })
})
