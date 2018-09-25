/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'

describe('React', () => {
  test('render', () => {
    class MyComponent extends React.Component {
      render () {
        console.log('render')
        return 'hello world'
      }
    }
    TestRenderer.create(<MyComponent />)
  })
})
