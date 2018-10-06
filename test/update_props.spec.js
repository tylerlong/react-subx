/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

describe('update props', () => {
  test('Class A & B', () => {
    class A extends React.Component {
      constructor (props) {
        super(props)
        const render = this.render.bind(this)
        this.render = () => {
          this.props = { text: 'world' }
          return render()
        }
      }
    }
    class B extends A {
      render () {
        return <span>{this.props.text}</span>
      }
    }
    const renderer = TestRenderer.create(<B text='hello' />)
    const span = renderer.root.find(el => el.type === 'span')
    expect(span.children).toEqual(['world'])
  })
})
