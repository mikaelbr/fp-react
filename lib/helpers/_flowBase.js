import React from 'react';

export default function createFlow (fromRight) {
  return function flow (...Components) {
    const list = fromRight ? Components.reverse() : Components;
    return React.createClass({
      displayName: 'ComposedComponent',
      render () {
        return compose(list, withoutChildren(this.props), this.props.children);
      }
    });
  };
}

function withoutChildren (props) {
  return Object.assign({}, props, {
    children: void 0
  });
}

function compose ([head, ...tail], props, initial) {
  return React.createElement(head, Object.assign({}, props, {
    children: !tail.length ? initial : compose(tail, props, initial)
  }));
}
