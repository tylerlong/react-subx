/* eslint-env jest */
describe('OOP inheritance', () => {
  test('children should call parent constructor', () => {
    let count = 0
    class A {
      constructor () {
        count += 1
      }
    }
    class B extends A {}
    const b = new B()
    expect(b).toBeDefined()
    expect(count).toBe(1)
  })

  test('parent rewrite children method', () => {
    class A {
      constructor () {
        if (typeof this.render === 'function') {
          this.render = function () {
            return 'Greetings from A'
          }
        }
      }
    }
    class B extends A {
      render () {
        return 'Greetings from B'
      }
    }
    const b = new B()
    expect(b).toBeDefined()
    expect(b.render()).toBe('Greetings from A')
  })
})
