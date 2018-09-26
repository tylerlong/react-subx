/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'

const renderHisotry = []

class App extends React.Component {
  constructor (props) {
    super(props)
    this.counter = this.props.counter
  }
  componentDidMount () {
    this.subscription = this.counter.$$.subscribe(() => this.forceUpdate())
  }
  componentWillUnmount () {
    this.subscription.unsubscribe()
  }
  render () {
    renderHisotry.push(this.counter.number)
    return <div>
      <button onClick={e => { this.counter.number -= 1 }}>-</button>
      <span>{this.counter.number}</span>
      <button onClick={e => { this.counter.number += 1 }}>+</button>
    </div>
  }
}

describe('Counter without connector', () => {
  test('default', async () => {
    const counter = SubX.create({ number: 0 })
    const renderer = TestRenderer.create(<App counter={counter} />)
    const minusButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '-')
    const addButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '+')
    minusButton.props.onClick()
    expect(counter.number).toBe(-1)
    addButton.props.onClick()
    expect(counter.number).toBe(0)
    addButton.props.onClick()
    expect(counter.number).toBe(1)
    expect(renderHisotry).toEqual([0, -1, 0, 1])
  })
})
