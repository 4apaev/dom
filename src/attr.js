'use strict';
const Is = require('is')
module.exports = function attr(name, value) {
    if (Is(value))
      this.setAttribute(name, value)
    else if (Is.obj(name))
      Object.keys(name).forEach(k => this.setAttribute(k, name[ k ]))
    else
      return name ? this.getAttribute(name) : [ ...this.attributes ]
    return this
  }