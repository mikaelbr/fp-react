import partialBase from './helpers/_partialBase.js';

const partialRight = partialBase((partialProps, props, children) =>
  Object.assign({}, props, partialProps, children));

export default partialRight;
