'use strict';
exports.insert = function insert(x, position = 'beforeEnd') {
  this[ x instanceof Element ? 'insertAdjacentElement' : 'insertAdjacentHTML' ](position, x);
  return this
};
exports.append = function append(x) {
  return this.insert(x, 'beforeEnd')
};
exports.prepend = function prepend(x) {
  return this.insert(x, 'afterBegin')
};
exports.after = function after(x) {
  return this.insert(x, 'afterEnd')
};
exports.before = function before(x) {
  return this.insert(x, 'beforeBegin')
};