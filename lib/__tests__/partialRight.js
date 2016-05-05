import partialRight from '../partialRight';
import ReactDOM from 'react-dom/server';
import React from 'react';
import test from 'ava';

test('should apply partially', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}</div>;
  }
  const Partialed = partialRight(MyComponent, { bar: 'bar' });
  const actual = React.createElement(Partialed, { foo: 'foo' });
  const expected = React.createElement(MyComponent, {
    foo: 'foo',
    bar: 'bar'
  });
  isEqual(t, actual, expected);
});

test('should apply partially with children', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.children}</div>;
  }
  const Partialed = partialRight(MyComponent, {
    bar: 'bar',
    children: [
      <h1>Hello, world</h1>
    ]
  });
  const actual = (
    <Partialed foo='foo'>
      <p>My message</p>
    </Partialed>
  );
  const expected = (
    <MyComponent foo='foo' bar='bar'>
      <p>My message</p>
      <h1>Hello, world</h1>
    </MyComponent>
  );
  isEqual(t, actual, expected);
});

test('should be able to nest partial apply (first take precedence)', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.a}{props.b}{props.c}{props.children}</div>;
  }
  const Partialed = partialRight(MyComponent, {
    bar: 'bar1',
    a: 1
  });
  const Partialed2 = partialRight(Partialed, {
    bar: 'bar2',
    b: 1
  });
  const Partialed3 = partialRight(Partialed2, {
    bar: 'bar3',
    c: 1
  });
  const actual = (
    <Partialed3 foo='foo'>
      <p>My message</p>
    </Partialed3>
  );
  const expected = (
    <MyComponent foo='foo' bar='bar1' a='1' b='1' c='1'>
      <p>My message</p>
    </MyComponent>
  );
  isEqual(t, actual, expected);
});

test('should have first override last', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.bar}{props.children}</div>;
  }
  const Partialed = partialRight(MyComponent, {
    bar: 'bar'
  });
  const actual = (
    <Partialed bar='foo'>
      <p>My message</p>
    </Partialed>
  );
  const expected = (
    <MyComponent bar='bar'>
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
