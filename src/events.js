'use strict';
const RGX = /(\w+)\s?(.*)?/;
const STORE = new WeakMap;
module.exports = { on, off, once, STORE };

function on(str, cb, ctx) {
  if ('string' !== typeof str)
    throw new TypeError(`"event" must be a string`);
  if ('function' !== typeof cb)
    throw new TypeError(`"cb" must be a function`);

  const [ , name, selector ] = str.match(RGX);
  const exec = e => false === cb.call(ctx, e, e.target) && (e.preventDefault(), e.stopPropagation());
  const handler = selector ? e => e.target.matches(selector) && exec(e) : exec;
  const off = () => this.removeEventListener(name, handler, false);
  STORE.has(this) || STORE.set(this, []);
  STORE.get(this).push({ name, selector, cb, ctx, off });
  this.addEventListener(name, handler, false);
  return this;
}

function off(str, cb, ctx) {
  if (!STORE.has(this))
    return this;

  let type = typeof str, store = STORE.get(this), filters = [];
  if ('undefined'==type)
    return store.forEach(e => e.off()), STORE.delete(this), this;

  if ('function'==type)
    ctx = cb, cb = str;
  else if ('string'==type) {
    let [ , name, selector ] = str.match(RGX)||[];
    name && filters.push(e => e.name === name);
    selector && filters.push(e => e.selector === selector);
  }

  cb && filters.push(e => e.cb === cb);
  ctx && filters.push(e => e.ctx === ctx);

  for (let e, i=0; e = store[ i ]; i++)
    filters.every(fn => fn(e = store[ i ])) && (e.off(), store.splice(i, 1), i--);
  store.length===0 && STORE.delete(this);
  return this
}

function once(str, cb, ctx) {
    let func = e => (this.off(str, func), cb.call(ctx, e, e.target));
    return this.on(str, func)
  }
