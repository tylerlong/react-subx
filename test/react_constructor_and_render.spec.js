/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

describe('React', () => {
  test('constructor', () => {
    const history = []
    class A extends React.Component {
      constructor (props) {
        history.push('A constructor start')
        super(props)
        this.state = {
          text: 'hello'
        }
        history.push('A constructor end')
      }
      render () {
        history.push('A render start')
        const result = <div>
          <B text='{this.state.text}' />
          <button onClick={e => this.setState({ text: 'world' })}>world</button>
          <C />
        </div>
        history.push('A render end')
        return result
      }
    }
    class B extends React.Component {
      constructor (props) {
        history.push('B constructor start')
        super(props)
        history.push('B constructor end')
      }
      render () {
        history.push('B render start')
        const result = this.props.text
        history.push('B render end')
        return result
      }
    }
    class C extends React.Component {
      constructor (props) {
        history.push('C constructor start')
        super(props)
        history.push('C constructor end')
      }
      render () {
        history.push('C render start')
        const result = 'I am static'
        history.push('C render end')
        return result
      }
      shouldComponentUpdate () {
        return false
      }
    }

    const renderer = TestRenderer.create(<A />)
    const button = renderer.root.find(el => el.type === 'button')
    button.props.onClick()
    expect(history).toEqual([
      'A constructor start',
      'A constructor end',
      'A render start',
      'A render end',
      'B constructor start',
      'B constructor end',
      'B render start',
      'B render end',
      'C constructor start',
      'C constructor end',
      'C render start',
      'C render end',
      'A render start',
      'A render end',
      'B render start',
      'B render end'

      // C doesn't render because shouldComponentUpdate returns false
      // 'C render start',
      // 'C render end'
    ])
  })
})
