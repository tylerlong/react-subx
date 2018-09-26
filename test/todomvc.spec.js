/* eslint-env jest */
import React from 'react'
import TestRenderer from 'react-test-renderer'
import SubX from 'subx'

import { Component } from '../src/index'

const store = SubX.create({
  todos: [],
  get activeCount () {
    return this.todos.filter(todo => todo.active).length
  }
})

class App extends Component {
  render () {
    const store = this.props.store
    return <div>
      <TodoForm addTodo={text => store.todos.push({ text, active: true })} />
      { store.todos.map(todo => <TodoItem todo={todo} key={todo.text} />) }
      <TodoFooter store={store} />
    </div>
  }
}

class TodoForm extends Component {
  constructor (props) {
    super(props)
    this.state = { text: '' }
  }
  render () {
    return <div>
      <input value={this.state.text}
        onChange={e => this.setState({ text: e.target.value })}
        onKeyDown={e => {
          e.preventDefault()
          if (e.keyCode !== 13) {
            return
          }
          const text = this.state.text.trim()
          if (text.length === 0) {
            return
          }
          this.props.addTodo(text)
          this.setState({ text: '' })
        }}
      />
    </div>
  }
}

class TodoItem extends Component {
  render () {
    const todo = this.props.todo
    return <div>
      { todo.text }
    </div>
  }
}

class TodoFooter extends Component {
  render () {
    const store = this.props.store
    return <div id='footer'>
      {store.activeCount} Item{store.activeCount === 1 ? '' : 's'} left
    </div>
  }
}

describe('Markdown Editor', () => {
  test('default', async () => {
    const renderer = TestRenderer.create(<App store={store} />)
    expect(store).toEqual({
      todos: [],
      activeCount: 0
    })
    const input = renderer.root.find(el => el.type === 'input')
    const footer = renderer.root.find(el => el.props.id === 'footer')

    input.props.onChange({ target: { value: '111' } })
    expect(input.props.value).toBe('111')
    input.props.onKeyDown({ keyCode: 13, preventDefault: () => {} })
    expect(store).toEqual({
      todos: [
        { text: '111', active: true }
      ],
      activeCount: 1
    })
    expect(input.props.value).toBe('')

    input.props.onChange({ target: { value: '222' } })
    expect(input.props.value).toBe('222')
    input.props.onKeyDown({ keyCode: 13, preventDefault: () => {} })
    expect(store).toEqual({
      todos: [
        { text: '111', active: true },
        { text: '222', active: true }
      ],
      activeCount: 2
    })
    expect(input.props.value).toBe('')

    input.props.onChange({ target: { value: '333' } })
    expect(input.props.value).toBe('333')
    input.props.onKeyDown({ keyCode: 13, preventDefault: () => {} })
    expect(store).toEqual({
      todos: [
        { text: '111', active: true },
        { text: '222', active: true },
        { text: '333', active: true }
      ],
      activeCount: 3
    })
    expect(input.props.value).toBe('')

    // trigger render again because no render after getter updates
    // todo: I need to fix this
    store.todos[0].active = true
    expect(footer.children).toEqual(['3', ' Item', 's', ' left'])
  })
})
