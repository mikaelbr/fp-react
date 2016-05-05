import ReactDOM from 'react-dom/server';
import wrap from '../wrap';
import React from 'react';
import test from 'ava';

test('should wrap component', function (t) {
  function MyComponent (props) {
    return <h1>{props.foo}</h1>;
  }
  const Section = wrap(MyComponent, function (Comp, props) {
    return (
      <section>
        <Comp {...props} />
      </section>
    );
  });

  const actual = React.createElement(Section, { foo: 'foo' });
  const expected = (
    <section>
      <h1>foo</h1>
    </section>
  );
  isEqual(t, actual, expected);
});

test('should wrap text', function (t) {
  function MyComponent (props) {
    return <h1>{props.foo}</h1>;
  }
  const Section = wrap(MyComponent, function (Comp, props) {
    return (
      <section>{Comp(props)}</section>
    );
  });

  const actual = React.createElement(Section, { foo: 'foo' });
  const expected = (
    <section><h1>foo</h1></section>
  );
  isEqual(t, actual, expected);
});

test('should work as other wrap functions', function (t) {
  const changeName = (str) => str.replace('fred', 'ted');
  var Paragraph = wrap(changeName, function (func, { foo }) {
    return <p>{func(foo)}</p>;
  });

  const actual = <Paragraph foo='fred, barney, & pebbles' />;
  const expected = <p>ted, barney, &amp; pebbles</p>;
  isEqual(t, actual, expected);
});

test('should default to identity', function (t) {
  const changeName = ({ foo }) => <p>{foo.replace('fred', 'ted')}</p>;
  var Paragraph = wrap(changeName);

  const actual = <Paragraph foo='fred, barney, & pebbles' />;
  const expected = <p>ted, barney, & pebbles</p>;
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
