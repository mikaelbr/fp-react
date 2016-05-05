import React from 'react';

export default function flow (...Components) {
  return React.createClass({
    displayName: 'ComposedComponent',
    render () {
      return compose(Components, withoutChildren(this.props), this.props.children);
    }
  });
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
