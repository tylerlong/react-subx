# react-subx

[![Build Status](https://travis-ci.org/tylerlong/react-subx.svg?branch=master)](https://travis-ci.org/tylerlong/react-subx)
[![npm version](https://badge.fury.io/js/react-subx.svg)](https://badge.fury.io/js/react-subx)

Official React bindings for [SubX](https://github.com/tylerlong/subx).


## Installation

```
yarn add react-subx
```


## Usage

```js
import SubX from 'subx'
import { Component } from 'react-subx'
import React from 'react'
import ReactDOM from 'react-dom'

const store = SubX.create({
  number: 0,
  decrease () {
    this.number -= 1
  },
  increase () {
    this.number += 1
  }
})

class App extends Component {
  render () {
    const store = this.props.store
    return <div>
      <button onClick={e => store.decrease()}>-</button>
      <span>{store.number}</span>
      <button onClick={e => store.increase()}>+</button>
    </div>
  }
}

ReactDOM.render(<App store={store} />, document.getElementById('container'));
```

It is super simple to use. Just let our components extend `Component` from 'react-subx' instead of `React.Component`.
Make our store a [SubX](https://github.com/tylerlong/subx) object, and update our store in whatever way we want.
`react-subx` takes care of everything else.


## TodoMVC demo

Here is a [standard TodoMVC demo implemeted with react-subx](https://github.com/tylerlong/subx-demo-todomvc)

#### [online demo](https://tylerlong.github.io/subx-demo-todomvc/index.html)


## Philosophy

A good state container should meet the following 3 criteria:

1. Minimize computation
1. Minimize rendering (of frontend framework, such as React)
1. Minimize the burden of developers

#### Minimize computation

Use as many [computed properties](https://github.com/tylerlong/subx#computed-properties--getters) as necessary.
SubX is smart enough to cache computed properties to avoid computation.

#### Minimize rendering

When working together with a frontend framework such as React, it is important to control the number of re-render.
Lots of re-render often leads to performance issues.

`react-subx` takes care of this for us automatically. We don't need to define `shouldComponentUpdate`.
We don't need to turn to reselet either. And it just works and it is just performant.

#### Minimize the burden of developers

I used to be a Ruby developer. I cannot agree more on "make developers happy".

With `react-subx`, developers do NOT have to learn actions, reducers, dispatchers, selectors...etc.

Just follow common sense and it just works and is just performant.


## How does react-subx work?

Simply put, `react-subx` deems React's `render` method as a [computed property](https://github.com/tylerlong/subx#computed-properties--getters).

It applies the same algorithm which powers [SubX](https://github.com/tylerlong/subx) computed properties to React's `render` method. So that `render` method won't be invoked until absolutely necessary.


## Pitfalls

`react-subx` tracks changes to React components' props, it is smart enough to figure out when to re-render the component.

So if we want a piece of data to be tracked, make it a SubX object(or part of a SubX object) and pass it to React component via props.

#### Never access global state directly

It is bad practice for a React component to access global state directly. It should only receive data via props. If a React component accesses global data directly, `react-subx` won't re-render that component for us.

#### Don't "cache" data out of render method in React component

This one is hard to comprehend. Let me provide an example:

```js
import SubX from 'subx'
import { Component } from 'react-subx'
import React from 'react'
import ReactDOM from 'react-dom'

const store = SubX.create({
    todos: []
})

class App extends Component {
    constructor(props) {
        super(props)
        this.todos = props.store.todos
    }
    render() {
        return this.todos.map(todo => todo.tite).join(', ')
    }
}

ReactDOM.render(<App counter={counter} />, document.getElementById('container'));
```

In the sample above, we "cached" `this.todos` in constructor. It might be a **bad idea**.

Let's say we execute `store.todos = [...]` somewhere else.
Then `store.todos` is no longer the `this.todos` we cached.
Later changes to `store.todos` won't re-render component at all because it uses a cached version of `this.todos` which has been disconnected from `store`.

If we want to save a `todos` for later reference, we can do it right inside the `render` method:

```js
render() {
    const todos = this.props.store.todos
    return todos.map(todo => todo.tite).join(', ')
}
```
