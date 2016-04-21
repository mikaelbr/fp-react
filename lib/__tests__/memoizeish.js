import memoizeish from '../memoizeish';
import React from 'react';
import ReactDOM from 'react-dom';
import test from 'ava';

test('should memoizeish statless', function (t) {
  let numCalls = 0;
  function MyComponent (props) {
    numCalls += 1;
    return <div>{props.foo}</div>;
  }
  const Memoized = memoizeish(MyComponent);

  var props = { foo: 'bar' };
  render(<Memoized {...props} />);
  render(<Memoized {...props} />);
  render(<Memoized {...props} />);
  t.is(numCalls, 1);
});

test('should memoizeish components', function (t) {
  let numCalls = 0;
  var MyComponent = React.createClass({

    render () {
      numCalls += 1;
      return <div>{this.props.foo}</div>;
    }
  });

  const Memoized = memoizeish(MyComponent);

  var props = { foo: 'bar' };
  render(<Memoized {...props} />);
  render(<Memoized {...props} />);
  render(<Memoized {...props} />);
  t.is(numCalls, 1);
});

test('should memoizeish classish', function (t) {
  let numCalls = 0;
  class MyComponent extends React.Component {
    render () {
      numCalls += 1;
      return <div>{this.props.foo}</div>;
    }
  }

  const Memoized = memoizeish(MyComponent);

  var props = { foo: 'bar' };
  render(<Memoized {...props} />);
  render(<Memoized {...props} />);
  render(<Memoized {...props} />);
  t.is(numCalls, 1);
});

function render (component) {
  ReactDOM.render(component, global.document.querySelector('#app'));
}
