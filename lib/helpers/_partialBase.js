import React from 'react';

export default function partialBase (assign) {
  return function partial (Component, partialProps) {
    return React.createClass({
      displayName: Component.displayName || Component.name,
      render () {
        const props = this.props;
        return React.createElement(Component, extendProps(partialProps, props));
      }
    });
  };

  function extendProps (partialProps, newProps) {
    if (!partialProps.children) {
      return assign(partialProps, newProps);
    }
    let children = arrify(newProps.children).concat(partialProps.children);
    if (children.length === 1) {
      children = children[0];
    }
    return assign(partialProps, newProps, { children });
  }

  function arrify (data) {
    if (!data) return [];
    return (!Array.isArray(data) ? [data] : data);
  }
}
