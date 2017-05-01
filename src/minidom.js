(({ keys, defineProperty, getOwnPropertyDescriptor }) => {
  const Getter = (a, b, get, set) => defineProperty(a.prototype, b, { get, set, configurable:true, enumerable:true })
  const Method = (a,b, value) => defineProperty(a.prototype, b, { value, configurable:true, writable:true });
  const Alias = (a, b, c=b, d=a) => defineProperty(d, c, getOwnPropertyDescriptor(a, b))
  const STORE = new WeakMap;
  function remove(store, opt) {
      const pass = keys(opt).reduce((fx, k) => opt[ k ] ? e => fx(e) && e[ k ]===opt[ k ] : fx, ()=>!0);
      for (var e, i = 0, j = 0; i < store.length; i++)
        pass(e=store[ i ]) && !e.off() && (store[ j++ ] = e)
      store.length = j;
    }
  function parse(x) {
      assert('string', typeof x, `Dom:Event Name must be a String`)
      let i = x.indexOf(' ')
      return i > 0 ? [ x.slice(0, i), x.slice(i).trim() ] : [ x ]
    }
  function assert(a, b, msg) {
      if (a !== b)
        throw new TypeError(msg||'Epic Fail');
    }
  function query(x) {
      return [ ...this.querySelectorAll(x) ]
    }
  Method(Document, 'query', query)
  Method(Element, 'query', query)
  Method(Element, 'empty', function empty() {
      while (this.firstChild)
          this.removeChild('function'===typeof this.firstChild.off ? this.firstChild.off() : this.firstChild);
      return this;
    })
  Method(Element, 'insert', function insert(x, pos) {
      this[ x instanceof Element ? 'insertAdjacentElement' : 'insertAdjacentHTML' ](pos||'beforeEnd', x);
      return this
    })
  Method(Element, 'append'  , function append(x) { return this.insert(x, 'beforeEnd') })
  Method(Element, 'prepend' , function prepend(x) { return this.insert(x, 'afterBegin') })
  Method(Element, 'after'   , function after(x) { return this.insert(x, 'afterEnd') })
  Method(Element, 'before'  , function before(x) { return this.insert(x, 'beforeBegin') })
  Method(Element, 'on', function on(str, cb, ctx) {
      assert('function', typeof cb, `Dom:Event Callback must be a Function`)
      const [ name, selector ] = parse(str)
      const exec = e => false === cb.call(ctx, e, e.target) && (e.preventDefault(), e.stopPropagation());
      const handler = selector ? e => e.target.matches(selector) && exec(e) : exec;
      const off = () => !this.removeEventListener(name, handler, false);
      STORE.has(this) || STORE.set(this, [])
      STORE.get(this).push({ name, selector, cb, ctx, off })
      this.addEventListener(name, handler, false);
      return this;
    })
  Method(Element, 'off', function off(str, cb, ctx) {
    const store = STORE.get(this)
    if (str && store) {
      if ('function'===typeof str)
        ctx = cb, cb = str, str = '';
      const [ name, selector ] = parse(str)
      remove(store, { name, selector, cb, ctx });
    } else
      store && store.forEach(e => e.off());
    !store||!store.length && STORE.delete(this)
    return this
  })
  Method(Element, 'once', function once(str, cb, ctx) {
      let func = e => (this.off(str, func), cb.call(ctx, e, e.target));
      return this.on(str, func)
    })
  Getter(Element, 'html', function get() {
      return this.innerHTML
    }, function set(html) {
      return this.empty().append(html)
    })
  Method(Document, 'unbind', function unbind() {
      for(let el of document.all)
        STORE.has(el) && !STORE.get(el).forEach(e => e.off()) && STORE.delete(el)
    })
  Method(Document, 'events', function events(el) {
      return STORE.get(el)
    })
  Alias(Document, 'query', '$')
  Alias(Document, 'querySelector', 'find')
  Alias(Element, 'query', '$')
  Alias(Element, 'querySelector', 'find')
  Alias(Element, 'lastElementChild', 'last')
  Alias(Element, 'firstElementChild', 'first')
  Alias(Element, 'nextElementSibling', 'next')
  Alias(Element, 'previousElementSibling', 'prev')
  Alias(Node, 'textContent', 'text')
  Alias(Node, 'parentElement', 'parent')
})(Object)