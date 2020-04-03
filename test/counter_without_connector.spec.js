/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'

const renderHisotry = []

class App extends React.Component {
  constructor (props) {
    super(props)
    this.store = this.props.store
  }

  componentDidMount () {
    this.subscription = this.store.$.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  render () {
    renderHisotry.push(this.store.number)
    return (
      <div>
        <button onClick={e => { this.store.number -= 1 }}>-</button>
        <span>{this.store.number}</span>
        <button onClick={e => { this.store.number += 1 }}>+</button>
      </div>
    )
  }
}

describe('Counter without connector', () => {
  test('default', async () => {
    const store = SubX.create({ number: 0 })
    const renderer = TestRenderer.create(<App store={store} />)
    const minusButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '-')
    const addButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '+')
    minusButton.props.onClick()
    expect(store.number).toBe(-1)
    addButton.props.onClick()
    expect(store.number).toBe(0)
    addButton.props.onClick()
    expect(store.number).toBe(1)
    expect(renderHisotry).toEqual([0, -1, 0, 1])
  })
})
