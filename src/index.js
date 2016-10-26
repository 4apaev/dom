'use strict';

const is = require('is');
const declare = require('declare');

is.use('el', x => x instanceof Element);
is.use('node', x => x instanceof Node);

const attrs = require('./attrs');
const empty = require('./empty');
const html = require('./html');
const events = require('./events');
const { insert, append, prepend, after, before } = require('./insert');

///////////////////////// html
declare.method(Element.prototype,   'empty',   empty);
declare.accessor(Element.prototype, 'html',    html.get, html.set);

///////////////////////// insert
declare.method(Element.prototype,   'insert',  insert);
declare.method(Element.prototype,   'append',  append);
declare.method(Element.prototype,   'prepend', prepend);
declare.method(Element.prototype,   'after',   after);
declare.method(Element.prototype,   'before',  before);

///////////////////////// attributes
declare.method(Element.prototype,   'attrs',  attrs);

///////////////////////// aliases
declare.alias(Node.prototype,    'textContent',            'text');
declare.alias(Node.prototype,    'parentElement',          'parent');
declare.alias(Element.prototype, 'querySelector',          'find');
declare.alias(Element.prototype, 'querySelectorAll',       'query');
declare.alias(Element.prototype, 'nextElementSibling',     'next');
declare.alias(Element.prototype, 'previousElementSibling', 'prev');
declare.alias(Element.prototype, 'lastElementChild',       'last');
declare.alias(Element.prototype, 'firstElementChild',      'first');
declare.alias(Element.prototype, 'clientWidth',            'width');
declare.alias(Element.prototype, 'clientHeight',           'height');

///////////////////////// EVENTS
Element.STORE = events.STORE
declare.method(Element.prototype,   'on',  events.on);
declare.method(Element.prototype,   'off', events.off);


///////////////////////// collections
'forEach,map,reduce,filter'.split(',').forEach(method => {
  declare.alias(Array.prototype, method, method, NodeList.prototype);
  declare.alias(Array.prototype, method, method, HTMLCollection.prototype);
});


