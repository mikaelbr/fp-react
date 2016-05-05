import _curryBase from './helpers/_curryBase';

const curry = _curryBase((...args) => Object.assign({}, ...args));
export default curry;
