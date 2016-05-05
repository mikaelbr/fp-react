import partialBase from './helpers/_partialBase.js';

const partial = partialBase((partialProps, props, children) =>
  Object.assign({}, partialProps, props, children));

export default partial;
