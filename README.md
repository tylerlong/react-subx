# react-subx

[![Build Status](https://travis-ci.org/tylerlong/react-subx.svg?branch=master)](https://travis-ci.org/tylerlong/react-subx)
[![npm version](https://badge.fury.io/js/react-subx.svg)](https://badge.fury.io/js/react-subx)

Official React bindings for [SubX](https://github.com/tylerlong/subx).


## Installation

```
yarn add react-subx
```


## Todo

- Bug: an event has several subscribers, one of them is React.render, another is getter monitor.
    - If former triggered earlier than later, then render doesn't show us the latest data.
    - Later doesn't trigger former, so we never get the latest view unless explicitly invoke render
    - We have this data consistency issue because subscribers are notified sequentially.
