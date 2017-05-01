'use strict';
const Is = require('is')
module.exports = {
  insert(x, pos) {
      this[ Is.el(x) ? 'insertAdjacentElement' : 'insertAdjacentHTML' ](pos||'beforeEnd', x);
      return this
    },
  append(x) { return this.insert(x, 'beforeEnd') },
  prepend(x) { return this.insert(x, 'afterBegin') },
  after(x) { return this.insert(x, 'afterEnd') },
  before(x) { return this.insert(x, 'beforeBegin') }
}