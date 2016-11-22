const declare = require('declare')
const aliases = require('./aliases')
const RGX = /(\w+)\s?(.*)?/
const STORE = new WeakMap

aliases.forEach(([ src, name, alias, ...targets ]) => {
  let ctor = window[ src ].prototype
  targets.forEach(trg => {
    declare.alias(ctor, name, alias, window[ trg ].prototype)
  })
})

declare.mute.lock.fix.value(Element, 'STORE', STORE);

declare.bulk.method(Element.prototype,
  function on(event, cb, ctx) {
    if (typeof event !='string') throw new TypeError(`"event" must be a string`);
    if (typeof cb !='function') throw new TypeError(`"cb" must be a function`);

    const [ , name, selector ] = event.match(RGX);
    const exec = e => false === cb.call(ctx, e, e.target) && (e.preventDefault(), e.stopPropagation());
    const handler = selector ? e => e.target.matches(selector) && exec(e) : exec;

    STORE.has(this)||STORE.set(this, []);
    STORE.get(this).push({ name, selector, cb, ctx, off: () => this.removeEventListener(name, handler, false) });

    this.addEventListener(name, handler, false);
    return this;
  },

  function off(event, cb, ctx) {
    if (!STORE.has(this))
      return this;
    let type = typeof event, store = STORE.get(this), buf = []
    if ('undefined'==type) {
      store.forEach(e => e.off())
      STORE.delete(this);
      return this
    }
    if ('function'==type)
      ctx = cb, cb = event;
    else if ('string'==type) {
      let [ , name, selector ] = event.match(RGX)||[];
      name && buf.push(e => e.name===name)
      selector && buf.push(e => e.selector===selector)
    }

    cb && buf.push(e => e.cb===cb)
    ctx && buf.push(e => e.ctx===ctx)

    for (let e, i=0; e = store[ i ]; i++)
      buf.every(fn => fn(e = store[ i ])) && (e.off(), store.splice(i, 1), i--);
    !store.length && STORE.delete(this);
    return this
  },

  function once(str, cb, ctx) {
    let func = e => (this.off(str, func), cb.call(ctx, e, e.target));
    return this.on(str, func)
  },

  function empty(first) {
    while (first = this.firstChild)
      this.removeChild('function' === typeof first.off ? first.off() : first);
    return this;
  },
  function insert(x, position = 'beforeEnd') {
    this[ x instanceof Element ? 'insertAdjacentElement' : 'insertAdjacentHTML' ](position, x);
    return this
  },
  function append(x)  { return this.insert(x, 'beforeEnd')   },
  function prepend(x) { return this.insert(x, 'afterBegin')  },
  function after(x)   { return this.insert(x, 'afterEnd')    },
  function before(x)  { return this.insert(x, 'beforeBegin')
})

declare.getter(Element.prototype, 'html', function() {
    return this.innerHTML
  }, function(str) {
      return this.empty().append(str)
    })

