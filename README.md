# Functional Helpers for React

A work in progress, experimental, library for functional helpers to React components.

## Implemented Functions

### `partial(component, partialProps)`

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

// Returns:
// <MyComponent foo='foo' bar='bar' a='2'>
//   <h1>Hello, world</h1>
//   <p>My message</p>
// </MyComponent>
```

### `partialRight(component, partialProps)`

Same as `partial`, but (first) partially applied arguments take precedence.
Useful for the times you want to guarantee that a component has a property set.

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

// Returns:
// <MyComponent foo='foo' bar='bar' a='1'>
//   <p>My message</p>
//   <h1>Hello, world</h1>
// </MyComponent>
```

### `memoizeish(component)`

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

## Functions Yet To Be Implemented

### `curry(component, arity)`

### `curryRight(component, arity)`

### `wrap(value, [wrapper=identity])`

### `flowRight(...components)`

### `flow(...components)`
