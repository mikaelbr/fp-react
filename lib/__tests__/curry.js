import { isElement } from 'react-addons-test-utils';
import ReactDOM from 'react-dom/server';
import curry from '../curry';
import React from 'react';
import test from 'ava';

test('should create curried wrapper with default arity', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}</div>;
  }
  const Curried = curry(MyComponent);
  const Partial = Curried({ bar: 'bar' });

  const actual = React.createElement(Partial, { foo: 'foo' });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, {
    foo: 'foo',
    bar: 'bar'
  });
  isEqual(t, actual, expected);
});

test('should curry required props from proptypes on stateless functions', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.baz}{props.a}</div>;
  }
  MyComponent.propTypes = {
    foo: React.PropTypes.string.isRequired,
    bar: React.PropTypes.string.isRequired,
    baz: React.PropTypes.string
  };

  const Curried = curry(MyComponent, { a: 1 });
  const Partial1 = Curried({ foo: 'foo' });
  const Partial2 = Partial1({ baz: 'baz' });
  const Partial3 = Partial2({ bar: 'bar' });

  const actual = React.createElement(Partial3, { foo: 'override' });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, {
    foo: 'override',
    bar: 'bar',
    baz: 'baz',
    a: 1
  });
  isEqual(t, actual, expected);
});

test('should curry required props from proptypes on components functions', function (t) {
  const MyComponent = React.createClass({
    propTypes: {
      foo: React.PropTypes.string.isRequired,
      bar: React.PropTypes.string.isRequired,
      baz: React.PropTypes.string
    },
    render () {
      const props = this.props;
      return <div>{props.foo}{props.bar}{props.baz}</div>;
    }
  });

  const Curried = curry(MyComponent);
  const Partial1 = Curried({ foo: 'foo' });
  const Partial2 = Partial1({ baz: 'baz' });
  const Partial3 = Partial2({ bar: 'bar' });

  const actual = React.createElement(Partial3, { foo: 'override' });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, {
    foo: 'override',
    bar: 'bar',
    baz: 'baz'
  });
  isEqual(t, actual, expected);
});

test('should be able to defined arity', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.baz}</div>;
  }
  const Curried = curry(MyComponent, 2);
  const Curried2 = Curried({ bar: 'bar' });
  const Curried3 = Curried2({ baz: 'baz' });

  const actual = React.createElement(Curried3, { foo: 'foo' });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, {
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  });
  isEqual(t, actual, expected);
});

test('should be able to defined arity and initial props', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.baz}{props.a}</div>;
  }
  const Curried = curry(MyComponent, 2, { a: 1 });
  const Curried2 = Curried({ bar: 'bar' });
  const Curried3 = Curried2({ baz: 'baz' });

  const actual = React.createElement(Curried3, { foo: 'foo' });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, {
    a: 1,
    foo: 'foo',
    bar: 'bar',
    baz: 'baz'
  });
  isEqual(t, actual, expected);
});

test('should be able to defined arity and initial props and override by currying', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.baz}{props.a}</div>;
  }
  const Curried = curry(MyComponent, 2, { a: 1 });
  const Curried2 = Curried({ bar: 'bar' });
  const Curried3 = Curried2({
    baz: 'baz',
    bar: 'foo',
    a: 42
  });

  const actual = React.createElement(Curried3, { foo: 'foo' });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, {
    a: 42,
    foo: 'foo',
    bar: 'foo',
    baz: 'baz'
  });
  isEqual(t, actual, expected);
});

test('should work without properties', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.baz}{props.a}</div>;
  }
  const Curried = curry(MyComponent, 2);
  const Curried2 = Curried();
  const Curried3 = Curried2();

  const actual = React.createElement(Curried3, { });
  t.true(isElement(actual));

  const expected = React.createElement(MyComponent, { });
  isEqual(t, actual, expected);
});

function isEqual (t, actual, expected) {
  const a = render(actual);
  const e = render(expected);
  t.is(a, e);
}

function render (component) {
  return ReactDOM.renderToString(component);
}
