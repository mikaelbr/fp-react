import React from 'react';

export default function partial (Component, partialProps) {
  return function (props) {
    return React.createElement(Component, extendProps(partialProps, props));
  };
}

function extendProps (props, newProps) {
  const children = (props.children || []).concat(newProps.children);
  return Object.assign({}, props, newProps, { children });
}
