/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'
import delay from 'timeout-as-promise'

import { Component } from '../build/index'

const renderHisotry = []

class App extends Component {
  render () {
    const store = this.props.store
    renderHisotry.push(store.number)
    return (
      <div>
        <button onClick={e => { store.number -= 1 }}>-</button>
        <span>{store.number}</span>
        <button onClick={e => { store.number += 1 }}>+</button>
      </div>
    )
  }
}

const store = SubX.create({ number: 0 })

describe('Counter', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<App store={store} />)
    const minusButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '-')
    const addButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '+')
    minusButton.props.onClick()
    expect(store.number).toBe(-1)
    addButton.props.onClick()
    expect(store.number).toBe(0)
    addButton.props.onClick()
    expect(store.number).toBe(1)
    await delay(20)
    expect(renderHisotry).toEqual([0, -1, 0, 1])
  })
})
