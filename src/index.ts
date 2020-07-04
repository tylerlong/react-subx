import React from 'react';
import SubX from 'subx';
import * as R from 'ramda';
import {Subscription} from 'rxjs';
import {StaleEvent, JsonObj} from 'subx/build/src/types';

export class Component<P = {}, S = {}> extends React.Component<P, S> {
  __subscription__?: Subscription;
  constructor(props: Readonly<P>) {
    super(props);
    const clearSubscription = () => {
      if (this.__subscription__) {
        this.__subscription__.unsubscribe();
        delete this.__subscription__;
      }
    };
    const render = this.render.bind(this);
    this.render = () => {
      clearSubscription();
      const {result, stream$} = SubX.runAndMonitor(SubX.create(props), render);
      this.__subscription__ = stream$.subscribe(event => {
        if (
          event.type === 'STALE' &&
          R.equals(R.path(event.path, props), (event as StaleEvent).cache)
        ) {
          return;
        }
        clearSubscription();
        // todo: `setState({})` instead, let React decide when to render
        // ref: https://itnext.io/the-ideas-behind-react-easy-state-901d70e4d03e
        // but this.forceUpdate() is faster because it skips `shouldComponentUpdate`
        this.forceUpdate();
      });
      return result;
    };
    if (this.componentWillUnmount) {
      const originalComponentWillUnmount = this.componentWillUnmount.bind(this);
      this.componentWillUnmount = () => {
        clearSubscription();
        originalComponentWillUnmount();
      };
    } else {
      this.componentWillUnmount = () => clearSubscription();
    }
    this.shouldComponentUpdate = (nextProps, nextState) => {
      return (
        nextState !== this.state ||
        [
          ...new Set([...Object.keys(this.props), ...Object.keys(nextProps)]),
        ].some(k => (this.props as JsonObj)[k] !== (nextProps as JsonObj)[k])
      );
    };
  }
}
