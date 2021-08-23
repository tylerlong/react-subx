import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('React', () => {
  test('render', () => {
    let count = 0;
    class MyComponent extends React.Component<any, any> {
      constructor(props: any) {
        super(props);
        this.state = {
          text: '',
        };
      }

      render() {
        count += 1;
        return (
          <div>
            <input
              onChange={e => this.setState({text: e.target.value})}
              value={this.state.text}
            />
          </div>
        );
      }
    }
    const renderer = TestRenderer.create(<MyComponent />);
    const input = renderer.root.find(el => el.type === 'input');
    input.props.onChange({target: {value: '1'}});
    input.props.onChange({target: {value: '2'}});
    expect(count).toBe(3); // 3 render() invokes in total
  });

  test('inheritance', () => {
    let count = 0;
    let count2 = 0;
    class BaseComponent extends React.Component<any, any> {
      componentDidMount() {
        count2 += 1;
      }
    }
    class MyComponent extends BaseComponent {
      constructor(props: any) {
        super(props);
        this.state = {
          text: '',
        };
      }

      render() {
        count += 1;
        return (
          <div>
            <input
              onChange={e => this.setState({text: e.target.value})}
              value={this.state.text}
            />
          </div>
        );
      }
    }
    const renderer = TestRenderer.create(<MyComponent />);
    const input = renderer.root.find(el => el.type === 'input');
    input.props.onChange({target: {value: '1'}});
    input.props.onChange({target: {value: '2'}});
    expect(count).toBe(3); // 3 render() invokes in total
    expect(count2).toBe(1); // parent `componentDidMount` invoked
  });
});
