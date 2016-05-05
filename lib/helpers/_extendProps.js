
export default function createExtend (assign) {
  return function extendProps (partialProps, newProps) {
    if (!partialProps.children) {
      return assign(partialProps, newProps);
    }
    let children = arrify(newProps.children).concat(partialProps.children);
    if (children.length === 1) {
      children = children[0];
    }
    return assign(partialProps, newProps, { children });
  };
}

function arrify (data) {
  if (!data) return [];
  return (!Array.isArray(data) ? [data] : data);
}
