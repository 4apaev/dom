const is = window.is = require('is')
const declare = window.declare = require('declare')


const fail = require('../util/fail');
const aliases = require('../src/aliases')
const equal = is.assert;

describe('Events', $events)
describe('Html', $html)
describe('Empty', $empty)
describe('Insert', $insert)
describe('Aliases', $aliases)

function $aliases() {
  aliases.forEach(([ src, name, alias, ...targets ]) => {
    let Src = window[ src ]
    let a = declare.getDesc(Src.prototype, name)
    targets.forEach(trg => {
      let Trg = window[ trg ]
      it(`${ Trg.name } "${ name }" should have alias "${ alias }"`, () => {
        let b = declare.getDesc(Trg.prototype, alias)
        is.own.assert(Trg.prototype, alias)
        is.equal.assert(a, b)
      })
    })
  })
}

function $empty() {
  it('should have "empty" method', () => is.func.assert(Element.prototype.empty));

  it('should empty and return element ', () => {
    let ul = document.createElement('ul');

    ul.innerHTML = `
      <li>a</li>
      <li>b</li>
      <li>c</li>`;

    equal(ul.children.length, 3);
    equal(ul.empty(), ul);
    equal(ul.children.length, 0);
    equal(ul.innerHTML, '')
  });

  it('should remove all events listeners if children has any ', () => {
    let ul = document.createElement('ul');
    let count = 0;

    ul.innerHTML = `
      <li>a</li>
      <li>b</li>
      <li>c</li>`;

    for (let li of ul.children)
      li.on('click', e => count += 1).click()

    equal(count, 3);
    equal(ul.empty(), ul);

    for (let li of ul.children)
      li.click()
    equal(count, 3)
  })
}

function $events() {
  const el = x => document.createElement(x)

  describe('base', () => {
    let ul = el('ul');

    it('should have "on" method', () => is.func.assert(Element.prototype.on));
    it('should have "off" method', () => is.func.assert(Element.prototype.off));

    it('should throw when called without event name', () => {
      let err = fail(ul.on, [], ul);
      equal(is(err), 'Error')
    });

    it('should throw when called without callback', () => {
      let err = fail(ul.on, [ 'click' ], ul);
      equal(is(err), 'Error')
    })
  });

  describe('on', () => {
    it('should add event and return element', () => {
      let div = el('div');
      let ctx = {};
      let ret = div.on('click', function (e) {
        equal(this, ctx);
        equal(is(e), 'MouseEvent')
      }, ctx);

      div.click();
      equal(ret, div)
    });

    it('should delegate event', () => {
      let div = el('div');
      div.innerHTML = '<p></p><b></b>';

      div.on('click p', e => equal(e.target.nodeName, 'P'));
      div.on('click b', e => equal(e.target.nodeName, 'B'));

      div.firstElementChild.click();
      div.lastElementChild.click();
    })
  });

  describe('once', () => {
    let div = el('div');
    let count = 0;
    div.once('click', e => count += 1);
    it('should emit once', () => {
      div.click();
      equal(1, count);
      div.click();
      equal(1, count);
    })
  });

  describe('off', () => {
    function emit(name, el) {
      let e = new MouseEvent(name, {view: window, bubbles: true, cancelable: true});
      el.dispatchEvent(e);
    }

    let div = el('div');
    div.innerHTML = '<p></p><b></b>';

    let p = div.firstElementChild;
    let b = div.lastElementChild;

    let count = {
      click   : {p: 0, b: 0},
      dblclick: {p: 0, b: 0},
      wheel   : {p: 0, b: 0},
      cb      : 0
    };

    let cb = e => count.cb += 1;
    div.on('click b', e => count.click.b += 1);
    div.on('click p', e => count.click.p += 1);
    div.on('dblclick b', e => count.dblclick.b += 1);
    div.on('dblclick p', e => count.dblclick.p += 1);
    div.on('wheel b,p', cb);

    it('should remove all clicks', () => {
      emit('click', p);
      emit('click', b);
      div.off('click');
      emit('click', p);
      emit('click', b);
      equal(count.click.p, 1);
      equal(count.click.b, 1)
    });

    it('should remove dblclick with selector', () => {
      emit('dblclick', p);
      emit('dblclick', b);
      div.off('dblclick p');
      emit('dblclick', p);
      emit('dblclick', b);
      equal(count.dblclick.p, 1);
      equal(count.dblclick.b, 2)
    });

    it('should remove by callback', () => {
      emit('wheel', p);
      emit('wheel', b);
      div.off(cb);
      emit('wheel', p);
      emit('wheel', b);
      equal(count.cb, 2)
    });

    it('should remove all', () => {
      div.off();
      emit('click', p);
      emit('click', b);
      emit('dblclick', p);
      emit('dblclick', b);
      emit('wheel', p);
      emit('wheel', b);
      equal(count.click.p, 1);
      equal(count.click.b, 1);
      equal(count.dblclick.p, 1);
      equal(count.dblclick.b, 2);
      equal(count.cb, 2)
    })
  });
}

function $insert() {
  const el = x => document.createElement(x)
  const tag = x => `<${ x }></${ x }>`
  const node = el('div')
  const outer = x => x.HTML
  const identity = x => x

  const eq = expect => (a, b) => {
      let { first, last, count } = node;
      is.assert(count, 2);
      is.assert(a, expect(first));
      is.assert(b, expect(last));
    }

  exec('element', el, eq(identity))
  exec('string', tag, eq(outer))

  function exec(term, make, equal, a, b) {
    describe(term, () => {
      beforeEach(() => {
        a = make('a')
        b = make('b')
        node.empty()
      })
      afterEach(() => equal(a, b))
      it(`should append  "a" and "b" ${ term } to node`,       () => node.append(a).append(b))
      it(`should prepend "b" and "a" ${ term } to node`,       () => node.append(b).prepend(a))
      it(`should insert  "a" ${ term }, before "b" ${ term }`, () => node.append(b).first.before(a))
      it(`should insert  "b" ${ term }, after "a" ${ term }`,  () => node.append(a).first.after(b))
    });
  }
}

function $html() {
  it('should have "html" property', () => {
    is.own.assert(Element.prototype, 'html')
  })
}

