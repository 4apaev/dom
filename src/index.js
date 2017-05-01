const Is = require('is').use('el', x => x instanceof Element)
const Dec = require('declare')
const { get, set, empty, query } = require('./html')
const { on, off, once, unbind } = require('./events')
const { insert, append, prepend, after, before } = require('./insert')

Dec.method(Element.prototype, 'empty'   , empty)
Dec.method(Element.prototype, 'query'   , query)
Dec.method(Element.prototype, 'insert'  , insert)
Dec.method(Element.prototype, 'append'  , append)
Dec.method(Element.prototype, 'prepend' , prepend)
Dec.method(Element.prototype, 'after'   , after)
Dec.method(Element.prototype, 'before'  , before)
Dec.method(Element.prototype, 'on'      , on)
Dec.method(Element.prototype, 'once'    , once)
Dec.method(Element.prototype, 'off'     , off)
Dec.accessor(Element.prototype, 'html'  , get, set)

Dec.method(Document.prototype, 'unbind' , unbind)
Dec.method(Document.prototype, 'query'  , query)

Dec.alias(Document.prototype, 'query', '$')
Dec.alias(Document.prototype, 'querySelector', 'find')

Dec.alias(Element.prototype, 'query', '$')
Dec.alias(Element.prototype, 'querySelector', 'find')

Dec.alias(Element.prototype, 'lastElementChild', 'last')
Dec.alias(Element.prototype, 'firstElementChild', 'first')
Dec.alias(Element.prototype, 'nextElementSibling', 'next')
Dec.alias(Element.prototype, 'previousElementSibling', 'prev')

Dec.alias(Node.prototype, 'textContent', 'text')
Dec.alias(Node.prototype, 'parentElement', 'parent')