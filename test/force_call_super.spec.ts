import React from 'react';

describe('force call super', () => {
  test('default 1', () => {
    class A extends React.Component {}
    const a = new A({});
    expect(a.componentWillUnmount).toBeUndefined();
  });
  test('default 2', () => {
    class A extends React.Component {}
    class B extends A {}
    const b = new B({});
    expect(b.componentWillUnmount).toBeUndefined();
  });
  test('default 3', () => {
    let count = 0;
    class A extends React.Component {
      constructor(props: any) {
        super(props);
        if (!this.componentWillUnmount) {
          this.componentWillUnmount = () => {
            count += 1;
          };
        } else {
          const temp = this.componentWillUnmount;
          this.componentWillUnmount = () => {
            count += 1;
            temp();
          };
        }
      }
    }
    class B extends A {}
    const b = new B({});
    expect(b.componentWillUnmount).toBeDefined();
    expect(() => b.componentWillUnmount!()).not.toThrow();
    expect(count).toBe(1);

    class C extends A {
      componentWillUnmount() {
        count += 1;
      }
    }
    const c = new C({});
    expect(c.componentWillUnmount).toBeDefined();
    expect(() => c.componentWillUnmount()).not.toThrow();
    expect(count).toBe(3);
  });
});
