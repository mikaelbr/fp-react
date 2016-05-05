# Functional Helpers for React

A work in progress, experimental, library for functional helpers to React components.


## `partial(Component, partialProps)`

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.children}</div>;
}
const Partialed = partial(MyComponent, {
  bar: 'bar',
  a: 1,
  children: [
    <h1>Hello, world</h1>
  ]
});
render(
  <Partialed foo='foo' a='2'>
    <p>My message</p>
  </Partialed>
);
```

### Returns
```jsx
<MyComponent foo='foo' bar='bar' a='2'>
  <h1>Hello, world</h1>
  <p>My message</p>
</MyComponent>
```

## `partialRight(Component, partialProps)`

Same as `partial`, but (first) partially applied arguments take precedence.
Useful for the times you want to guarantee that a component has a property set.

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.children}</div>;
}
const Partialed = partialRight(MyComponent, {
  bar: 'bar',
  a: 1,
  children: [
    <h1>Hello, world</h1>
  ]
});
render(
  <Partialed foo='foo' a='2'>
    <p>My message</p>
  </Partialed>
);
```

### Returns
```jsx
<MyComponent foo='foo' bar='bar' a='1'>
  <p>My message</p>
  <h1>Hello, world</h1>
</MyComponent>
```

## `memoizeish(Component)`

Almost like memoize, but more as a 1-step Markov chain, not with history. Utilizes
a smart default `shouldComponentUpdate` from [Omniscient.js](https://github.com/omniscientjs/omniscient).

```jsx
const Memoized = memoizeish(function MyComponent (props) {
  return <div>{props.foo}</div>;
});

render(<Memoized foo='bar' />);
render(<Memoized foo='bar' />); // not updated
render(<Memoized foo='bar' />); // not updated
```

## `wrap(value, [wrapper=identity])`

```jsx
function MyComponent (props) {
  return <h1>{props.foo}</h1>;
}
const Section = wrap(MyComponent, function (Comp, props) {
  return (
    <section>{Comp(props)}</section>
  );
});

render(React.createElement(Section, { foo: 'foo' }));
```

### Returns
```jsx
<section><h1>foo</h1></section>
```

## `curry(Component, arity = 1, initialProps = { })`

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.bar}</div>;
}
const Curried = curry(MyComponent, 2, { a: 1 });
const Curried2 = Curried({ bar: 'bar' }); // Curry nr. 1
const Curried3 = Curried2({ // Curry nr. 2
  baz: 'baz',
  bar: 'foo',
  a: 42
});
render(React.createElement(Curried3, { foo: 'foo' }));
```

### Returns
```jsx
<MyComponent a='42' bar='foo' baz='baz' foo='foo' />
```

### With `propTypes`

Instead of defining the arity yourself you can set required proptypes on
your component and automatically define arity. Curried components with
proptypes will terminate currying when all required props are provided.

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.bar}{props.baz}</div>;
}
MyComponent.propTypes = {
  foo: React.PropTypes.string.isRequired,
  bar: React.PropTypes.string.isRequired,
  baz: React.PropTypes.string
};

const Curried = curryRight(MyComponent);
const Partial1 = Curried({ foo: 'foo' });
const Partial2 = Partial1({ baz: 'baz' });
const Partial3 = Partial2({ bar: 'bar' });

render(React.createElement(Partial3, { foo: 'override' }));
```

### Returns
```jsx
<MyComponent bar='bar' baz='baz' foo='override' />
```

## `curryRight(Component, arity = 1, initialProps = { })`

`curryRight` is to `curry` as `partialRight` is to `partial`. The former passed
properties takes precedence of the latter. Useful for the times where you want to
be sure that a component has properties set.

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.bar}</div>;
}
const Curried = curryRight(MyComponent, 2, { a: 1 });
const Curried2 = Curried({ bar: 'bar' }); // Curry nr. 1
const Curried3 = Curried2({ // Curry nr. 2
  baz: 'baz',
  bar: 'foo',
  a: 42
});
render(React.createElement(Curried3, { foo: 'foo' }));
```

### Returns
```jsx
<MyComponent a='1' bar='bar' baz='baz' foo='foo' />
```

_(note the `a` and `bar` properties)_

### With `propTypes`

Instead of defining the arity yourself you can set required proptypes on
your component and automatically define arity. Curried components with
proptypes will terminate currying when all required props are provided.

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.bar}{props.baz}</div>;
}
MyComponent.propTypes = {
  foo: React.PropTypes.string.isRequired,
  bar: React.PropTypes.string.isRequired,
  baz: React.PropTypes.string
};

const Curried = curryRight(MyComponent);
const Partial1 = Curried({ foo: 'foo' });
const Partial2 = Partial1({ baz: 'baz' });
const Partial3 = Partial2({ bar: 'bar' });

render(React.createElement(Partial3, { foo: 'override' }));
```

### Returns
```jsx
<MyComponent bar='bar' baz='baz' foo='foo' />
```

_(note the `foo` property)_

## `flow(...components)`

```jsx
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

const Composed = flow(Div, Section, H1, Italic);
render(
  <Composed>Hello World!</Composed>
);
```

### Returns
```jsx
<div><section><h1><em>Hello World!</em></h1></section></div>
```

## `flowRight(...components)`

```jsx
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
render(
  <Composed>Hello World!</Composed>
);
```

### Returns
```jsx
<div><section><h1><em>Hello World!</em></h1></section></div>
```
