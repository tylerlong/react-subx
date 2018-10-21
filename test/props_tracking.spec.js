/* eslint-env jest */
import SubX from 'subx'
import * as R from 'ramda'

describe('props tracking', () => {
  test('default', () => {
    const props = {
      a: {
        b: {}
      },
      c: {
        d: SubX.create()
      }
    }
    const newProps = SubX.create(props)
    const events = []
    newProps.$.subscribe(event => events.push(event))
    props.a.b.x = 'Hello'
    props.c.d.x = 'world'
    expect(R.map(R.dissoc('id'), events)).toEqual([ // only previously SubX Objects are tracked.
      {
        type: 'SET',
        path: [ 'c', 'd', 'x' ]
      }
    ])
  })
})
