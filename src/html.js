'use strict';

exports.get = function() {
  return this.innerHTML
}
exports.set = function(html) {
    return this.empty().append(html)
  }