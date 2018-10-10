/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'
import delay from 'timeout-as-promise'

import { Component } from '../src/index'

const renderHisotry = []

class App extends Component {
  render () {
    const counter = this.props.counter
    renderHisotry.push(counter.number)
    return <div>
      <button onClick={e => { counter.number -= 1 }}>-</button>
      <span>{counter.number}</span>
      <button onClick={e => { counter.number += 1 }}>+</button>
    </div>
  }
}

const counter = SubX.create({ number: 0 })

describe('Counter', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<App counter={counter} />)
    const minusButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '-')
    const addButton = renderer.root.find(el => el.type === 'button' && el.children && el.children[0] === '+')
    minusButton.props.onClick()
    expect(counter.number).toBe(-1)
    addButton.props.onClick()
    expect(counter.number).toBe(0)
    addButton.props.onClick()
    expect(counter.number).toBe(1)
    await delay(20)
    expect(renderHisotry).toEqual([0, 1]) // Intermediate "-1, 0" were not rendered because of debounce
  })
})
