'use strict';
const Is = require('is')

module.exports = attrs
function attrs(name, value) {
  if (Is(value))
    this.setAttribute(name, value)
  else if (Is.obj(name))
    Object.keys(name).forEach(k => this.setAttribute(k, name[ k ]))
  else
    return this.getAttribute(name)
  return this
}
