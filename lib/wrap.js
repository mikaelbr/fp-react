import React from 'react';

export default function wrap (Component, WrapperComponent = identity) {
  return React.createClass({
    displayName: Component.displayName || Component.name,
    render () {
      return WrapperComponent(Component, this.props);
    }
  });
}

function identity (Component, props) {
  return React.createElement(Component, props);
}
