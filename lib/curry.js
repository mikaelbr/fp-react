import React from 'react';
import _extendProps from './helpers/_extendProps';

const extendProps = _extendProps((...args) => Object.assign({}, ...args));

export default function curry (Component, arity = 1, initProps = {}) {
  if (arity > 0) {
    return function curried (props) {
      return curry(Component, arity - 1, extendProps(initProps, props));
    };
  }

  return React.createClass({
    displayName: Component.displayName || Component.name,
    render () {
      return React.createElement(Component, extendProps(initProps, this.props));
    }
  });
}
