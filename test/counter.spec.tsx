import React from 'react';
import TestRenderer from 'react-test-renderer';
import SubX from 'subx';
import waitFor from 'wait-for-async';

import {Component} from '../build/src/index';

const renderHistory: number[] = [];

class App extends Component<any> {
  render() {
    const store = this.props.store;
    renderHistory.push(store.number);
    return (
      <div>
        <button
          onClick={() => {
            store.number -= 1;
          }}
        >
          -
        </button>
        <span>{store.number}</span>
        <button
          onClick={() => {
            store.number += 1;
          }}
        >
          +
        </button>
      </div>
    );
  }
}

const store = SubX.create({number: 0});

describe('Counter', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<App store={store} />);
    const minusButton = renderer.root.find(
      el => el.type === 'button' && el.children && el.children[0] === '-'
    );
    const addButton = renderer.root.find(
      el => el.type === 'button' && el.children && el.children[0] === '+'
    );
    minusButton.props.onClick();
    expect(store.number).toBe(-1);
    addButton.props.onClick();
    expect(store.number).toBe(0);
    addButton.props.onClick();
    expect(store.number).toBe(1);
    await waitFor({interval: 20});
    expect(renderHistory).toEqual([0, -1, 0, 1]);
  });
});
