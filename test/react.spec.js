/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

describe('React', () => {
  test('render', () => {
    let count = 0
    class MyComponent extends React.Component {
      constructor (props) {
        super(props)
        this.state = {
          text: ''
        }
      }
      render () {
        count += 1
        return <div>
          <input onChange={e => this.setState({ text: e.target.value })} value={this.state.text} />
        </div>
      }
    }
    const renderer = TestRenderer.create(<MyComponent />)
    const input = renderer.root.find(el => el.type === 'input')
    input.props.onChange({ target: { value: '1' } })
    input.props.onChange({ target: { value: '2' } })
    expect(count).toBe(3) // 3 render() invokes in total
  })
})
