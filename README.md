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
import ReactDOM from 'react-dom'

class App extends Component {
  render () {
    const counter = this.props.counter
    return <div>
      <button onClick={e => { counter.number -= 1 }}>-</button>
      <span>{counter.number}</span>
      <button onClick={e => { counter.number += 1 }}>+</button>
    </div>
  }
}

const counter = SubX.create({ number: 0 })
ReactDOM.render(<App counter={counter} />, document.getElementById('container'));
```

It is super simple to use. Simply let your components extend `Component` from 'react-subx' instead of `React.Component`.


## Todo

- Support function style React component
