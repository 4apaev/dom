'use strict';

const is = require('is');

module.exports = createElement;
function createElement(element, attrs) {

  let el = 1 === element.nodeType
    ? element
    : document.createElement(element);

  if (is.obj(attrs)) {
    for (let key in attrs)
      is.own(attrs, key) && el.setAttribute(key, attrs[key]);
  }

}

