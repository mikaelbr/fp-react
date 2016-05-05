import _curryBase from './helpers/_curryBase';

const curryRight = _curryBase((partialProps, props, children) =>
  Object.assign({}, props, partialProps, children));
export default curryRight;
