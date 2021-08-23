import React from 'react';
import TestRenderer from 'react-test-renderer';
import delay from 'timeout-as-promise';

let renderCount = 0;
class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      Array(100)
        .fill()
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
    await delay(50);
    expect(renderCount).toBe(101); // every setState triggers render
  });
});
