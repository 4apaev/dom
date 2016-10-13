'use strict';


exports.insert = function insert(element, position='beforeEnd') {
  return this[`insertAdjacent${ 1 == element.nodeType ? 'Element': 'HTML' }`](position, element)
}

exports.append = function append(element) {
  return this.insert(element, 'beforeEnd')
}

exports.prepend = function prepend(element) {
  return this.insert(element, 'afterBegin')
}

exports.after = function after(element) {
  return this.insert(element, 'afterEnd')
}

exports.before = function before(element) {
  return this.insert(element, 'beforeBegin')
}
