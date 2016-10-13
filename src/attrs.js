'use strict';

const is = require('is')
const { keys, create } = Object

module.exports = attrs

function attrs(name, value) {
  if (is.def(value))
    this.setAttribute(name, value)

  else if (is.obj(name))
    keys(name).forEach(k => this.setAttribute(k, name[k]))

  else
    return this.getAttribute(name)

  return this
}
