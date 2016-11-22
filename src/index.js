const declare = require('declare');
const { on, once, off, STORE } = require('./events');
const { insert, append, prepend, before, after } = require('./insert');
const aliases = require('./aliases');

aliases.forEach(([ src, name, alias, ...targets ]) => {
  let ctor = self[ src ].prototype
  targets.forEach(trg => {
    declare.alias(ctor, name, alias, self[ trg ].prototype)
  })
});

exports.find = document.querySelector.bind(document)
exports.query = document.querySelectorAll.bind(document)

declare.getter(Element, 'STORE', () => STORE);
declare.method(Element.prototype, 'on', on);
declare.method(Element.prototype, 'once', once);
declare.method(Element.prototype, 'off', off);

declare.method(Element.prototype, 'insert', insert);
declare.method(Element.prototype, 'append', append);
declare.method(Element.prototype, 'prepend', prepend);
declare.method(Element.prototype, 'after', after);
declare.method(Element.prototype, 'before', before);

declare.method(Element.prototype, 'empty', function empty(first) {
  while (first = this.firstChild)
    this.removeChild('function' === typeof first.off ? first.off() : first);
  return this;
});

declare.accessor(Element.prototype, 'html', function() {
  return this.innerHTML
}, function(str) {
  return this.empty().append(str)
});

