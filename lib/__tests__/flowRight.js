import ReactDOM from 'react-dom/server';
import flowRight from '../flowRight';
import React from 'react';
import test from 'ava';

test('should be able to compose two components passing props to all', function (t) {
  function MyComponent2 (props) {
    t.is(props.a, 1);
    return <section>{props.a}{props.children}</section>;
  }
  function MyComponent1 (props) {
    t.is(props.a, 1);
    return <h1>{props.a}{props.children}</h1>;
  }
  const Composed = flowRight(MyComponent1, MyComponent2);
  const actual = (
    <Composed a={1}>
      <span>Foo</span>
    </Composed>
  );

  const expected = (
    <section>1<h1>1<span>Foo</span></h1></section>
  );
  isEqual(t, actual, expected);
});

test('should be able to compose several components', function (t) {
  function Div (props) {
    return <div>{props.children}</div>;
  }
  function Section (props) {
    return <section>{props.children}</section>;
  }
  function H1 (props) {
    return <h1>{props.children}</h1>;
  }
  function Italic (props) {
    return <em>{props.children}</em>;
  }

  const Composed = flowRight(Italic, H1, Section, Div);
  const actual = (
    <Composed>Hello World!</Composed>
  );

  const expected = (
    <div><section><h1><em>Hello World!</em></h1></section></div>
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
