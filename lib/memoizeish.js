import React from 'react';
import shouldUpdate from 'omniscient/shouldupdate';

export default function memoizeish (Component, isIgnorable) {
  const shouldComponentUpdate = shouldUpdate.withDefaults({
    isIgnorable
  });

  return React.createClass({
    shouldComponentUpdate,
    render () {
      return React.createElement(Component, this.props);
    }
  });
}
