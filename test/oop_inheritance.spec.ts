describe('OOP inheritance', () => {
  test('child should call parent constructor', () => {
    let count = 0;
    class A {
      constructor() {
        count += 1;
      }
    }
    class B extends A {}
    const b = new B();
    expect(b).toBeDefined();
    expect(count).toBe(1);
  });

  test('parent wrap child method', () => {
    class A {
      constructor() {
        if (typeof (this as any).render === 'function') {
          const temp = (this as any).render.bind(this);
          (this as any).render = () => {
            return `Before ${temp()} after`;
          };
        }
      }
    }
    class B extends A {
      render() {
        return 'Greetings from B';
      }
    }
    const b = new B();
    expect(b.render()).toBe('Before Greetings from B after');
  });
});
