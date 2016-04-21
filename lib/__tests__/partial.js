import { createRenderer } from 'react-addons-test-utils';
import jsx from 'react-element-to-jsx-string';
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

test('should apply partially with children', function (t) {
  function MyComponent (props) {
    return <div>{props.foo}{props.children}</div>;
  }
  const Partialed = partial(MyComponent, {
    bar: 'bar',
    children: [
      <h1>Hello, world</h1>
    ]
  });
  const actual = (
    <Partialed foo='foo' bar='bar'>
      <p>My message</p>
    </Partialed>
  );
  const expected = (
    <MyComponent foo='foo' bar='bar'>
      <h1>Hello, world</h1>
      <p>My message</p>
    </MyComponent>
  );
  isEqual(t, actual, expected);
});

function isEqual (t, actual, expected) {
  const a = jsx(render(actual));
  const e = jsx(expected);
  t.is(a, e);
}

function render (jsx) {
  const renderer = createRenderer();
  renderer.render(jsx);
  return renderer.getRenderOutput();
}
