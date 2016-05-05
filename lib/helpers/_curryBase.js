import _partialBase from './_partialBase';
import _extendProps from './_extendProps';

export default function curryBase (assign) {
  const partial = _partialBase(assign);
  const extendProps = _extendProps(assign);

  return function curry (Component, arity = 1, initProps = {}) {
    if (typeof arity === 'object') {
      initProps = arity;
      arity = 1;
    }
    const requiredProps = getRequiredProps(Component);
    if (requiredProps.length) {
      return curryPropTypes(Component, requiredProps, initProps);
    }

    if (arity === 0) {
      return partial(Component, initProps);
    }
    return function curried (props) {
      return curry(Component, arity - 1, extendProps(initProps, props));
    };
  };

  function curryPropTypes (Component, requiredProps, initProps = {}) {
    const nextProps = withoutProps(requiredProps, initProps);
    if (!nextProps.length) {
      return partial(Component, initProps);
    }
    return function curried (props) {
      return curryPropTypes(Component,
        nextProps,
        extendProps(initProps, props));
    };
  }
}

function withoutProps (required, props) {
  const propKeys = Object.keys(props);
  return required.filter((k) => propKeys.indexOf(k) === -1);
}

function getRequiredProps (Components) {
  const propTypes = getPropTypes(Components);
  if (!propTypes) return false;
  return Object.keys(propTypes).reduce(function (acc, item) {
    if (typeof propTypes[item].isRequired !== 'undefined') {
      return acc;
    }
    return acc.concat(item);
  }, []);
}

function getPropTypes (Component) {
  return Component.propTypes;
}
