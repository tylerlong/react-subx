import SubX from 'subx';
import _ from 'lodash';
import {HandlerEvent} from 'subx/build/src/types';

describe('props tracking', () => {
  test('default', () => {
    const props = {
      a: {
        b: {x: ''},
      },
      c: {
        d: SubX.create(),
      },
    };
    const newProps = SubX.create(props);
    const events: HandlerEvent[] = [];
    newProps.$.subscribe(event => events.push(event));
    props.a.b.x = 'Hello';
    props.c.d.x = 'world';
    expect(_.map(events, e => _.omit(e, 'id'))).toEqual([
      // only previously SubX Objects are tracked.
      {
        type: 'SET',
        path: ['c', 'd', 'x'],
      },
    ]);
  });
});
