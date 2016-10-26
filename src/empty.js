'use strict';

const is = require('is');
module.exports = empty;

function empty(first) {
  while (first = this.firstChild)
    this.removeChild(is.func(first.off) ? first.off() : first);
  return this;
}
