import ReactDOM from 'react-dom/server';
import partial from '../partial';
import React from 'react';
import test from 'ava';

test('should apply partially', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}</div>;
  }
  const Partialed = partial(MyComponent, { bar: 'bar' });
  const actual = React.createElement(Partialed, { foo: 'foo' });
  const expected = React.createElement(MyComponent, {
    foo: 'foo',
    bar: 'bar'
  });
  isEqual(t, actual, expected);
});

test('should be able to nest partial apply (last take precedence)', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.a}{props.b}{props.c}{props.children}</div>;
  }
  const Partialed = partial(MyComponent, {
    bar: 'bar1',
    a: 1
  });
  const Partialed2 = partial(Partialed, {
    bar: 'bar2',
    b: 1
  });
  const Partialed3 = partial(Partialed2, {
    bar: 'bar3',
    c: 1
  });
  const actual = (
    <Partialed3 foo='foo'>
      <p>My message</p>
    </Partialed3>
  );
  const expected = (
    <MyComponent foo='foo' bar='bar3' a='1' b='1' c='1'>
      <p>My message</p>
    </MyComponent>
  );
  isEqual(t, actual, expected);
});

test('should be able to override last', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.children}</div>;
  }
  const Partialed = partial(MyComponent, {
    bar: 'bar'
  });
  const actual = (
    <Partialed bar='foo'>
      <p>My message</p>
    </Partialed>
  );
  const expected = (
    <MyComponent bar='foo'>
      <p>My message</p>
    </MyComponent>
  );
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
