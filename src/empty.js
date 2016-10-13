'use strict';

const is = require('is');
module.exports = empty;

function empty(first) {
  while (first = this.firstChild) {
    if (is.func(first.off))
      this.removeChild(first.off());
    else
      this.removeChild(first);
  }
  return this;
}
