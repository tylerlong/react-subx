import React from 'react';
import TestRenderer from 'react-test-renderer';

describe('assign to props', () => {
  test("assign to props doesn't work", async () => {
    const historyNames = [];
    class A extends React.Component {
      render() {
        historyNames.push(this.props.person.firstName);
        return (
          <div>
            {this.props.person.firstName}
            <button
              onClick={() => {
                this.props = {person: {firstName: 'Peter'}};
                this.forceUpdate();
              }}
            >
              Peter
            </button>
          </div>
        );
      }
    }

    const renderer = TestRenderer.create(<A person={{firstName: 'Tyler'}} />);
    const button = renderer.root.find(el => el.type === 'button');
    button.props.onClick();
    expect(historyNames).toEqual(['Tyler', 'Tyler']);
  });

  test("assign to props's props does work", async () => {
    const historyNames = [];
    class A extends React.Component {
      render() {
        historyNames.push(this.props.person.firstName);
        return (
          <div>
            {this.props.person.firstName}
            <button
              onClick={() => {
                this.props.person.firstName = 'Peter';
                this.forceUpdate();
              }}
            >
              Peter
            </button>
          </div>
        );
      }
    }

    const renderer = TestRenderer.create(<A person={{firstName: 'Tyler'}} />);
    const button = renderer.root.find(el => el.type === 'button');
    button.props.onClick();
    expect(historyNames).toEqual(['Tyler', 'Peter']);
  });
});
