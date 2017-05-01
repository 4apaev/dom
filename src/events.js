'use strict';
const Is = require('is'), STORE = new WeakMap;
module.exports = { on, off, once, unbind };

function on(str, cb, ctx) {
    Is.must.be.func(cb, `Dom:Event Callback must be a Function`);
    const [ name, selector ] = parse(str)
    const exec = e => false === cb.call(ctx, e, e.target) && (e.preventDefault(), e.stopPropagation());
    const handler = selector ? e => e.target.matches(selector) && exec(e) : exec;
    const off = () => !this.removeEventListener(name, handler, false);
    STORE.has(this) || STORE.set(this, [])
    STORE.get(this).push({ name, selector, cb, ctx, off })
    this.addEventListener(name, handler, false);
    return this;
  }

function once(str, cb, ctx) {
    let func = e => (this.off(str, func), cb.call(ctx, e, e.target));
    return this.on(str, func)
  }

function off(str, cb, ctx) {
  const store = STORE.get(this)
  if (str && store) {
    if (Is.func(str))
      ctx = cb, cb = str, str = '';
    const [ name, selector ] = parse(str)
    remove(store, { name, selector, cb, ctx });
  } else
    store && store.forEach(e => e.off());
  Is.empty(store) && STORE.delete(this)
  return this
}

function remove(store, opt) {
    const pass = Object.keys(opt).reduce((fx, k) => opt[ k ] ? e => fx(e) && e[ k ]===opt[ k ] : fx, ()=>!0);
    for (var e, i = 0, j = 0; i < store.length; i++)
      pass(e=store[ i ]) && !e.off() && (store[ j++ ] = e)
    store.length = j;
  }

function parse(x) {
    Is.must.be.str(x, `Dom:Event Name must be a String`);
    let i = x.indexOf(' ')
    return i > 0 ? [ x.slice(0, i), x.slice(i).trim() ] : [ x ]
  }

function unbind() {
    for(let el of document.all)
      STORE.has(el) && !STORE.get(el).forEach(e => e.off()) && STORE.delete(el)
  }