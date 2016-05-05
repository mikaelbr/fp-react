import React from 'react';
import _extendProps from './_extendProps';

export default function partialBase (assign) {
  const extendProps = _extendProps(assign);

  return function partial (Component, partialProps) {
    return React.createClass({
      displayName: Component.displayName || Component.name,
      render () {
        const props = this.props;
        return React.createElement(Component, extendProps(partialProps, props));
      }
    });
  };
}
