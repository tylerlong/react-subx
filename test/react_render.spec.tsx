import React from 'react';
import TestRenderer from 'react-test-renderer';
import waitFor from 'wait-for-async';

let renderCount = 0;
class A extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      number: 1,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      Array(100)
        .fill(0)
        .forEach(() => {
          this.setState({
            number: 2,
          });
        });
    }, 10);
  }

  render() {
    renderCount += 1;
    return this.state.number;
  }
}

describe('React render', () => {
  test('default', async () => {
    TestRenderer.create(<A />);
    await waitFor({interval: 50});
    expect(renderCount).toBe(101); // every setState triggers render
  });
});
