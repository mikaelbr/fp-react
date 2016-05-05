import _partialBase from './_partialBase';
import _extendProps from './_extendProps';

export default function curryBase (assign) {
  const partial = _partialBase(assign);
  const extendProps = _extendProps(assign);

  return function curry (Component, arity = 1, initProps = {}) {
    if (arity === 0) {
      return partial(Component, initProps);
    }
    return function curried (props) {
      return curry(Component, arity - 1, extendProps(initProps, props));
    };
  };
}
