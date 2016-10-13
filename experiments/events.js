const is = require('is');
const { keys, create } = Object

module.exports = class Store {
  constructor() {
    this.attrs = create(null)
  }
  /**
   * Add event listener for given element
   * event can be delegated if selector passed
   * after event name: `click .selector`
   *
   * @param {HTMLElement} el
   * @param {String} str
   * @param {Function} cb
   * @param {Object} ctx
   */

  add(el, str, cb, ctx) {
    const { name, selector } = this.createEntry(str, cb, ctx);
    const store = this.set(el).get(el);
    const exec = e => false === cb.call(ctx, e) && Store.stop(e);

    const handler = selector
      ? e => e.target.matches(selector) && exec(e)
      : exec;

    const off = e => el.removeEventListener(name, handler, false);
    store.push({ name, selector, cb, ctx, off });

    el.addEventListener(name, handler, false);
    return el;
  }

  /**
   * Remove event listener for given element
   * can be invoked with:
   * el, str, cb, ctx : revoke listeners for given event/selector and callback and context
   * el, str, cb : revoke listeners for given event/selector and callback
   * el, str : revoke listeners for given event/selector
   * el, cb : revoke listeners which use given callback
   * el : revoke all listeners

   * @param {HTMLElement} el
   * @param {String} str
   * @param {Function} cb
   * @param {Object} ctx
   */

  remove(el, str, cb, ctx) {
    let store = this.get(el);

    if (is.empty(store))
      return this;

    // case of: el
    else if (!str)
      return this.delete(store);

    // case of: el, cb
    if (is.func(str))
      return this.drop(store, e => str === e.cb);

    // case of: el, str||cb, cb||ctx
    let entry = this.createEntry(str, cb, ctx);
    let filter = this.createFilter(entry)

    return filter
      ? this.drop(store, filter)
      : this.delete(store);
  }

  /**
   * Performe scan on given store
   * and remove all matched entries
   * @param {Array} store
   * @param {Function} filter
   */

  drop(store, filter) {
    let e, i = -1;
    while (e = store[++i]) {
      if (filter(e)) {
        event.off(e);
        store.splice(i, 1);
        i--;
      }}
    return this
  }

  /**
   * Revoke all listeners for given store
   * and reset element store
   * @param {Array} store
   */

  delete(store) {
    if (store && store.length) {
      store.forEach(e => e.off(e));
      store.length = 0;
    }
    delete this.attrs[el];
    return this;
  }

  /**
   * Revoke all event listeners
   * for all elements in Store
   */
  clear() {
    for (let el in this.attrs)
      this.delete(this.get(el));
    this.attrs = create(null);
    return this;
  }

  /**
   * Create filter function from entry object
   * return filter or false
   * @param {Object} entry
   */
  createFilter(entry) {
    const terms = keys(entry).reduce((terms, name) => {
      let val = entry[name];
      is.def(val) && terms.push(e => e[name]===val);
      return terms;
    }, []);

    return terms.length && e => terms.every(fn => fn(e));
  }

  /**
   * Create event entry
   * @param {String} str
   * @param {Function} cb
   * @param {Object} ctx
   */
  createEntry(str, cb, ctx) {
    is.str.assert(str,
      '[Event:on] first argument must be non empty string');

    let match = str.match(/^(\w+)(.*)?/);
    is.def.assert(match,
      '[Event:delegate] first argument must match pattern /Event Selector:optional/');

    let [ , name, selector ] = match;
    return { name, selector, cb, ctx }
  }

  set(el) {
    !this.has(el) && (this.attrs[el] = [])
    return this;
  }

  get(el) {
    return this.attrs[el];
  }

  has(el) {
    return el in this.attrs;
  }

  static stop(e) {
    e.preventDefault();
    e.stopPropagation();
  }
}