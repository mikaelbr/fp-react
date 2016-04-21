# Functional Helpers for React

A work in experimental progress library for functional helpers to React components.

## Implemented Functions

### `partial(component, ...args)`

```jsx
function MyComponent (props) {
  return <div>{props.foo}{props.children}</div>;
}
const Partialed = partial(MyComponent, {
  bar: 'bar',
  children: [
    <h1>Hello, world</h1>
  ]
});
render(
  <Partialed foo='foo' bar='bar'>
    <p>My message</p>
  </Partialed>
);

// Returns:
// <MyComponent foo='foo' bar='bar'>
//   <h1>Hello, world</h1>
//   <p>My message</p>
// </MyComponent>
```

### `memoizeish(component)`

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

### `partialRight(component, ...args)`

### `wrap(value, [wrapper=identity])`

### `flowRight(...components)`

### `flow(...components)`
