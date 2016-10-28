'use strict';
const is = require('is');
const STORE = new WeakMap;
module.exports = { on, off, STORE };

function on(str, cb, ctx) {
  is.str.assert(str, '[Event:on] first argument must be a string');
  is.func.assert(cb, '[Event:on] second argument must be a function');

  const { name, selector } = createEntry(str);
  const exec = e => false === cb.call(ctx, e) && stop(e);
  const handler = selector ? e => e.target.matches(selector) && exec(e) : exec;
  const off = () => this.removeEventListener(name, handler, false);
  STORE.has(this) || STORE.set(this, []);
  STORE.get(this).push({ name, selector, cb, ctx, off });
  this.addEventListener(name, handler, false);
  return this;
}

function off(str, cb, ctx) {
  if (is.empty(STORE.has(this)))
    return this;

  let type = typeof str;
  if ('undefined' === type)
    return remove(this, [ entry => true ]);

  if ('function' === type)
    return this.off('', str, cb);

  if ('string' === type) {
    let filters = [];
    let { name, selector } = createEntry(str);

    cb && filters.push(entry => entry.cb === cb);
    ctx && filters.push(entry => entry.ctx === ctx);
    name && filters.push(entry => entry.name === name);
    selector && filters.push(entry => entry.selector === selector);
    return remove(this, filters);
  }
  return this;
}

function remove(el, filters) {
  let entry, i = -1, store = STORE.get(el);
  while (entry = store[++i]) {
    if (filters.every(fn => fn(entry))) {
      entry.off();
      store.splice(i, 1);
      i--;
    }}
  is.empty(store) && STORE.delete(el);
  return el;
}

function createEntry(str) {
  let [ name, ...rest ] = str.split(' ');
  let selector = rest.join(' ');
  return { name, selector }
}

function stop(e) {
  e.preventDefault();
  e.stopPropagation();
}
